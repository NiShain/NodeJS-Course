# API Development

# 1. API là gì?

**API: Application Programming Interface** (Giao diện lập trình ứng
dụng).

Tập hợp các đoạn mã lập trình cho phép truyền dữ liệu giữa phần mềm này
với phần mềm khác.

Nó cũng bao gồm các quy tắc/điều khoản cho việc trao đổi dữ liệu này.

# 2. REST & RESTful API là gì?

## a. REST là gì?

**REST (Representational State Transfer):** Là một phong cách kiến trúc
phần mềm định nghĩa một tập các ràng buộc (constraints) được sử dụng để
xây dựng các dịch vụ Web (Web services).

**REST không phải là công nghệ hay ngôn ngữ lập trình**, mà là **bộ quy
chuẩn/triết lý thiết kế**.

## b. RESTful API là gì và hoạt động như nào?

**RESTful API:** Là các API tuân thủ đúng các kiến trúc và quy tắc của
REST.

**Các phương thức HTTP thông dụng (Typical HTTP Verbs):**

-   `GET`: Đọc dữ liệu từ Cơ sở dữ liệu.
-   `POST`: Tạo mới một bản ghi trong Database.
-   `PUT`: Cập nhật/thay thế toàn bộ một hàng dữ liệu trong Database.
-   `PATCH`: Cập nhật/chỉnh sửa một phần một hàng dữ liệu trong
    Database.
-   `DELETE`: Xóa dữ liệu khỏi Database.

*Cơ chế hoạt động:*

1.  Client gửi **HTTP Request** kèm đường dẫn và phương thức (ví dụ:
    `GET /allUsers` để lấy danh sách người dùng, `POST /newUser` để tạo
    mới) và đợi phản hồi.
2.  REST API tiếp nhận yêu cầu, truy vấn dữ liệu cần thiết từ Database.
3.  REST API đóng gói dữ liệu và gửi trả **Response** về cho Client,
    thông thường dưới định dạng **JSON** hoặc **XML**.

*Phân biệt `PUT` và `PATCH`*: `PUT` dùng khi bạn muốn thay thế hoàn toàn
một đối tượng (ghi đè), còn `PATCH` dùng khi bạn chỉ muốn sửa 1 hoặc 2
trường thông tin cụ thể (ví dụ: chỉ đổi số điện thoại).

# 3. Các ràng buộc kiến trúc của REST

## a. Client-server architecture (Kiến trúc Client - Server)

Tách biệt hoàn toàn giữa giao diện người dùng (Client) và logic lưu trữ
dữ liệu (Server). Client không cần quan tâm đến cấu trúc cơ sở dữ liệu,
còn Server không cần quan tâm đến giao diện hiển thị ra sao.

## b. Statelessness (Phi trạng thái)

Mỗi yêu cầu gửi từ Client lên Server phải chứa đầy đủ mọi thông tin cần
thiết để Server hiểu và xử lý.

Server **không lưu trữ bất kỳ trạng thái (state) hay phiên làm việc
(session) nào của Client** giữa các lần gọi API. Nếu một request bị ngắt
quãng, request tiếp theo vẫn độc lập và tự vận hành được mà không phụ
thuộc vào request trước đó.

## c. Cacheability (Khả năng lưu bộ nhớ đệm)

Phản hồi từ Server phải tự định nghĩa rõ xem nó có được phép lưu cache
hay không (ví dụ qua tiêu đề `Cache-Control: public, max-age=...`).

Nhờ cache, Client hoặc các trạm trung gian có thể tái sử dụng dữ liệu đã
lấy trước đó, giúp giảm tải cho Server và tăng tốc độ phản hồi đáng kể.

## d. Layered system (Hệ thống phân tầng)

Hệ thống có thể gồm nhiều tầng trung gian: Load Balancer (Bộ cân bằng
tải), Gateway/Service Coordinator, Business Logic, Cache layer,
Database.

Client chỉ giao tiếp với tầng ngay trước mặt nó mà không thể (và không
cần) biết nó đang kết nối trực tiếp với Server ứng dụng hay một proxy
trung gian. Điều này giúp mở rộng quy mô (scaling) hệ thống dễ dàng.

## e. Uniform interface (Giao diện đồng nhất)

Gồm **4 nguyên tắc** cốt lõi:

-   **Resource identification in requests (Định danh tài nguyên qua
    request):** Tài nguyên được xác định rõ qua URL duy nhất (ví dụ:
    `/users/123`).
-   **Resource manipulation through representations (Thao tác tài nguyên
    qua các biểu diễn):** Client giữ một bản đại diện của dữ liệu (kèm
    metadata) là đã đủ khả năng yêu cầu sửa/xóa tài nguyên trên Server.
