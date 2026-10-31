# TypeScript

TypeScript mở rộng JavaScript bằng hệ thống kiểu tĩnh. Trình biên dịch kiểm tra kiểu khi phát triển và thường chuyển TypeScript thành JavaScript để chạy. Phần lớn kiểm tra kiểu bị loại bỏ sau khi biên dịch, nên dữ liệu nhận từ API vẫn cần được xác thực lúc chạy nếu không đáng tin cậy.

## 1. Tuples

Array trong TypeScript thường được khai báo với một kiểu phần tử, ví dụ `number[]`. Tuple cho phép mô tả số lượng/vị trí phần tử với kiểu cụ thể.

```ts
// Array
const numbers = [1, 2, 3]; // number[]
numbers.push(4);           // Hợp lệ
// numbers.push("2");      // Lỗi: string không phải number

// Tuple
let ourTuple: [number, boolean, string];
ourTuple = [5, false, "Coding God was here"]; // Hợp lệ
// ourTuple = [5, "false", false];            // Lỗi kiểu
```

Tuple hữu ích khi mỗi vị trí có ý nghĩa riêng. Nếu cần một danh sách dài các phần tử cùng kiểu, thường dùng array.

## 2. Objects

Có thể mô tả cấu trúc object bằng kiểu được khai báo trực tiếp hoặc bằng `type` / `interface`.

```ts
let car: {
  type: string;
  model: string;
  year: number;
};

car = {
  type: "Ford",
  model: "Everest",
  year: 2021
};
```

### Optional properties — thuộc tính tùy chọn

Dấu `?` cho biết thuộc tính có thể không xuất hiện.

```ts
const car: { type: string; mileage?: number } = {
  type: "Toyota"
};

car.mileage = 2000; // Hợp lệ
```

### Index signatures — thuộc tính có key động

Dùng khi biết kiểu của key/value nhưng không biết trước tên từng thuộc tính.

```ts
const nameAgeMap: { [name: string]: number } = {};

nameAgeMap.Jack = 25; // Hợp lệ
// nameAgeMap.Mark = "Fifty"; // Lỗi: value phải là number
```

`[name: string]` là tên mô tả cho key, không phải một biến có sẵn trong object.

## 3. Enums

`enum` gom các giá trị có tên vào một nhóm. Hai dạng thường gặp là numeric enum và string enum.

### Numeric enum mặc định

```ts
enum CardinalDirections {
  North, // 0
  East,  // 1
  South, // 2
  West   // 3
}

let direction = CardinalDirections.North;
console.log(direction); // 0
// direction = "North"; // Lỗi
```

### Bắt đầu từ giá trị tùy chỉnh

```ts
enum CardinalDirections {
  North = 1,
  East,  // 2
  South, // 3
  West   // 4
}
```

### Gán giá trị rõ ràng

```ts
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}

console.log(StatusCodes.NotFound); // 404
console.log(StatusCodes.Success);  // 200
```

### String enum

```ts
enum Status {
  Success = "SUCCESS",
  Error = "ERROR"
}
```

Trong một số thiết kế TypeScript hiện đại, union các string literal cũng là lựa chọn gọn nhẹ thay cho `enum`, ví dụ `type Status = "SUCCESS" | "ERROR"`.

## 4. Type aliases và interfaces

### Type alias

`type` đặt tên cho một kiểu. Nó dùng được với primitive, object, array, tuple, union, intersection và nhiều dạng kiểu khác.

```ts
type CarYear = number;
type CarType = string;
type CarModel = string;

type Car = {
  year: CarYear;
  type: CarType;
  model: CarModel;
};

const car: Car = {
  year: 2001,
  type: "Toyota",
  model: "Corolla"
};
```

### Union (`|`) và intersection (`&`)

- **Union**: giá trị có thể thuộc một trong các kiểu được liệt kê.
- **Intersection**: giá trị phải đáp ứng tất cả các kiểu được kết hợp.

```ts
type Status = "success" | "error";

let response: Status = "success";
// response = "pending"; // Lỗi

type Animal = { name: string };
type Bear = Animal & { honey: boolean };

const bear: Bear = {
  name: "Winnie",
  honey: true
};
```

### Interface

`interface` chủ yếu mô tả cấu trúc object.

```ts
interface Rectangle {
  height: number;
  width: number;
}

const rectangle: Rectangle = {
  height: 20,
  width: 10
};
```

### Extending interfaces — mở rộng interface

```ts
interface Rectangle {
  height: number;
  width: number;
}

interface ColoredRectangle extends Rectangle {
  color: string;
}

const coloredRectangle: ColoredRectangle = {
  height: 20,
  width: 10,
  color: "red"
};
```

### Declaration merging

Các khai báo `interface` cùng tên trong cùng phạm vi có thể được hợp nhất nếu không xung đột.

