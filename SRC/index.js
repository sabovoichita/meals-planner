import("./style.css");

let editId;
let allMeals = [];

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

function updateMealRequest(meal) {
  return fetch("http://localhost:3000/meals-json/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(meal)
  }).then(r => r.json());
}

function getMealAsHTML(meal) {
  //   console.info("inside map");
  return `<tr>
  <td>
  <button type = "button" data-id="${meal.id}" class = "action-btn edit-btn">&#9998;</button>
  <button type = "button" data-id="${meal.id}" class = "action-btn delete-btn">♻</button>
  ${meal.order}</td>
  <td>${meal.date}</td>
  <td>${meal.food}</td>
  <td>${meal.symptom}</td>
  <td>${meal.avoid}</td>
  <td><span class="plus">&#43;</span>
 </td>
</tr>`;
}

function areMealsEquals(renderedMeals, meals) {
  if (renderedMeals === meals) {
    console.info("same array");
    return true;
  }
  if (renderedMeals.length === meals.length) {
    const eq = renderedMeals.every((meal, i) => meal === meals[i]);
    if (eq) {
      console.info("same content in arrays");
      return true;
    }
  }
  return false;
}

let renderedMeals = [];
function renderMeals(meals) {
  // console.time("eq-check");
  if (areMealsEquals(renderedMeals, meals)) {
    // console.timeEnd("eq-check");
    return;
  }
  // console.timeEnd("eq-check");

  renderedMeals === meals;
  console.time("render");
  const mealsHTML = meals.map(getMealAsHTML);
  $("#mealsTable tbody").innerHTML = mealsHTML.join("");
  console.timeEnd("render");
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
      allMeals = meals;
      renderMeals(meals);
      console.timeEnd("app-ready");
    });
}

function onSubmit(e) {
  // console.warn("submit", e);
  e.preventDefault();

  const meal = getMealValues();

  if (editId) {
    meal.id = editId;
    console.warn("should we edit?", editId, meal);
    updateMealRequest(meal).then(status => {
      //   console.warn("status", status);
      if (status.success) {
        window.location.reload();
      }
    });
  } else {
    createMealRequest(meal).then(status => {
      console.warn("status: ?", status, meal);
      if (status.success) {
        // window.location.reload();
        meal.id = status.id;
        allMeals.push(meal);
        renderMeals(allMeals);
        $("#mealsForm").reset();
      }
    });
  }
}

function startEdit(id) {
  editId = id;
  const meal = allMeals.find(meal => meal.id === id);
  console.warn("edit", id, meal);
  setMealValues(meal);
}

function setMealValues(meal) {
  $("input[name=order]").value = meal.order;
  $("input[name=date]").value = meal.date;
  $("input[name=food").value = meal.food;
  $("input[name=symptom]").value = meal.symptom;
  $("input[name=avoid]").value = meal.avoid;
}

function getMealValues() {
  const order = $("input[name=order]").value;
  const date = $("input[name=date]").value;
  const food = $("input[id=food]").value;
  const symptom = $("#symptom").value;
  const avoid = $("#avoid").value;

  return {
    order: order,
    date: date,
    food: food,
    symptom,
    avoid
  };
}

function filterElements(meals, search) {
  search = search.toLowerCase();
  // console.warn("search %o", search);
  return meals.filter(meal => {
    // console.log("meal", meal.symptom === search);
    return (
      // meal.order.toLowerCase().includes(search) ||
      meal.date.toLowerCase().includes(search) ||
      meal.food.toLowerCase().includes(search) ||
      meal.symptom.toLowerCase().includes(search) ||
      meal.avoid.toLowerCase().includes(search)
    );
  });
}

function initEvents() {
  $("#search").addEventListener("input", e => {
    const search = e.target.value;
    const meals = filterElements(allMeals, search);
    renderMeals(meals);
  });

  $("#mealsForm").addEventListener("submit", onSubmit);

  $("#mealsForm").addEventListener("reset", () => {
    console.warn("reset", editId);
    editId = undefined;
  });

  $("#mealsTable tbody").addEventListener("click", e => {
    if (e.target.matches("button.delete-btn")) {
      const id = e.target.dataset.id;
      deleteMealRequest(id).then(status => {
        if (status.success) {
          allMeals = allMeals.filter(meal => meal.id !== id);
          renderMeals(allMeals);
        }
      });
    } else if (e.target.matches("button.edit-btn")) {
      const id = e.target.dataset.id;
      startEdit(id);
    }
  });
}
initEvents();
loadMeals();