-   **Self-descriptive messages (Thông điệp tự mô tả):** Mỗi gói tin
    HTTP đều chứa đủ thông tin để bên nhận biết cách xử lý (ví dụ:
    `Content-Type: application/json` báo cho Client biết định dạng dữ
    liệu trả về).
-   **HATEOAS (Hypermedia as the engine of application state):** Phản
    hồi API không chỉ trả về dữ liệu mà còn gửi kèm các đường link
    (hyperlinks) hướng dẫn Client biết các hành động tiếp theo có thể
    thực hiện.

# 4. Request / Response

## Request

Cấu trúc một request:

-   **Request-line:** `<method> <request-URL> <http-version>` --- Phương
    thức, đường dẫn URL cần yêu cầu, phiên bản HTTP.
-   **Header (optional):** Các tiêu đề yêu cầu.
-   **Empty line:** Một dòng trống dùng để đánh dấu kết thúc phần
    header.
-   **Body (optional):** Thân của yêu cầu chứa dữ liệu gửi lên.

Ví dụ:

``` http
POST /api/v1/auth/login HTTP/1.1
Host: api.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Content-Type: application/json; charset=utf-8
Accept: application/json
Content-Length: 57

{
  "username": "nguyenvana",
  "password": "Password123@"
}
```

**Phân tích cấu trúc Request:**

-   **Request-line:** `POST /api/v1/auth/login HTTP/1.1`
    -   `POST`: Phương thức gửi yêu cầu đăng nhập.
    -   `/api/v1/auth/login`: Đường dẫn endpoint cần gọi.
    -   `HTTP/1.1`: Phiên bản giao thức HTTP.
-   **Headers:**
    -   `Host`: Địa chỉ tên miền của server (`api.example.com`).
    -   `Content-Type`: Định dạng dữ liệu client gửi lên trong phần body
        là JSON.
    -   `Accept`: Client yêu cầu server phản hồi bằng định dạng JSON.
    -   `Content-Length`: Kích thước nội dung body (57 bytes).
-   **Dòng trống (Empty line):** Dùng để phân cách giữa headers và body.
-   **Body:** Khối JSON chứa tài khoản và mật khẩu gửi đi.

## Response

Mã trạng thái phản hồi HTTP cho biết một HTTP Request đã được hoàn thành
thành công hay chưa. Các Response được chia thành 5 nhóm:

1.  **Informational responses (100--199):** Phản hồi thông tin.
2.  **Successful responses (200--299):** Phản hồi thành công.
3.  **Redirection messages (300--399):** Thông báo chuyển hướng.
4.  **Client error responses (400--499):** Phản hồi lỗi từ phía Client.
5.  **Server error responses (500--599):** Phản hồi lỗi từ phía Server.

Cấu trúc một Response:

-   **Status-line:** Dòng trạng thái kết quả trả về từ server, có dạng
    `<http-version> <status> <reason-phrase>` --- Phiên bản HTTP, mã
    trạng thái số, cụm từ giải thích.
-   **Header (optional):** Các tiêu đề phản hồi.
-   **Empty line:** Một dòng trống phân cách phần header và body.
-   **Body (optional):** Dữ liệu nội dung do server trả về.

Ví dụ:

``` http
HTTP/1.1 200 OK
Date: Mon, 09 Nov 2026 07:00:00 GMT
Server: nginx/1.24.0
Content-Type: application/json; charset=utf-8
Content-Length: 178
Set-Cookie: sessionId=abc123xyz789; HttpOnly; Secure; SameSite=Strict
Cache-Control: no-store

{
  "status": "success",
  "message": "Đăng nhập thành công",
  "data": {
    "user_id": 1024,
    "name": "Nguyễn Văn A",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Status-line:** `HTTP/1.1 200 OK`

-   `HTTP/1.1`: Phiên bản giao thức.
-   `200`: Mã trạng thái báo xử lý thành công.
-   `OK`: Cụm từ mô tả mã trạng thái.

**Headers:**

-   `Date`: Thời điểm phản hồi được tạo (theo giờ UTC).
-   `Content-Type`: Báo cho client biết dữ liệu trả về ở dạng JSON với
    bảng mã UTF-8.
-   `Set-Cookie`: Đặt cookie định danh phiên làm việc trên trình duyệt
    của client.
-   `Cache-Control: no-store`: Báo cho trình duyệt không được lưu tạm
    (cache) dữ liệu nhạy cảm này.

**Dòng trống (Empty line):** Đánh dấu kết thúc phần response header.

**Body:** Nội dung dữ liệu trả về.

## Content-Type

`Content-Type` là một HTTP Header dùng để thông báo cho bên nhận biết dữ
liệu trong HTTP message được gửi dưới định dạng nào.

Ví dụ:

``` http
POST /api/login HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "username": "admin",
  "password": "123456"
}
```

`Content-Type: application/json` nghĩa là dữ liệu gửi lên Server trong
body có định dạng JSON, vì vậy Server sẽ đọc và xử lý theo định dạng
JSON.

### Các loại Content-Type phổ biến

#### 1. `application/json`

Dùng để gửi và nhận dữ liệu JSON.

Ví dụ:

``` http
POST /api/users
Content-Type: application/json

