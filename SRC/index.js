import("./style.css");

function getMealAsHTML(meal) {
  //   console.info("inside map");
  return `<tr>
  <td>${meal.order}</td>
  <td>${new Date().toLocaleString()}</td>
  <td>${meal.food}</td>
  <td>${meal.symptom}</td>
  <td>${meal.avoid}</td>
  <td><span class="plus">&#43;</span></td>
</tr>`;
}

function renderMeals(meals) {
  const mealsHTML = meals.map(getMealAsHTML);
  document.querySelector("#mealsTable tbody").innerHTML = mealsHTML.join("");
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

loadMeals();
