function addProduct(name, ...categories) {
  const product = {
    name: name,
    categories: categories.join(',')
  };
  return product;
}

console.log(addProduct('Vikas', 'Electronics', 'Computers', 'Gadgets'));

const order = {
  product: {
    name: 'Laptop',
    price: 1200
  }
};
const name = order?.product?.name;
console.log(name); 

const student = {
  details: {

  }
};
const roll = student?.details?.roll;
console.log(roll); 