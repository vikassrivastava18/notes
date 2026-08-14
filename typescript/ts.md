## Type by inference
type of variable is automatically inferred to be of string
```let helloWorld = "Hello world!"```

## Defining types
```
interface User {
    "name": string;
    id: number;
}

const user: User = {
    "name": "vikas",
    "id": 1
}
```

## Annotate parameters and return values
```
function deleteUser(user: User) {

}

function userInfo(id: number): User | null {

}
```

## Composing types
```
type WindowStates = "open" | "locked" | "minimized";
type positivePrimeUnderTen = 2 | 3 | 5 | 7;

function getlength(ob: string | string[]) {
    return ob.length
}
```

## Genereics
```
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{name: string}>;


interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}
```

## Structural Type System
```
interface Point {
    x: number;
    y: number;
}

function logPoint(p: Point) {
    console.log(`Point: (${p.x}, ${p.y})`)
}
```

## Class
```
class VirtualPoint {
    x: number;
    y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newPoint = new VirtualPoint(13, 56)
```
