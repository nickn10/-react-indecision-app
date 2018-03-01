class Person {
   constructor(name = 'Anonymous', age = 0) {
      this.name = name;
      this.age = age;
   }
   greeting() {
      return `Hi, my name is ${this.name}!`
   }
   getDescription() {
      return `${this.name} is ${this.age} year(s) old.`
   }
}

class Student extends Person {
   constructor(name,age,major = 'Undecided') {
      super(name,age);
      this.major = major
   }
   getDescription() {
      return `${super.getDescription()}, and their major is ${this.major}`
   }
}

class Traveler extends Person {
   constructor(name,age, homeLocation) {
      super(name, age);
      this.homeLocation = homeLocation;
   }
   hasHomeLocation() {

      return !!this.homeLocation
   }
   greeting() {
      if(this.hasHomeLocation()) {
         return `${super.greeting()} I'm originally from ${this.homeLocation}.`
      }
      return super.greeting();
   }
}

const person = new Student('Andrew Mead', 26, 'Computer Science');
const person2 = new Student();
const traveler1 = new Traveler('Andrew', 26, 'Philidelphia');
const traveler2 = new Traveler();

console.log(person.getDescription());
console.log(person2.getDescription());
console.log(person.greeting());

console.log(traveler1.greeting());
console.log(traveler2.greeting());