```ts
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}

const dog: Animal = {
  name: "Fido",
  age: 5
};
```

### So sánh `interface` và `type`

| Tiêu chí | `interface` | `type` |
|---|---|---|
| Mục đích chính | Mô tả cấu trúc object | Đặt tên cho nhiều loại kiểu |
| Primitive, union, tuple | Không trực tiếp | Có |
| Mở rộng | `extends` | Thường dùng intersection `&` |
| Declaration merging | Có | Không thể khai báo trùng tên để hợp nhất |
| Dùng với `implements` trong class | Có | Có thể dùng nếu type tương thích với object |

Cả `interface` và `type` đều phù hợp để mô tả object. Chọn theo nhu cầu của dự án và quy ước nhóm.

## 5. Functions — hàm

### Return type — kiểu trả về

Có thể ghi rõ kiểu trả về sau dấu `)` bằng `: Type`. Nếu bỏ qua, TypeScript thường suy luận kiểu từ các câu lệnh `return`.

```ts
function getTime(): number {
  return new Date().getTime();
}
```

### `void`

Dùng khi hàm không có giá trị trả về hữu ích cho bên gọi.

```ts
function printHello(): void {
  console.log("Hello!");
}
```

### Parameter types — kiểu tham số

```ts
function multiply(a: number, b: number): number {
  return a * b;
}
```

### Optional parameters — tham số tùy chọn

Thêm `?` sau tên tham số. Tham số tùy chọn nên đặt sau các tham số bắt buộc.

```ts
function add(a: number, b: number, c?: number): number {
  return a + b + (c ?? 0);
}

add(2, 5);    // 7
add(2, 5, 3); // 10
```

### Rest parameters — gom nhiều đối số

Rest parameter dùng `...` và nhận các đối số còn lại dưới dạng array.

```ts
function add(a: number, b: number, ...rest: number[]): number {
  return a + b + rest.reduce((sum, value) => sum + value, 0);
}

add(1, 2, 3, 4, 5); // 15
```

### Function type alias

```ts
type Negate = (value: number) => number;

const negateFunction: Negate = (value) => value * -1;

console.log(negateFunction(5)); // -5
```

## 6. Type guards — thu hẹp kiểu

Type guard là cách kiểm tra để TypeScript hiểu giá trị đang thuộc kiểu nào trong một đoạn mã.

### `typeof`

Thường dùng với kiểu nguyên thủy:

```ts
function printValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### `instanceof`

Dùng để kiểm tra một object có phải instance của class/hàm khởi tạo hay không.

```ts
function printError(value: unknown): void {
  if (value instanceof Error) {
    console.log(value.message);
  }
}
```

### `in`

Kiểm tra thuộc tính có tồn tại trong object hay không; TypeScript có thể dùng kết quả để thu hẹp union.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird): void {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}
```

### Discriminated unions

Dùng một thuộc tính nhãn chung như `kind` hoặc `type` để phân biệt các trường hợp.

```ts
type Result =
  | { kind: "success"; data: string }
  | { kind: "error"; message: string };

function handleResult(result: Result): void {
  if (result.kind === "success") {
    console.log(result.data);
  } else {
    console.error(result.message);
  }
}
```

### User-defined type guard với `is`

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function print(value: unknown): void {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}
```

### Assertion functions với `asserts`

Dùng để kiểm tra điều kiện và báo lỗi nếu điều kiện không đúng. Sau khi assertion thành công, TypeScript có thể thu hẹp kiểu.

```ts
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Expected a string");
  }
}

function print(value: unknown): void {
  assertIsString(value);
  console.log(value.toUpperCase());
}
```

> `kind`, `type`, `is` và `asserts` không phải tất cả đều là các toán tử type guard độc lập: `kind`/`type` thường là tên thuộc tính phân biệt union; `is` và `asserts` xuất hiện trong khai báo hàm kiểm tra kiểu.

## 7. Node.js project với TypeScript

### Tạo project

```bash
mkdir my-ts-node-app
cd my-ts-node-app
npm init -y
npm install --save-dev typescript @types/node
npx tsc --init
```

### Ví dụ `tsconfig.json`

Đây là một cấu hình tham khảo cho project dùng CommonJS:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Cấu hình module và `moduleResolution` cần tương thích với phiên bản TypeScript và cách project sử dụng CommonJS/ES Modules. Không nhất thiết phải dùng nguyên xi cấu hình trên cho mọi dự án.

### Cấu trúc thư mục

```text
my-ts-node-app/
├── src/
│   ├── server.ts
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   └── config/
├── dist/          # JavaScript được biên dịch
├── node_modules/
├── package.json
└── tsconfig.json
```

Biên dịch bằng:

```bash
npx tsc
```

Thư mục `dist/` chứa mã JavaScript đầu ra; thông thường không chỉnh sửa trực tiếp các file đã biên dịch.

## 8. Nullish coalescing (`??`) và optional chaining (`?.`)

### `??` — giá trị mặc định khi `null` hoặc `undefined`

`??` chỉ dùng giá trị dự phòng khi vế trái là `null` hoặc `undefined`. Khác với `||`, nó vẫn giữ `0`, `""` và `false`.

```ts
function printMileage(mileage: number | null | undefined): void {
  console.log(`Mileage: ${mileage ?? "Not Available"}`);
}

