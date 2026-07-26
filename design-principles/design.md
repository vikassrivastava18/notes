## Seperation of concerns
```
System MUST be divided into subsystems of elements grouped by their function or service(the concern). 
```

## Composition over inheritance
```
An object should attempt to use other object's functionality when needed, by referencing or instantiating them instead of creating a large and complex inheritance family tree of classes to add such functionality.
```

## Single responsibility principle
```
A class, method, function, or component should deal with only one responsibility or functionality. 
Multipurpose functions are hard to maintain
```

## Encapsulation
```
Data and methods should be wrapped to act as a single unit while exposing a well-defined API.
```

## KIC - keep it clean
```
keep similar functiona together, like CRUD methods should be placed near each other. 
Memory referencing handling - If we manually register an event, it is best to manually deregister it at the appropriate life cycle event of your component. This will prevent memory leaks and wast of memory and prevent security risks.
```

## DRY
```
It encompasses the notion of avoiding redundancy in the process that executes business logic of the application. Each process that executes business logic should exist in only one place in the entire application.
```

## KISS - keep it simple and short
```
Better to build simple, small functional parts that work together than to create a big and complex program in one go.
```

## SOLID 
    S - Single responsibility principle
    O - Open closed principle
    L - Liskov Substitution principle
    I - Interface segregation principle
    D - Dependency inversion principle


### Open-closed-principle
```
Object or entities should be open for extension but closed for modification
```