# PLAN-unit-test-python

Tạo hệ thống Unit Test cho Python AI Service sử dụng Option A (Manual Mocking với `pytest-mock`).

## 1. Mục tiêu
- Thiết lập môi trường testing chuẩn cho Python.
- Viết Unit Test cho `app/pipelines/parse_pipeline.py` để đảm bảo logic parsing JSON từ LLM hoạt động ổn định.
- Sử dụng Mocking để giả lập các tình huống: LLM trả về JSON đúng, JSON lỗi format, và JSON thiếu trường dữ liệu.

## 2. Các giai đoạn thực hiện

### Phase 1: Chuẩn bị môi trường (Setup)
- [ ] Checkout nhánh mới: `git checkout -b testing-unit-python`.
- [ ] Cập nhật `requirements.txt`: Thêm `pytest`, `pytest-mock`.
- [ ] Cài đặt dependencies: `pip install -r requirements.txt`.

### Phase 2: Cấu trúc thư mục Testing
- [ ] Tạo thư mục `ai_service/tests/`.
- [ ] Tạo file `ai_service/tests/conftest.py` để chứa các fixture dùng chung.
- [ ] Tạo file `ai_service/tests/test_parse_pipeline.py`.

### Phase 3: Triển khai Unit Test cho Parse Pipeline
- [ ] **Test Case 1: Success Path** - Giả lập LLM trả về JSON chuẩn, kiểm tra output của pipeline.
- [ ] **Test Case 2: Broken JSON** - Giả lập LLM trả về text không phải JSON, kiểm tra cơ chế error handling.
- [ ] **Test Case 3: Missing Fields** - Giả lập JSON thiếu các trường bắt buộc (ví dụ thiếu `activities`), kiểm tra validation.

### Phase 4: Chạy và Xác minh
- [ ] Chạy lệnh `pytest` từ thư mục gốc của `ai_service`.
- [ ] Kiểm tra báo cáo coverage (nếu cần).

## 3. Phân công Agent
- **Orchestrator:** Điều phối cài đặt và tạo cấu trúc file.
- **Python-Specialist:** Viết logic test cụ thể trong `test_parse_pipeline.py`.

## 4. Danh mục kiểm tra (Verification Checklist)
- [ ] Lệnh `pytest` chạy thành công (không có lỗi cú pháp).
- [ ] Mock được áp dụng chính xác cho `LLMService`.
- [ ] Các test cases bao phủ ít nhất 3 kịch bản đã nêu ở Phase 3.
