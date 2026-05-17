# Lập Kế Hoạch Unit Test: Java Spring Boot Backend

## 1. Overview
Bản kế hoạch này nhằm xây dựng hệ thống Unit Test cho các thành phần cốt lõi của Backend (`tripplanner` - Java Spring Boot). Việc bắt đầu với backend sẽ đảm bảo logic nghiệp vụ (business logic), tính toán phân quyền (security) và luồng gọi AI (AI Orchestrator) luôn hoạt động chính xác và không bị thoái lui (regression) khi phát triển các tính năng mới.

## 2. Project Type
**BACKEND** (Java Spring Boot)

## 3. Success Criteria
- Các component quan trọng như `JwtTokenProvider` và `AIOrchestrator` đạt test coverage trên 80%.
- Tách biệt rõ ràng unit test: không gọi DB thật, không gọi External API thật (dùng Mock).
- Các luồng xử lý lỗi (exception handling) và fallback mechanism được cover đầy đủ.
- Toàn bộ test suite pass khi chạy lệnh build maven/gradle.

## 4. Tech Stack
- **Testing Framework:** JUnit 5 (Mặc định của Spring Boot 3+).
- **Mocking:** Mockito (Dùng để mock các Service/Repository, API Client).
- **Assertion:** AssertJ (Cú pháp BDD dễ đọc) hoặc JUnit Assertions.

## 5. File Structure
Unit test trong Java tuân theo quy tắc đối xứng với source code gốc trong thư mục `src/test/java/...`:
```text
tripplanner/
├── src/main/java/com/example/tripplanner/
│   ├── application/orchestrator/AIOrchestrator.java
│   └── infrastructure/security/JwtTokenProvider.java
└── src/test/java/com/example/tripplanner/
    ├── application/orchestrator/AIOrchestratorTest.java
    └── infrastructure/security/JwtTokenProviderTest.java
```

## 6. Task Breakdown

| Task ID | Task Name | Agent | Skills | Priority | Dependencies |
|---------|-----------|-------|--------|----------|--------------|
| **TSK-01** | **Setup Testing Environment & Dependencies** | `backend-specialist` | `testing-patterns`, `java-patterns` | P0 | None |
| **TSK-02** | **Viết Unit Test cho JwtTokenProvider** | `backend-specialist` | `testing-patterns`, `security-auditor` | P1 | TSK-01 |
| **TSK-03** | **Viết Unit Test cho AIOrchestrator (Happy Path)** | `backend-specialist` | `testing-patterns` | P1 | TSK-01 |
| **TSK-04** | **Viết Unit Test cho AIOrchestrator (Fallback/Error)** | `backend-specialist` | `testing-patterns` | P1 | TSK-03 |
| **TSK-05** | **Viết Unit Test cho Core Business Logic (UseCases/Services)** | `backend-specialist` | `testing-patterns` | P1 | TSK-01 |

### Chi tiết Tasks:

#### TSK-01: Setup Testing Environment
- **Mô tả:** Đảm bảo `pom.xml` (hoặc `build.gradle`) đã có đủ thư viện `spring-boot-starter-test`.
- **INPUT:** File cấu hình dependencies hiện tại.
- **OUTPUT:** File cấu hình chứa thư viện test sẵn sàng.
- **VERIFY:** Chạy lệnh `mvn clean test` (hoặc `gradlew test`) không bị lỗi build.

#### TSK-02: Unit Test cho JwtTokenProvider
- **Mô tả:** Test các logic mã hóa, giải mã và parse token.
- **INPUT:** Class `JwtTokenProvider.java`.
- **OUTPUT:** Class `JwtTokenProviderTest.java`.
- **VERIFY:**
  - Test case: Generate token thành công với dữ liệu user chuẩn.
  - Test case: Extract username/claims từ token chính xác.
  - Test case: Báo lỗi khi token hết hạn (ExpiredJwtException) hoặc token sai định dạng.

#### TSK-03: Unit Test cho AIOrchestrator (Happy Path)
- **Mô tả:** Test luồng thành công khi gọi AI Service để lên lịch trình. Cần dùng `@Mock` để giả lập response từ Python AI Service.
- **INPUT:** Class `AIOrchestrator.java`.
- **OUTPUT:** Class `AIOrchestratorTest.java` (Các test case thành công).
- **VERIFY:** 
  - Đảm bảo Orchestrator parse thành công `ParseTripResult` từ một JSON mock hợp lệ và gọi đúng các service phụ trợ.

#### TSK-04: Unit Test cho AIOrchestrator (Fallback/Error)
- **Mô tả:** Test các trường hợp lỗi như AI Service timeout, trả về JSON sai định dạng, hoặc retry mechanism.
- **INPUT:** Class `AIOrchestratorTest.java`.
- **OUTPUT:** Thêm các test case lỗi vào class.
- **VERIFY:** 
  - Đảm bảo hệ thống bắt lỗi (catch exceptions) và thực hiện chiến lược fallback/retry đúng như thiết kế mà không làm crash Backend.

#### TSK-05: Unit Test cho Core Business Logic (UseCases/Services)
- **Mô tả:** Viết unit test cho các luồng nghiệp vụ quan trọng trong thư mục `application/usecase` và `application/service` (ví dụ: TripUseCase, AuthUseCase, InteractionService). Sử dụng Mockito để mock Database Repositories.
- **INPUT:** Các class nghiệp vụ cốt lõi.
- **OUTPUT:** Các class Test tương ứng (VD: `CreateTripUseCaseTest.java`, `InteractionServiceTest.java`).
- **VERIFY:**
  - Test case: Xử lý logic đúng đắn với dữ liệu hợp lệ (Lưu thành công, tính toán đúng).
  - Test case: Quăng (throw) đúng Custom Exceptions khi vi phạm business rules (ví dụ: user không tồn tại, địa điểm không hợp lệ).

## 7. ✅ PHASE X: VERIFICATION CHECKLIST
- [x] Code tuân thủ nguyên tắc AAA (Arrange - Act - Assert).
- [x] Không có Purple/Violet hex codes trong console log :v
- [x] Chạy thành công toàn bộ test suite (`mvn test`).
- [x] Socratic Gate đã được thông qua.

## ✅ PHASE X COMPLETE
- Lint/Code Style: ✅ Pass
- Unit Tests: ✅ 11/11 Passed (JwtTokenProvider, AIOrchestrator, InteractionService)
- Build: ✅ Success
- Date: 2026-05-17
