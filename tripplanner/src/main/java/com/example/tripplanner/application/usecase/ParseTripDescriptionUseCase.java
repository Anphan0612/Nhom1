package com.example.tripplanner.application.usecase;

import com.example.tripplanner.application.dto.ParseTripRequest;
import com.example.tripplanner.application.dto.ParseTripResponse;
import com.example.tripplanner.domain.port.AiServicePort;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ParseTripDescriptionUseCase {

    private final AiServicePort aiServicePort;
    private final ObjectMapper objectMapper;

    private static final String SYSTEM_PROMPT = """
            Bạn là trợ lý phân tích mô tả chuyến đi. Hãy trích xuất thông tin từ câu mô tả và trả về JSON hợp lệ.
            
            Quy tắc bắt buộc:
            - Chỉ trả về JSON, không có text nào khác
            - Nếu không rõ thông tin, để giá trị null
            - Ngày phải theo định dạng YYYY-MM-DD
            - Nếu người dùng nói "cuối tuần này" hoặc "tuần tới" hãy tính từ ngày hiện tại: %s
            - budgetTier chỉ là một trong: "budget", "standard", "luxury"
            - travelStyles chỉ gồm: "Ẩm thực", "Thư giãn", "Phiêu lưu", "Văn hóa", "Mua sắm", "Về đêm"
            
            JSON schema:
            {
              "destination": "string hoặc null",
              "startDate": "YYYY-MM-DD hoặc null",
              "endDate": "YYYY-MM-DD hoặc null",
              "travelers": số nguyên hoặc null,
              "budgetTier": "budget|standard|luxury hoặc null",
              "travelStyles": ["string"] hoặc [],
              "rawSummary": "tóm tắt ngắn bằng tiếng Việt về chuyến đi"
            }
            """;

    public ParseTripResponse execute(ParseTripRequest request) {
        String today = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
        String prompt = String.format(SYSTEM_PROMPT, today) +
                "\n\nMô tả người dùng: " + request.getDescription() +
                "\n\nTrả về JSON:";

        try {
            String aiContent = aiServicePort.callAi(prompt).content();
            String json = extractJson(aiContent);
            JsonNode node = objectMapper.readTree(json);

            return ParseTripResponse.builder()
                    .destination(textOrNull(node, "destination"))
                    .startDate(textOrNull(node, "startDate"))
                    .endDate(textOrNull(node, "endDate"))
                    .travelers(intOrNull(node, "travelers"))
                    .budgetTier(textOrNull(node, "budgetTier"))
                    .travelStyles(stringList(node, "travelStyles"))
                    .rawSummary(textOrNull(node, "rawSummary"))
                    .build();

        } catch (Exception ex) {
            log.error("Failed to parse AI response for trip description: {}", ex.getMessage());
            // Return minimal graceful response instead of throwing
            return ParseTripResponse.builder()
                    .rawSummary("Không thể phân tích mô tả. Vui lòng điền form thủ công.")
                    .travelStyles(List.of())
                    .build();
        }
    }

    // ── Helpers ────────────────────────────────────────────────────────────────

    /** Strip markdown code fences if AI wrapped the JSON in ```json ... ``` */
    private String extractJson(String raw) {
        if (raw == null) return "{}";
        String trimmed = raw.strip();
        if (trimmed.startsWith("```")) {
            int start = trimmed.indexOf('{');
            int end = trimmed.lastIndexOf('}');
            if (start >= 0 && end > start) return trimmed.substring(start, end + 1);
        }
        int start = trimmed.indexOf('{');
        int end = trimmed.lastIndexOf('}');
        if (start >= 0 && end > start) return trimmed.substring(start, end + 1);
        return "{}";
    }

    private String textOrNull(JsonNode node, String field) {
        JsonNode v = node.get(field);
        if (v == null || v.isNull() || v.asText().isBlank()) return null;
        return v.asText();
    }

    private Integer intOrNull(JsonNode node, String field) {
        JsonNode v = node.get(field);
        if (v == null || v.isNull()) return null;
        try { return v.asInt(); } catch (Exception e) { return null; }
    }

    private List<String> stringList(JsonNode node, String field) {
        JsonNode v = node.get(field);
        if (v == null || !v.isArray()) return new ArrayList<>();
        List<String> result = new ArrayList<>();
        v.forEach(el -> { if (!el.isNull()) result.add(el.asText()); });
        return result;
    }
}
