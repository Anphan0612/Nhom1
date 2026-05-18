# Kế Hoạch Triển Khai (Deployment Plan): Free PaaS (Vercel, Render, Aiven)

## 1. Overview
Mục tiêu của kế hoạch này là tách dự án AI Trip Planner (đang chạy bằng Docker Compose) thành các dịch vụ độc lập và triển khai (deploy) hoàn toàn miễn phí trên các nền tảng PaaS (Platform as a Service) tốt nhất hiện nay:
- **Database:** Aiven (MySQL)
- **AI Service:** Render (Python/FastAPI)
- **Backend:** Render (Java Spring Boot)
- **Frontend:** Vercel (React/Vite)

Việc này sẽ giúp dự án có đường link Public (HTTPS) để mọi người có thể sử dụng giao diện và API.

## 2. Kiến trúc & Môi trường (Architecture & Services)
Việc giao tiếp giữa các dịch vụ sẽ thay đổi từ mạng nội bộ Docker (`http://backend:8090`, `http://ai-service:8000`) sang các URL Public.

- **Vercel (Frontend)** `https://tripplanner.vercel.app` -> Gọi API tới Backend.
- **Render (Backend)** `https://tripplanner-backend.onrender.com` -> Gọi API tới AI Service và kết nối MySQL.
- **Render (AI Service)** `https://tripplanner-ai.onrender.com` -> Gọi API tới OpenRouter.
- **Aiven (MySQL)** `mysql-xxxx.aivencloud.com` -> Lưu trữ dữ liệu.

## 3. Breakdown Tasks (Chi tiết công việc)

### [x] TSK-01: Cấu hình và Thiết lập Database (Aiven)
- Tạo tài khoản và tạo MySQL Service (Free tier) trên Aiven.
- Lấy thông tin kết nối: Đã lấy thành công.
- Thay đổi/cập nhật URL kết nối database trong code Spring Boot để chấp nhận kết nối public.

### [x] TSK-02: Deploy AI Service (Python) lên Render
- Kết nối GitHub repository với Render.
- Tạo một **Web Service** mới.
- **Root Directory:** `ai_service`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn main:app --host 0.0.0.0 --port 10000`
- **Environment Variables:** Đã cấu hình thành công.
- **URL:** `https://ai-trip-planner-service.onrender.com`

### [x] TSK-03: Deploy Backend (Java) lên Render
- Tạo một **Web Service** mới trên Render.
- **Root Directory:** `tripplanner`
- **Environment:** Docker (Sử dụng Dockerfile sẵn có) hoặc Java Native (Maven).
  - Nếu dùng Maven:
    - **Build Command:** `./mvnw clean package -DskipTests`
    - **Start Command:** `java -jar target/tripplanner-0.0.1-SNAPSHOT.jar`
- **Environment Variables:**
  - `SPRING_DATASOURCE_URL`: (Connection string từ Aiven)
  - `MYSQL_USER`: (User từ Aiven)
  - `MYSQL_PASSWORD`: (Pass từ Aiven)
  - `JWT_SECRET`: (Mã bí mật JWT)
  - `AI_SERVICE_URL`: (URL của AI Service vừa tạo ở TSK-02)
- Cập nhật cấu hình **CORS** trong Spring Boot để cho phép domain của Vercel gọi API.

### [x] TSK-04: Deploy Frontend (React) lên Vercel
- Kết nối GitHub repository với Vercel.
- Cấu hình Framework Preset: **Vite**.
- **Root Directory:** `FluidConcierge`
- **Environment Variables:**
  - `VITE_API_BASE_URL`: (URL của Backend Render tạo ở TSK-03).
  - Cập nhật lại các biến WebSocket nếu cần.

## 4. Agent Assignments
- `@devops-engineer`: Chịu trách nhiệm chính hướng dẫn các bước tạo dịch vụ trên UI của Aiven, Render, Vercel và cấu hình biến môi trường.
- `@backend-specialist`: Sửa file cấu hình (CORS, `application.yml`) của Spring Boot để thích ứng với môi trường Public.
- `@frontend-specialist`: Sửa đổi URL gọi API trong source code React để lấy URL động từ `.env`.

## 5. ✅ PHASE X: VERIFICATION CHECKLIST
- [ ] MySQL trên Aiven nhận kết nối thành công từ bên ngoài (có thể test bằng DBeaver/DataGrip).
- [ ] AI Service (Render) trả về HTTP 200 OK khi gọi endpoint `/health` hoặc tương tự.
- [ ] Backend (Render) khởi động thành công, không báo lỗi connection database và gọi được AI Service.
- [ ] Frontend (Vercel) build thành công và hiển thị giao diện.
- [ ] Luồng người dùng (Đăng ký/Đăng nhập) hoạt động hoàn chỉnh (kiểm tra Frontend gọi được Backend).
- [ ] AI Service trả về kết quả tạo Trip Plan thành công trên Production.