printMileage(null);      // Mileage: Not Available
printMileage(undefined); // Mileage: Not Available
printMileage(0);         // Mileage: 0
```

### `?.` — truy cập an toàn

Nếu phần nằm trước `?.` là `null` hoặc `undefined`, biểu thức dừng và trả về `undefined` thay vì gây lỗi khi truy cập tiếp.

```ts
interface House {
  sqft: number;
  yard?: {
    sqft: number;
  };
}

function printYardSize(house: House): void {
  const yardSize = house.yard?.sqft;

  if (yardSize === undefined) {
    console.log("No yard");
  } else {
    console.log(`Yard is ${yardSize} sqft`);
  }
}

const home: House = { sqft: 500 };
printYardSize(home); // No yard
```

## 9. `keyof`

`keyof` tạo ra kiểu union gồm các key hợp lệ của một kiểu object.

```ts
interface Person {
  name: string;
  age: number;
}

// keyof Person là "name" | "age"
function printPersonProperty(person: Person, property: keyof Person): void {
  console.log(`Thuộc tính ${property}:`, person[property]);
}

const person: Person = {
  name: "Max",
  age: 27
};

printPersonProperty(person, "name"); // Hợp lệ
// printPersonProperty(person, "email"); // Lỗi
```

### `keyof` với index signature

```ts
type StringMap = { [key: string]: unknown };

// keyof StringMap là string | number
function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value };
}
```

JavaScript chuyển các key số của object thành key dạng chuỗi khi lưu/truy cập, vì vậy `keyof` của index signature dạng `string` có thể là `string | number`.

### Kết hợp `keyof` với generics

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 101,
  username: "alex",
  isActive: true
};

const username = getProperty(user, "username"); // string
const status = getProperty(user, "isActive");   // boolean
// getProperty(user, "role"); // Lỗi: key không tồn tại
```

- `T` là kiểu của object.
- `K extends keyof T` giới hạn `K` chỉ nhận key hợp lệ của `T`.
- `T[K]` là kiểu giá trị tại key `K`.

## 10. Type inference — suy luận kiểu

TypeScript thường tự suy luận kiểu từ giá trị khởi tạo, giá trị trả về hoặc ngữ cảnh sử dụng.

### Suy luận từ giá trị

```ts
let name = "Alice";       // string
let age = 30;             // number
let isActive = true;      // boolean

let numbers = [1, 2, 3];  // number[]
let mixed = [1, "two", true]; // (string | number | boolean)[]

name.toUpperCase(); // Hợp lệ
age.toFixed(2);     // Hợp lệ
// name.toFixed(2); // Lỗi
```

### Suy luận kiểu trả về của hàm

```ts
function greet(name: string) {
  return `Hello, ${name}!`; // string
}

function add(a: number, b: number) {
  return a + b; // number
}

function getValue(key: string) {
  if (key === "name") {
    return "Alice";
  }
  return 42; // kiểu trả về string | number
}
```

### Suy luận theo ngữ cảnh

```ts
const names = ["Alice", "Bob", "Charlie"];

names.forEach((name) => {
  console.log(name.toUpperCase()); // name được suy luận là string
});

document.addEventListener("click", (event) => {
  console.log(event.clientX, event.clientY); // event được suy luận là MouseEvent
});
```

### Suy luận với object literal

```ts
const user = {
  id: 1,
  name: "Alice",
  details: {
    city: "New York"
  }
};

console.log(user.name.toUpperCase());
// user.age; // Lỗi: thuộc tính age không được khai báo
```

## 11. Literal types

Literal type giới hạn biến vào một tập giá trị cụ thể, thay vì cho phép mọi giá trị của kiểu rộng như `string` hoặc `number`.

### String literal union

```ts
type Direction = "north" | "south" | "east" | "west";

let direction: Direction = "north";
direction = "south";
// direction = "up"; // Lỗi
```

Có thể dùng trực tiếp trong tham số hàm:

```ts
function move(direction: "north" | "south" | "east" | "west"): void {
  console.log(`Moving ${direction}`);
}

move("east");
// move("left"); // Lỗi
```

### Numeric literal types

