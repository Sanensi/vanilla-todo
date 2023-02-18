const todoList = document.querySelector("ul");

fetch("/api/todo")
  .then((r) => r.json())
  .then(renderTodos);

/**
 * @param {string[]} todos
 */
function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoList.appendChild(todoLi);
  });
}