{
  "name": "Binh",
  "age": 22,
  "email": "binh@gmail.com"
}
```

**Client -- JavaScript Fetch:**

``` javascript
const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Binh",
        age: 22
    })
});

const data = await response.json();

console.log(data);
```

#### 2. `application/x-www-form-urlencoded`

Dùng để gửi dữ liệu dưới dạng các cặp key-value được mã hóa theo URL
encoding.

Ví dụ:

``` http
POST /api/login
Content-Type: application/x-www-form-urlencoded

username=admin&password=123456
```

**JavaScript Fetch:**

``` javascript
const params = new URLSearchParams();

params.append("username", "admin");
params.append("password", "123456");

const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
});

const data = await response.json();

console.log(data);
```

#### 3. `multipart/form-data`

Dùng khi muốn gửi dữ liệu kết hợp giữa text và file.

Ví dụ:

``` http
POST /api/upload
Content-Type: multipart/form-data; boundary=----WebKitBoundary

------WebKitBoundary
Content-Disposition: form-data; name="username"

Binh
------WebKitBoundary
Content-Disposition: form-data; name="avatar"; filename="avatar.png"
Content-Type: image/png

(binary image data)
------WebKitBoundary--
```

**JavaScript Fetch:**

``` javascript
const formData = new FormData();

formData.append("username", "Binh");
formData.append("avatar", file);

fetch("/api/upload", {
    method: "POST",
    body: formData
});
```

> Khi sử dụng `FormData` với `fetch`, thông thường không tự đặt header
> `Content-Type`. Trình duyệt sẽ tự thêm `multipart/form-data` cùng
> `boundary` phù hợp.

#### 4. `text/plain`

Dùng khi dữ liệu gửi đi chỉ là văn bản thuần túy.

Ví dụ:

``` http
Content-Type: text/plain

Hello Server!
```

**JavaScript Fetch:**

``` javascript
const response = await fetch("http://localhost:3000/api/message", {
    method: "POST",
    headers: {
        "Content-Type": "text/plain"
    },
    body: "Hello NodeJS Server!"
});
```

## Phân biệt Content-Type và Accept

Hai HTTP Header này có chức năng khác nhau:

  -----------------------------------------------------------------------
  Header                  Ý nghĩa                 Ai gửi?
  ----------------------- ----------------------- -----------------------
  `Content-Type`          Dữ liệu hiện tại có     Client hoặc Server
                          định dạng gì?           

  `Accept`                Tôi muốn nhận dữ liệu ở Thường là Client
                          định dạng gì?           
  -----------------------------------------------------------------------

# 5. API Authentication

## HTTP Basic Authentication

Theo các cách xác thực truyền thống, chúng ta có thể sử dụng **session
(phiên làm việc)** và **cookies**:

1.  **Session** được lưu trữ ở phía **server (máy chủ)** để liên kết với
    hồ sơ (profile) của người dùng.
2.  **Cookie** được lưu trữ ở phía **client (máy khách/trình duyệt)**,
    có thể chứa session ID để server đối chiếu với session tương ứng.

> Lưu ý: HTTP Basic Authentication là một cơ chế xác thực riêng, sử dụng
> thông tin đăng nhập được mã hóa Base64 trong header `Authorization`.
> Session và cookie là một mô hình quản lý trạng thái đăng nhập phổ
> biến, không phải bản thân HTTP Basic Authentication.

## JSON Web Token (JWT)

**JSON Web Token (JWT)** là một tiêu chuẩn mở (RFC 7519) định nghĩa
phương thức gọn nhẹ (compact) và tự chứa đầy đủ thông tin
(self-contained) để truyền tải thông tin an toàn giữa các bên dưới dạng
một đối tượng JSON.

Đối tượng JSON này được dùng làm phần tải dữ liệu cho JSON Web Signature
(JWS -- RFC 7515) hoặc dạng văn bản gốc của JSON Web Encryption (JWE --
RFC 7516), giúp phát hiện việc can thiệp/chỉnh sửa trái phép tùy theo cơ
chế được sử dụng.

Công thức biểu diễn JWT dạng compact:

\[ `\text{JWT}`{=tex} =
`\text{Base64Url}`{=tex}(`\text{Header}`{=tex}) + "." +
`\text{Base64Url}`{=tex}(`\text{Payload}`{=tex}) + "." +
`\text{Signature}`{=tex} \]

Ở dạng rút gọn, JSON Web Token gồm **3 phần** được phân tách nhau bằng
dấu chấm `.`:

1.  **HEADER**
2.  **PAYLOAD**
3.  **SIGNATURE**

Ví dụ, một chuỗi JWT có dạng ba phần:

`ey...` (Header) `.` `ey...` (Payload) `.` `Sf...` (Signature).

### Header

Header gồm hai thông tin chính:

1.  **Algorithm (`alg`):** Thuật toán dùng để tạo chữ ký số (ví dụ:
    `HS256` hoặc `RS256`).
2.  **Token type (`typ`):** Loại token, thường có giá trị `JWT`.

Ví dụ:

``` json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

