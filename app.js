// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodoArray); // loading local storage
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// FUNCTIONS

// Adding a new todo, generating the HTML and calling the local storage function
function addTodo(event) {
  event.preventDefault(); // prevent refreshing every time

  // generating div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // generating LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; // not sure what I am doing here
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo); // appending the list under the todo div

  // add todo to local storage
  saveLocalTodoArray(todoInput.value);

  // generate check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // generate a delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append my div to the existing list in the html (i.e. under <ul>)
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

// checking or removing todos from the list (html doc & local storage)
function deleteCheck(event) {
  const item = event.target;
  // DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement; // finding the parent element
    // Animation
    todo.classList.add("fall");
    // Remove from local storage
    removeLocalTodo(todo);

    // Remove after the "transition" "end"

    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // Check
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// filtering todos from html properties
function filterTodo(e) {
  const todos = todoList.childNodes; // these are all of the todos I have appended to the divs
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "All":
        todo.style.display = "flex"; // i.e. set css to display
        break;
      case "Completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none"; // set css to NOT display
        }
        break;
      case "Uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// storing todos in local storage
function saveLocalTodoArray(todo) {
  // Check if I have existing todos in local storage
  let todoArray;
  if (localStorage.getItem("todoArray") === null) {
    todoArray = []; // if we don't have it, create a local array
  } else {
    todoArray = JSON.parse(localStorage.getItem("todoArray"));
    // if we have them we'll get an array
  }
  // in both cases above i'll end up with an array
  todoArray.push(todo); //then we are going to push the to do in local storage
  localStorage.setItem("todoArray", JSON.stringify(todoArray));
}

function getTodoArray() {
  // Check if I have existing todos in local storage
  let todoArray;
  if (localStorage.getItem("todoArray") === null) {
    todoArray = []; // if we don't have it, create a local array
  } else {
    todoArray = JSON.parse(localStorage.getItem("todoArray"));
    todoArray.forEach((localTodoItem) => {
      // generating div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      // generating LI
      const newTodo = document.createElement("li");
      newTodo.innerText = localTodoItem; // not sure what I am doing here
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo); // appending the list under the todo div

      // generate check mark button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);

      // generate a delete button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      // append my div to the existing list in the html (i.e. under <ul>)
      todoList.appendChild(todoDiv);
    });
  }
}

function removeLocalTodo(todo) {
  let todoArray;
  if (localStorage.getItem("todoArray") != null) {
    todoArray = JSON.parse(localStorage.getItem("todoArray"));
    const todoIndex = todoArray.indexOf(todo.children[0].innerText);
    todoArray.splice(todoIndex, 1); // index of the item to remove, and number (1) of el to rem.
    localStorage.clear();
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
  }
}

/*
Interestingly - function or arrow function.
The difference between a function declaration and a function expression is that they are parsed at different times. The declaration is defined everywhere in its scope, whereas the expression is only defined when its line is reached.
*/
