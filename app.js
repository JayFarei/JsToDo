import generateTodoHTML from "./generateTodoHTML.js";

// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", loadLocalStorage);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// FUNCTIONS

// Adding a new todo, generating the HTML and calling the local storage function
function addTodo(event) {
  console.log(event);
  // prevent refreshing every time
  event.preventDefault();
  // generate todo HTML and append it to the <ul>
  generateTodoHTML(todoList, todoInput.value, "uncompleted");
  // add todo to local storage
  saveLocalTodoArray(todoInput.value);
  // removing the todo from the input field
  todoInput.value = "";
  location.reload(); // to force alignment in the array
}

// checking or removing todos from the list (html doc & local storage)
function deleteCheck(event) {
  const item = event.target;
  const todo = item.parentElement; // finding the parent element
  switch (item.classList[0]) {
    case "trash-btn":
      // Animation css identifier
      todo.classList.add("fall");
      // Remove from local storage
      removeLocalTodo(todo);
      // Remove after the "transition" "end"
      todo.addEventListener("transitionend", () => {
        todo.remove();
      });
      break;

    case "complete-btn":
      generateTodoHTML(todoList, todo.children[0].innerText, "completed");
      removeLocalTodo(todo);
      saveProgress(todo);
      todo.remove();
      break;

    case "restore-btn":
      generateTodoHTML(todoList, todo.children[0].innerText, "uncompleted");
      removeLocalTodo(todo);
      saveLocalTodoArray(todo.children[0].innerText);
      todo.remove();
      break;
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
        console.log(todos);
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

// storing unchecked in local storage
function saveLocalTodoArray(todoValue) {
  // Check if I have existing todos in local storage
  let todoArray;
  if (localStorage.getItem("uncompletedArray") === null) {
    todoArray = []; // if we don't have it, create a local array
  } else {
    todoArray = JSON.parse(localStorage.getItem("uncompletedArray"));
    // if we have them we'll get an array
  }
  // in both cases above i'll end up with an array
  todoArray.push(todoValue); //then we are going to push the to do in local storage
  localStorage.setItem("uncompletedArray", JSON.stringify(todoArray));
}

// load both unchecked and checked items
function loadLocalStorage() {
  // LOADING UNCHECKED
  // Check if I have existing uncompleted todos in local storage
  let todoArray;
  if (localStorage.getItem("uncompletedArray") === null) {
    todoArray = []; // if we don't have it, create a local array
  } else {
    // loading local arrays
    todoArray = JSON.parse(localStorage.getItem("uncompletedArray"));
    // Defining Array of unfinished items
    todoArray.forEach((localTodoItem) => {
      generateTodoHTML(todoList, localTodoItem, "uncompleted");
    });
  }
  // LOADING CHECKED
  // Check if I have existing completed todos in local storage
  let progressArray;
  if (localStorage.getItem("completedArray") === null) {
    progressArray = [];
  } else {
    // loading local arrays
    progressArray = JSON.parse(localStorage.getItem("completedArray"));
    progressArray.forEach((localTodoItem) => {
      generateTodoHTML(todoList, localTodoItem, "completed");
    });
  }
}

// removing todos from either storage location
function removeLocalTodo(todo) {
  /*
  todo: string representing the item
  localArray: storage option ("todoArray", "progressArray")
  */
  const todoToRemove = todo.children[0].innerText;
  const localStorageName = todo.classList[1] + "Array";
  let todoArray;
  if (localStorage.getItem(localStorageName) != null) {
    todoArray = JSON.parse(localStorage.getItem(localStorageName));
    const todoIndex = todoArray.indexOf(todoToRemove);
    todoArray.splice(todoIndex, 1);
    // index of the item to remove, and number (1) of el to rem.
    localStorage.removeItem(localStorageName);
    localStorage.setItem(localStorageName, JSON.stringify(todoArray));
  }
}

// storing checked todos in local storage

function saveProgress(todo) {
  const todoCompleted = todo.children[0].innerText;
  const localStorageName = "completedArray";
  console.log(localStorageName);
  let progressArray = [];
  if (localStorage.getItem(localStorageName) === null) {
    progressArray = []; // if we don't have it, create a local array
  } else {
    progressArray = JSON.parse(localStorage.getItem(localStorageName));
  }
  progressArray.push(todoCompleted); //then we are going to push the to do in local storage
  localStorage.setItem(localStorageName, JSON.stringify(progressArray));
}
