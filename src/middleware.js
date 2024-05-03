export function loadMealRequest() {
  return fetch("http://localhost:3000/meals-json/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
}

export function createMealRequest(meal) {
  return fetch("http://localhost:3000/meals-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(meal)
  }).then(r => r.json());
}

export function deleteMealRequest(id) {
  return fetch("http://localhost:3000/meals-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  }).then(r => r.json());
}
export function updateMealRequest(meal) {
  return fetch("http://localhost:3000/meals-json/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(meal)
  }).then(r => r.json());
}
