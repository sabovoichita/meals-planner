import("./style.css");

function loadMeals() {
  fetch("meals.json")
    .then(r => r.json)
    .then(meals => {
      console.warn("meals", meals);
    });
}
loadMeals();