**Payload** chứa các claims (khai báo/thông tin) về người dùng hoặc chủ
thể (theo RFC 7519):

1.  **Registered Claims (Khai báo đăng ký):** Các khóa được định nghĩa
    trong chuẩn, ví dụ `iss` (bên phát hành), `exp` (thời điểm hết hạn),
    `sub` (chủ thể/ID user).
2.  **Public Claims (Khai báo công khai):** Các claim được cộng đồng sử
    dụng hoặc được đặt tên để tránh trùng lặp.
3.  **Private Claims (Khai báo riêng):** Các trường tùy biến do hệ thống
    tự đặt để trao đổi thông tin nội bộ (như `name`, `role`, `admin`).

Ví dụ:

``` json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

> Lưu ý: Payload của JWT thông thường chỉ được Base64URL-encode, không
> được mã hóa. Vì vậy, không nên đặt mật khẩu hoặc dữ liệu bí mật trong
> payload.

### Signature

**Signature** được sử dụng để xác minh rằng token không bị chỉnh sửa/can
thiệp sau khi được phát hành.

Để tạo signature, ta lấy phần `header`, phần `payload`, cùng với một
**khóa bí mật (`secret key`)** rồi đưa qua thuật toán ký (ví dụ sử dụng
`HMAC-SHA256`).

Ví dụ:

``` javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

## OAuth

**OAuth (Open Authorization -- Ủy quyền mở)** là một giao thức ủy quyền
theo tiêu chuẩn mở. OAuth cho phép ứng dụng truy cập tài nguyên được bảo
vệ thay mặt người dùng mà không cần người dùng chia sẻ trực tiếp thông
tin đăng nhập (tài khoản/mật khẩu) cho ứng dụng đó.

OAuth 1.0 được đặc tả trong RFC 5849; OAuth 2.0 được đặc tả trong RFC
6749.

### OAuth 1.0 Terms

1.  **User:** Người muốn truy cập vào các tài nguyên được bảo vệ.
2.  **Consumer:** Ứng dụng sử dụng OAuth để truy cập vào Service
    Provider thay mặt cho User.
3.  **Service Provider:** Ứng dụng web cho phép truy cập tài nguyên
    thông qua giao thức OAuth.
4.  **Protected Resources:** Dữ liệu mà người dùng muốn truy cập.

**Token trong OAuth 1.0:**

1.  **Request Token:** Được sử dụng để yêu cầu dịch vụ cấp quyền ủy
    quyền.
2.  **Access Token:** Được sử dụng để truy cập trực tiếp vào các tài
    nguyên được bảo vệ.

### OAuth 2.0

OAuth 2.0 được xây dựng dựa trên những kinh nghiệm triển khai thực tế từ
OAuth 1.0. Tuy nhiên, giao thức OAuth 2.0 **không tương thích ngược**
với OAuth 1.0. Có rất ít điểm tương đồng về mặt cách thức triển khai mã
nguồn giữa hai phiên bản này.

**OAuth 2.0 Terms:**

1.  **Resource Owner:** Thực thể có khả năng cấp quyền truy cập vào tài
    nguyên được bảo vệ (thường là người dùng cuối).
2.  **Resource Server:** Máy chủ lưu trữ các tài nguyên được bảo vệ.
3.  **Client:** Ứng dụng đưa ra các yêu cầu truy cập tài nguyên thay mặt
    cho Resource Owner.
4.  **Authorization Server:** Máy chủ chuyên cấp phát các mã truy cập
    (access token) cho Client.
