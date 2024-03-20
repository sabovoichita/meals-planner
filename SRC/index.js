import("./style.css");

function $(selector) {
  return document.querySelector(selector);
}

function createMealRequest(meal) {
  fetch("http://localhost:3000/meals-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(meal)
  });
}

function getMealAsHTML(meal) {
  //   console.info("inside map");
  return `<tr>
  <td>${meal.order}</td>
  <td>${meal.date}</td>
  <td>${meal.food}</td>
  <td>${meal.symptom}</td>
  <td>${meal.avoid}</td>
  <td><span class="plus">&#43;</span></td>
</tr>`;
}

function renderMeals(meals) {
  const mealsHTML = meals.map(getMealAsHTML);
  $("#mealsTable tbody").innerHTML = mealsHTML.join("");
}

function loadMeals() {
  fetch("http://localhost:3000/meals-json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(meals => {
      renderMeals(meals);
    });
}

function onSubmit(e) {
  // console.warn("submit", e);
  e.preventDefault();

  const date = $("input[name = order ]").value;
  const food = $("input[id = food]").value;
  const symptom = $("#symptom").value;
  const avoid = $("#avoid").value;

  const meal = {
    order: $("input[name = order ]").value,
    date: date,
    food: food,
    symptom,
    avoid
  };

  createMealRequest(meal);
  window.location.reload();
  // console.warn(meal);
}

function initEvents() {
  $("#mealsForm").addEventListener("submit", onSubmit);
}
initEvents();
loadMeals();
