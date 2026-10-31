# JavaScript

## 1. Where to write JavaScript

Trong HTML, JavaScript được đặt bên trong thẻ `<script>` và `</script>`. Có thể đặt script trong `<head>`, `<body>` hoặc cả hai; một trang có thể có nhiều script.

### Sử dụng file JavaScript bên ngoài

```html
<!-- URL đầy đủ -->
<script src="https://www.w3schools.com/js/myScript.js"></script>

<!-- Đường dẫn tuyệt đối tính từ thư mục gốc của website -->
<script src="/js/myScript.js"></script>

<!-- Đường dẫn tương đối -->
<script src="myScript.js"></script>
```

## 2. Outputs — cách xuất dữ liệu

- `innerHTML`: Ghi nội dung HTML vào một phần tử.
- `innerText`: Ghi hoặc lấy nội dung văn bản hiển thị của một phần tử.
- `document.write()`: Ghi trực tiếp vào luồng HTML của tài liệu; chủ yếu dùng trong ví dụ đơn giản, không nên dùng trong ứng dụng hiện đại.
- `window.alert()`: Hiển thị hộp thoại thông báo.
- `console.log()`: In dữ liệu ra Developer Console của trình duyệt.

Ví dụ:

```html
<p id="message"></p>
<script>
  document.getElementById("message").innerText = "Hello!";
  console.log("Hello!");
</script>
```

## 3. Syntax — cú pháp cơ bản

### Literals và variables

- **Literals** là các giá trị được viết trực tiếp trong mã nguồn, ví dụ `10`, `3.14`, `"hello"`, `true`.
- **Variables** là tên dùng để tham chiếu đến giá trị. Có thể khai báo bằng `let`, `const` hoặc `var`.

```js
let age = 20;
const greeting = "Hello";
var oldStyleVariable = true;

age = 21; // Hợp lệ
// greeting = "Hi"; // Lỗi: const không cho gán lại
```

### Strings

Chuỗi văn bản có thể đặt trong dấu nháy đơn hoặc nháy kép:

```js
const first = "John Doe";
const second = 'John Doe';
const message = `Hello, ${first}!`; // Template literal
```

### Keywords thường gặp

| Keyword | Ý nghĩa |
|---|---|
| `var` | Khai báo biến theo phạm vi hàm hoặc toàn cục |
| `let` | Khai báo biến có phạm vi block |
| `const` | Khai báo biến không thể gán lại |
| `if` | Rẽ nhánh theo điều kiện |
| `switch` | Chọn nhánh theo giá trị |
| `for` | Vòng lặp |
| `function` | Khai báo hàm |
| `return` | Trả kết quả và kết thúc hàm |
| `try` | Bắt đầu khối có thể phát sinh lỗi, thường đi cùng `catch`/`finally` |

### Comments — chú thích

```js
// Chú thích một dòng

/*
  Chú thích
  nhiều dòng
*/
```

## 4. Variables — biến

Thông thường nên ưu tiên `const`; dùng `let` khi cần gán lại. `var` là cách khai báo cũ và thường nên tránh trong mã mới.

```js
const siteName = "Example"; // Không gán lại biến
let count = 0;
count += 1;
```

### Quy tắc đặt tên

- Có thể chứa chữ cái, chữ số, `_` và `$`.
- Không được bắt đầu bằng chữ số.
- Phân biệt chữ hoa và chữ thường: `age` khác `Age`.
- Không được dùng keyword dành riêng làm tên biến.
- Theo quy ước phổ biến, biến và hàm dùng `camelCase`, ví dụ `userName`.

## 5. Data types — kiểu dữ liệu

Các kiểu nguyên thủy (primitive) của JavaScript:

| Kiểu | Ý nghĩa |
|---|---|
| `string` | Chuỗi văn bản |
| `number` | Số nguyên và số thực thông thường |
| `bigint` | Số nguyên rất lớn |
| `boolean` | `true` hoặc `false` |
| `undefined` | Giá trị chưa được gán hoặc chưa tồn tại |
| `null` | Biểu thị sự vắng mặt có chủ đích của giá trị |
| `symbol` | Giá trị định danh duy nhất |