```ts
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6;

diceRoll = 1;
diceRoll = 6;
// diceRoll = 2.5; // Lỗi
```

### Boolean literal types

```ts
type YesOnly = true;

function alwaysSucceed(): true {
  return true;
}

type SuccessFlag = true | "success" | 1;
type FailureFlag = false | "failure" | 0;
```

### Literal types trong object và API response

```ts
type HTTPSuccess = {
  status: 200 | 201 | 204;
  statusText: "OK" | "Created" | "No Content";
  data: unknown;
};

type HTTPError = {
  status: 400 | 401 | 403 | 404 | 500;
  statusText:
    | "Bad Request"
    | "Unauthorized"
    | "Forbidden"
    | "Not Found"
    | "Internal Server Error";
  error: string;
};

type HTTPResponse = HTTPSuccess | HTTPError;
```

Dùng `unknown` thay vì `any` khi chưa biết kiểu dữ liệu và muốn buộc kiểm tra trước khi sử dụng.

### Template literal types

Template literal types kết hợp các kiểu literal bằng cú pháp backtick và `${...}`.

```ts
type Direction = "north" | "south" | "east" | "west";
type Distance = "1km" | "5km" | "10km";

type DirectionAndDistance = `${Direction}-${Distance}`;

let route: DirectionAndDistance = "north-5km";
// route = "north-2km"; // Lỗi
```

## 12. Index signatures

Index signature mô tả kiểu của các giá trị được truy cập bằng key động.

### String index signature

```ts
interface StringDictionary {
  [key: string]: string;
}

const names: StringDictionary = {
  firstName: "Alice",
  lastName: "Smith",
  "100": "One Hundred"
};

console.log(names["firstName"]); // Alice
names["nickname"] = "Al";
// names["age"] = 30; // Lỗi: value phải là string
```

### Number index signature

```ts
interface NumberDictionary {
  [index: number]: unknown;
}

const scores: NumberDictionary = {
  0: "Zero",
  1: 100,
  2: true
};

console.log(scores[0]); // Zero
scores[3] = { passed: true };
```

Dùng `unknown` thay vì `any` nếu muốn buộc người dùng kiểm tra kiểu trước khi thao tác với giá trị.

### Thuộc tính có tên kết hợp với index signature

Kiểu của các thuộc tính có tên cụ thể phải tương thích với kiểu value của index signature.

```ts
interface UserInfo {
  name: string;
  age: number;
  [key: string]: string | number;
}

const user: UserInfo = {
  name: "Alice",
  age: 30,
  address: "123 Main St",
  zipCode: 12345
};
```

### Ví dụ API response

```ts
interface ApiResponse<T> {
  data: {
    [resourceType: string]: T[];
  };
  meta: {
    page: number;
    total: number;
    [key: string]: unknown;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
}

const apiResponse: ApiResponse<User> = {
  data: {
    users: [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" }
    ]
  },
  meta: {
    page: 1,
    total: 2,
    timestamp: "2023-01-01T00:00:00Z"
  }
};

const users = apiResponse.data.users;
console.log(users[0].name); // Alice
```

## 13. Asynchronous programming — lập trình bất đồng bộ

### Promise

`Promise<T>` biểu diễn một kết quả có thể có trong tương lai:

- `pending`: đang chờ kết quả.
- `fulfilled`: hoàn thành thành công với giá trị kiểu `T`.
- `rejected`: thất bại với lý do lỗi.

Nếu không có giá trị thành công hữu ích, có thể dùng `Promise<void>`. `Promise<never>` đôi khi phù hợp với một thao tác không bao giờ hoàn tất thành công, nhưng hiếm gặp.

```ts
const fetchGreeting = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;

      if (success) {
        resolve("Hello, TypeScript!");
      } else {
        reject(new Error("Failed to fetch greeting"));
      }
    }, 1000);
  });
};

fetchGreeting()
  .then((greeting) => {
    // greeting được suy luận là string
    console.log(greeting.toUpperCase());
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  });
```

### `async` / `await`

- Hàm có `async` luôn trả về một Promise.
- `await` chờ Promise hoàn tất trong hàm `async`, giúp code dễ đọc hơn.
- Dùng `try...catch` để xử lý lỗi có thể xảy ra.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

async function fetchUsers(): Promise<User[]> {
  console.log("Fetching users...");

  // Giả lập độ trễ mạng 1 giây
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));

  return [
    { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "user" }
  ];
}

async function processUsers(): Promise<void> {
  try {
    const users = await fetchUsers(); // User[]

    users.forEach((user) => {
      console.log(`${user.name} (${user.role}): ${user.email}`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Lỗi khi tải users:", error.message);
    } else {
      console.error("Lỗi không xác định:", error);
    }
  }
}

// Gọi hàm để chạy ví dụ
processUsers();
```
