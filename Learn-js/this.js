// Task 1: Bind the Correct Context
// Create an object person with properties name and a method introduce(). Use the bind() method to ensure the method works correctly when passed to another function.
// Task 1
const person = {
    name: "Alice",
    introduce: function () {
        return `Hi, my name is ${this.name}`;
    }
};

function greet(fn) {
   return fn();
}

const boundIntroduce  = person.introduce.bind(person);
console.log(greet(boundIntroduce));

// Task 2: Using call() to Invoke a Function with Different Contexts
// Write a function introduce() that uses the this keyword to introduce a person by name. Then, invoke introduce() using call() to introduce different people with the same function.
function introduce() {
    return `Hello, I am ${this.name}`;
}

const user1 = { name: 'Ravi' };
const user2 = { name: 'Jit' };

console.log(introduce.call(user1));
console.log(introduce.call(user2));


// Task 3: Using apply() to Pass Arguments with Context
// Create a function sum() that accepts two numbers and uses this to access a multiplier value. Then, invoke sum() with different contexts using apply(), passing the numbers as an array.
function sum(a, b) {
    return (a + b) * this.multiplier;
}

const context1 = { multiplier: 1};
const context2 = { multiplier: 5};

console.log(sum.apply(context1, [2, 3]));
console.log(sum.apply(context2, [2, 3]));