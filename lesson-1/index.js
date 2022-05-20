const colors = require("colors/safe");

const isPrime = (number) => {

  if (number < 2) return false;

  for (let i = 2; i <= number / 2; i++) {
    if (number % i === 0) return false;
  }

  return true;
};

console.log();

let count = 1;
let quantityNumb = 0;

const from = Number(process.argv[2]);
const to = process.argv[3];

if (isNaN(from) || isNaN(to) || from >= to) {
  console.log(colors.red("Необходимо указать диапазон чисел от меньшего к большему"));
}

// if (from >= to) {
//   console.log(colors.red("Необходимо указать диапазон чисел от меньшего к большему"));
// }

for (let number = from; number <= to; number++) {
  let colorer = colors.green;

  if (isPrime(number)) {
    if (count % 2 === 0) {
      colorer = colors.yellow;
      count += 1;
    } else if (count % 3 === 0) {
      colorer = colors.red;
      count = 1;
    } else {
      count += 1;
    }

    console.log(colorer(number));
    quantityNumb++;
  }
}

if (quantityNumb === 0) {
  console.log(colors.red("В указанном диапазоне нет простых чисел"));
}
