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
      // console.warn("status: ?", status, meal);
      if (status.success) {
        // window.location.reload();
        meal.id = status.id;
        allMeals = allMeals.map(meal => meal);

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

// Function to sort meals based on a criterion and sorting order
function sortMeals(meals, sortBy, sortOrder) {
  const sortedMeals = meals.slice(); // Create a copy of meals array
  sortedMeals.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
  return sortedMeals;
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

  // Add event listener to the table header for sorting
  document.querySelectorAll("#mealsTable th span").forEach(span => {
    span.addEventListener("click", () => {
      const sortBy = span.dataset.sortBy;
      const sortOrder = span.dataset.sortOrder === "asc" ? "desc" : "asc"; // Toggle sorting order
      span.dataset.sortOrder = sortOrder;

      // Sort meals based on the selected criterion and sorting order
      const sortedMeals = sortMeals(allMeals, sortBy, sortOrder);
      renderMeals(sortedMeals);
    });
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

const calcScrollValue = () => {
  const scrollProgress = document.querySelector(".progress__scroll");
  const pos = document.documentElement.scrollTop;
  const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "flex";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#008000 ${scrollValue}%, #ffffff ${scrollValue}%)`;
};

function addFooterLink() {
  const footer = document.querySelector("footer");
  const link = document.createElement("a");
  link.href = "https://github.com/sabovoichita/myMeals";
  link.target = "_blank";
  link.textContent = "⚙Source Code";
  link.style.color = "white";
  footer.appendChild(link);
}
// Call the addFooterLink function after the page content is loaded
window.onload = addFooterLink();

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

initEvents();
loadMeals();
