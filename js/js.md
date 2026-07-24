### Spread parameter
```
const category = 'Computing';
const categories = ['Gaming', 'Multimedia'];
const productCategories = [...categories, category];
```

On objects
```
const product = {
  name: 'Keyboard',
  price: 75
};
const newProduct = {
  ...product,
  price: 100, // overwrite the price property of product
  category: 'Computing'
};

```

### Rest parameters

```
function addProduct(name, ...categories) {
  const product = {
    name: name,
    categories: categories.join(',')
  };
  return product;
}

console.log(addProduct('Vikas', 'Electronics', 'Computers', 'Gadgets')); // { name: 'Vikas', categories: 'Electronics,Computers,Gadgets' }
```

### Optional chaining
```
if (order !== undefined) {
  const product = order.product;
}

const product = order?.product

const order = {
  product: {
    name: 'Laptop',
    price: 1200
  }
};
const name = order?.product?.name;
console.log(name); // Laptop

const student = {
  details: {
  }
};
const roll = student?.details?.roll;
console.log(roll); // undefined
```

### Nullish coalescing
```
const quantity = qty ? qty : 1;
const quantity = qty ?? 1;
```

### Class
```
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog("Mitzie");
d.speak(); // Mitzie barks.
```



What is the difference between var, let and const
```
var is function scoped while let and const are block scoped. All three are hoisted but var is initialized with undefined, wheras let and const remian in the Temporal Dead Zone until the declaration is reached, causing a ReferenceEror if accessed beforehand. const neither allows reassignmnet nor redeclaration and must be initialized when declared. let allows reassignment but not redeclaration
```

Closure and lexical scoping
The inner function remembers the lexical environment in which it was defined

```
function counter() {
    let count = 0;
    return function () {
        count++;
        console.log(count);
    };
}

const c1 = counter();

c1();
c1();
c1();

const c2 = counter();

c2();
// 1, 2, 3 and 1

def multiplier(x) {
  return function(y) {
    return x * y
  }
}

const double = multiplier(2)
double(3) // 6

const triple = multiplire(3)
triple(5) // 15
```


### Spread parameter
```
const category = 'Computing';
const categories = ['Gaming', 'Multimedia'];
const productCategories = [...categories, category];
```

On objects
```
const product = {
  name: 'Keyboard',
  price: 75
};
const newProduct = {
  ...product,
  price: 100, // overwrite the price property of product
  category: 'Computing'
};
```

