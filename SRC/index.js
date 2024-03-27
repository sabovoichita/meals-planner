import("./style.css");

function $(selector) {
  return document.querySelector(selector);
}

function createMealRequest(meal) {
  return fetch("http://localhost:3000/meals-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(meal)
  }).then(r => r.json());
}

// DELETE teams-json/delete
function deleteMealRequest(id) {
  return fetch("http://localhost:3000/meals-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  }).then(r => r.json());
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
  <td>
  <button type = "button" data-id="${meal.id}" class = "action-btn delete-btn">♻</button>
  </td>
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

  const date = $("input[name = date ]").value;
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

  createMealRequest(meal).then(status => {
    // console.log("status", status);
    if (status.success) {
      window.location.reload();
    }
  });
  // console.info("ready", r);

  // console.warn(meal);
}

function initEvents() {
  $("#mealsForm").addEventListener("submit", onSubmit);

  $("#mealsTable tbody").addEventListener("click", e => {
    if (e.target.matches("button.delete-btn")) {
      const id = e.target.dataset.id;
      deleteMealRequest(id).then(status => {
        if (status.success) {
          window.location.reload();
        }
      });
    }
  });
}
initEvents();
loadMeals();
