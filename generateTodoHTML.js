function generateTodoHTML(todoList, inputValue, property) {
  /*
    inputValue = string
    property = {"completed", "uncompleted"}
    */
  // generating DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.classList.toggle(property);

  // generating LI
  const newTodo = document.createElement("li");
  newTodo.innerText = inputValue; // not sure what I am doing here
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo); // appending the list under the todo div

  if (property === "uncompleted") {
    // generate check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
  } else if (property === "completed") {
    // generate restore button
    const restoreButton = document.createElement("button");
    restoreButton.innerHTML = '<i class="fas fa-history"></i>';
    restoreButton.classList.add("restore-btn");
    todoDiv.appendChild(restoreButton);
  }

  // generate a delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append my div to the existing "todo-list" <ul> list in the html
  todoList.appendChild(todoDiv);

  return todoList;
}

export default generateTodoHTML;
