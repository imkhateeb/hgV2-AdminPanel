let objects = [
   { name: "Charlie", age: 25 },
   { name: "Alice", age: 30 },
   { name: "Bob", age: 22 }
];

objects.sort((a, b) => {
   let nameA = a.name.toUpperCase(); // ignore upper and lowercase
   let nameB = b.name.toUpperCase(); // ignore upper and lowercase
   if (nameA < nameB) {
       return -1;
   }
   if (nameA > nameB) {
       return 1;
   }
   return 0; // names must be equal
});

console.log(objects);