`object` là nhóm kiểu không nguyên thủy, gồm object, array, function và nhiều cấu trúc khác.

### Dùng `typeof`

```js
typeof "";       // "string"
typeof "John";   // "string"
typeof 42;       // "number"
typeof true;     // "boolean"
typeof undefined; // "undefined"
typeof {};       // "object"
typeof [];       // "object"
typeof null;     // "object" — hành vi lịch sử của JavaScript
```

Muốn kiểm tra mảng, dùng `Array.isArray(value)` thay vì dựa vào `typeof`.

## 6. Operators — toán tử

### Toán tử gán kết hợp phép tính

| Toán tử | Tương đương |
|---|---|
| `x = y` | Gán `y` cho `x` |
| `x += y` | `x = x + y` |
| `x -= y` | `x = x - y` |
| `x *= y` | `x = x * y` |
| `x /= y` | `x = x / y` |
| `x %= y` | `x = x % y` |
| `x **= y` | `x = x ** y` |

### Toán tử số học

| Toán tử | Ý nghĩa |
|---|---|
| `+` | Cộng hoặc nối chuỗi |
| `-` | Trừ |
| `*` | Nhân |
| `**` | Lũy thừa |
| `/` | Chia |
| `%` | Chia lấy phần dư |
| `++` | Tăng 1 |
| `--` | Giảm 1 |

### So sánh

| Toán tử | Ý nghĩa |
|---|---|
| `==` | So sánh sau khi có thể chuyển đổi kiểu |
| `===` | So sánh cả giá trị và kiểu |
| `!=` | Không bằng, có thể chuyển đổi kiểu |
| `!==` | Khác giá trị hoặc khác kiểu |
| `>` / `<` | Lớn hơn / nhỏ hơn |
| `>=` / `<=` | Lớn hơn hoặc bằng / nhỏ hơn hoặc bằng |

Nên ưu tiên `===` và `!==` để tránh chuyển đổi kiểu ngoài ý muốn.

### Toán tử logic

| Toán tử | Ý nghĩa |
|---|---|
| `&&` | AND — đúng khi cả hai vế truthy |
| `||` | OR — trả về toán hạng truthy đầu tiên, hoặc toán hạng cuối |
| `!` | NOT — phủ định giá trị truthy/falsy |

## 7. Loops — vòng lặp

```js
// for
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while: kiểm tra điều kiện trước mỗi vòng
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}

// do...while: chạy ít nhất một lần
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 3);
```

- `for...in`: duyệt các **key** có thể liệt kê của object.
- `for...of`: duyệt các **giá trị** của iterable như array hoặc string.

```js
const person = { name: "An", age: 20 };
for (const key in person) {
  console.log(key, person[key]);
}

const cars = ["Saab", "Volvo", "BMW"];
for (const car of cars) {
  console.log(car);
}
```

## 8. Strings — thuộc tính và phương thức

Chuỗi trong JavaScript là bất biến (*immutable*): các phương thức thường trả về chuỗi mới thay vì sửa chuỗi gốc.

### Đọc ký tự và độ dài

| Thuộc tính / phương thức | Tác dụng |
|---|---|
| `length` | Độ dài tính theo UTF-16 code units, không phải lúc nào cũng bằng số ký tự người dùng nhìn thấy |
| `at(index)` | Lấy ký tự theo index; hỗ trợ index âm như `-1` |
| `charAt(index)` | Lấy ký tự tại index; không hỗ trợ index âm |
| `str[index]` | Truy cập ký tự theo index |
| `charCodeAt(index)` | Lấy mã UTF-16 code unit |
| `codePointAt(index)` | Lấy Unicode code point tại vị trí chỉ định |
| `concat()` | Nối chuỗi; thường có thể dùng `+` hoặc template literal thay thế |

### Trích xuất chuỗi

| Phương thức | Tác dụng |
|---|---|
| `slice(start, end)` | Trích xuất từ `start` đến trước `end`; hỗ trợ index âm |
| `substring(start, end)` | Trích xuất chuỗi con; số âm được xem như `0`, và hai tham số có thể được hoán đổi |
| `substr(start, length)` | Trích xuất theo độ dài; đã lỗi thời, nên tránh |

