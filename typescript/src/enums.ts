//Create a default numeric enum 
/*enum Direction {
    North, //-> luôn luôn mặc định value = 0
    East,
    West,
    South
}
let currentDirection = Direction.North;
console.log(currentDirection);*/

//Initialied Enum
enum Direction {
    north = 1, // <- initialied
    east,
    south,
    west
}
console.log(Direction.north); // 1
console.log(Direction.west);  // 4

//full initialied enum
enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400
}

console.log(StatusCodes.NotFound); // 404
console.log(StatusCodes.Success);  // 200

// String enum
enum CardinalDirections {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West'
}

console.log(CardinalDirections.North); // "North"
console.log(CardinalDirections.West);  // "West"