"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals:
const Animal = {
  name: "",
  desc: "-unknown animal-",
  type: "",
  age: 0,
};

function start() {
  console.log("ready");

  // Første løsning:
  //   document.querySelector("[data-filter=cat]").addEventListener("click", showCats);
  //   document.querySelector("[data-filter=dog]").addEventListener("click", showDogs);

  // Anden løsning
  //   document.querySelector("[data-filter=cat]").addEventListener("click", filtering);
  //   document.querySelector("[data-filter=dog]").addEventListener("click", filtering);
  //   document.querySelector("[data-filter=*]").addEventListener("click", () => {
  //     displayList(allAnimals);
  //   });

  // Endelige løsning
  document.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", filtering);
  });

  loadJSON();
}

async function loadJSON() {
  const response = await fetch("animals.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allAnimals = jsonData.map(preapareObject);

  // TODO: This might not be the function we want to call first
  displayList(allAnimals);
}

function preapareObject(jsonObject) {
  const animal = Object.create(Animal);

  const texts = jsonObject.fullname.split(" ");
  animal.name = texts[0];
  animal.desc = texts[2];
  animal.type = texts[3];
  animal.age = jsonObject.age;

  return animal;
}

function displayList(animals) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}

//Første løsning
// function showCats() {
//   let onlyCats = allAnimals.filter(cats);
//   displayList(onlyCats);
// }
// function cats(animal) {
//   if (animal.type === "cat") {
//     return true;
//   } else {
//     return false;
//   }
// }
// function showDogs() {
//   let onlyDogs = allAnimals.filter(dogs);
//   displayList(onlyDogs);
// }
// function dogs(animal) {
//   if (animal.type === "dog") {
//     return true;
//   } else {
//     return false;
//   }
// }

//Anden løsning og endelige løsning (jeg fik filtering() til at virke med data-filter="*")
function filtering(evt) {
  const clicked = evt.target.dataset.filter;
  console.log(clicked);
  if (clicked !== "*") {
    let only = allAnimals.filter((animal) => {
      if (animal.type === clicked) {
        return true;
      } else {
        return false;
      }
    });
    displayList(only);
  } else {
    displayList(allAnimals);
  }
}