### Chuyển chữ hoa/thường và xử lý khoảng trắng

| Phương thức | Tác dụng |
|---|---|
| `toUpperCase()` / `toLowerCase()` | Chuyển chữ hoa / chữ thường |
| `toLocaleUpperCase()` / `toLocaleLowerCase()` | Chuyển chữ theo quy tắc locale |
| `trim()` | Xóa khoảng trắng hai đầu |
| `trimStart()` | Xóa khoảng trắng đầu chuỗi |
| `trimEnd()` | Xóa khoảng trắng cuối chuỗi |
| `padStart(length, text)` | Thêm ký tự ở đầu đến độ dài mong muốn |
| `padEnd(length, text)` | Thêm ký tự ở cuối đến độ dài mong muốn |
| `repeat(count)` | Lặp chuỗi một số lần |
| `isWellFormed()` | Kiểm tra chuỗi có lone surrogate không hợp lệ hay không |
| `toWellFormed()` | Trả về chuỗi đã thay lone surrogate bằng ký tự thay thế Unicode |

### Tìm kiếm và thay thế

| Phương thức | Tác dụng |
|---|---|
| `indexOf(value)` | Vị trí xuất hiện đầu tiên; `-1` nếu không tìm thấy |
| `lastIndexOf(value)` | Vị trí xuất hiện cuối cùng |
| `includes(value)` | Kiểm tra chuỗi con có tồn tại không |
| `startsWith(value)` | Kiểm tra phần đầu chuỗi |
| `endsWith(value)` | Kiểm tra phần cuối chuỗi |
| `search(regex)` | Trả về vị trí khớp đầu tiên với regex |
| `match(regex)` | Trả về thông tin khớp hoặc `null` |
| `matchAll(regex)` | Iterator chứa các kết quả khớp; regex cần cờ `g` |
| `replace(search, replacement)` | Thay kết quả khớp đầu tiên (với chuỗi tìm kiếm thông thường) |
| `replaceAll(search, replacement)` | Thay tất cả kết quả khớp |
| `split(separator)` | Tách chuỗi thành array |

### Các thành viên khác

| Thành viên | Tác dụng |
|---|---|
| `localeCompare(other)` | So sánh chuỗi theo quy tắc locale |
| `toString()` / `valueOf()` | Trả về giá trị chuỗi |
| `String.fromCharCode(...)` | Phương thức tĩnh tạo chuỗi từ mã UTF-16 |
| `constructor` / `prototype` | Thành viên liên quan đến hàm khởi tạo và prototype; thường ít cần dùng khi học cơ bản |

Ví dụ:

```js
const text = "  JavaScript is fun  ";

console.log(text.trim());                  // "JavaScript is fun"
console.log(text.includes("Script"));      // true
console.log(text.slice(2, 12));             // "JavaScript"
console.log("hello".toUpperCase());         // "HELLO"
console.log("a,b,c".split(","));            // ["a", "b", "c"]
console.log("2026".padStart(6, "0"));       // "002026"
console.log("cat cat".replaceAll("cat", "dog")); // "dog dog"
```

## 9. Arrays — mảng

Mảng dùng để lưu một danh sách các phần tử. Trong JavaScript, các phần tử không bắt buộc phải cùng kiểu, dù thường nên giữ cấu trúc nhất quán.

```js
const cars = ["Saab", "Volvo", "BMW"];

// Tham chiếu đến array không đồng nghĩa với chuyển nó thành chuỗi
const sameArray = cars;

// Chuyển array thành chuỗi, các phần tử thường được ngăn cách bằng dấu phẩy
console.log(cars.toString()); // "Saab,Volvo,BMW"

// Chuyển thành chuỗi JSON
console.log(JSON.stringify(cars)); // '["Saab","Volvo","BMW"]'

// Số phần tử
console.log(cars.length); // 3
```

Lưu ý: `const` ngăn việc gán lại biến `cars`, nhưng không ngăn thay đổi nội dung mảng:

```js
cars.push("Toyota"); // Hợp lệ
// cars = [];         // Lỗi: không thể gán lại biến const
```
