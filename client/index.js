const todoList = document.querySelector("ul");
const createTodoInput = document.querySelector("input");

createTodoInput.addEventListener("keydown", handleKeyDown);

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

/**
 * @param {KeyboardEvent} e
 */
function handleKeyDown(e) {
  if (e.key === "Enter") {
    createTodo(e.target.value);
  }
}

function createTodo(todo) {
  fetch("/api/todo", {
    method: "post",
    body: todo,
  })
    .then((r) => r.json())
    .then(renderTodos);
}
