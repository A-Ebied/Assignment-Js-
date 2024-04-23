//Q1
// function sumNumber(num1, num2) {
//   const result = num1 + num2;
//   return result;
// }

// const num1 = 20;
// const num2 = 10;
// console.log(`The Sum ${num1} and ${num2} is: ` + sumNumber(num1, num2));

//Q2 *******************************************
// function isPalindrome(str) {
//   return str === str.split("").reverse().join("");
// }
// const str1 = "racecar";
// console.log(`The String is isPalindrome : ` + isPalindrome(str1)); // Output: true

// const str2 = "Hello, World!";
// console.log(`The String is is't Palindrome : ` + isPalindrome(str2)); // Output: false

//Q3 ********************************************
// function reverseStr(str) {
//   const string = str.split("").reverse().join("");
//   return string;
// }

// const revStr = "Abdallah";
// console.log(reverseStr(revStr));

//Q4 ********************************************
// function getEvenNum(numbers) {
//   const evenNum = numbers.filter((num) => num % 2 == 0);
//   return evenNum;
// }
// const numbers = [1, 2, 4, 5, 6, 7, 8, 9, 12];
// console.log(getEvenNum(numbers));

//Q5 ********************************************

// function deepClone(originalObject) {
//   const cobyObj = { ...originalObject };
//   cobyObj.name = "Ali";
//   cobyObj.age = 20;
//   cobyObj.address.city = "Alx";
//   console.log(cobyObj);
// }

// const originalObject = {
//   name: "Ahmed",
//   age: 30,
//   hobbies: ["reading", "painting"],
//   address: { street: "123 Main St", city: "Cairo" },
// };

// console.log(originalObject);
// console.log(`deepCloneObj is :` + deepClone(originalObject));

//Q6 ********************************************

// function reverseString(str) {
//   var reversedStr = "";

//   for (var i = str.length - 1; i >= 0; i--) {
//     reversedStr = reversedStr + str.charAt(i);
//   }

//   return reversedStr;
// }

// var string = "Ahmed !";
// console.log(`Reverse a string without reverse () : ` + reverseString(string)); // Output: '! demhA'

//Q7 ********************************************

// function sumArray(numbers) {
//   let sum = 0;

//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }

//   return sum;
// }

// const numArrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const totalSum = sumArray(numArrays);
// console.log(totalSum); // Output: 55

//Q8 ********************************************

// function factorial(n) {
//   if (n === 0 || n === 1) {
//     return 1;
//   } else {
//     return n * factorial(n - 1);
//     // var result = 1;

//     // for (var i = 2; i <= n; i++) {
//     //   result *= i;
//     // }

//     // return result;
//   }
// }

// const num = 5;
// const factorialNum = factorial(num);
// console.log(factorialNum);

//Q9 ********************************************

// function calcAvg(numbers){
//     if (numbers.length === 0) {
//         return 0;
//       }

//       let sum=0
//       for(let i=0 ;i<numbers.length;i++){
//         sum+=numbers[i];
//       }
//       var average = sum / numbers.length;
//       return average;

// }

// const numArrays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const numAvg = calcAvg(numArrays);
// console.log(numAvg); // Output: 5.5

//Q10 ********************************************

// function findIndex(arr, element) {
//     for (var i = 0; i < arr.length; i++) {
//       if (arr[i] === element) {
//         return i;
//       }
//     }

//     return -1;
//   }

//   const numbersArray = [1, 2, 3, 4, 5];
//   const elementToFind = 4;
// //   const elementToFind = 6; //Output:-1
//   const index = findIndex(numbersArray, elementToFind);
//   console.log(index); // Output: 3

//Q11 ********************************************

// function isInt(number){
//     return Number.isInteger(number)
// }
// const number = 12.0;
// console.log(isInt(number)); // Output: true

//Q12 ********************************************

// function calcAgeInDays(age) {
//   const ageInDays = age * 365;
//   return ageInDays;
// }

// const age = 23;
// const ageInDays = calcAgeInDays(age);
// console.log(ageInDays); // Output: 8395

//Q13 ********************************************

/* A callback function is a function that is called at the end of another function, 
allowing the programmer to define the desired behavior that 
should happen after a particular operation 
or event,used in asynchronous programming.*/

// function greet(name) {
//   console.log(`Hello, ${name}!`);
// }

// function processName(name, callback) {
//   const processedName = name.toUpperCase();
//   callback(processedName);
// }
// const name = "Jon";
// processName(name, greet); //Output: Hello, JON!
