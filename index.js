//==================================
// Finding elements
//==================================

const main = document.querySelector(".main");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#input-todo");
const addButton = document.querySelector("#btn-add-todo");
const todolists = document.querySelector("#lists");
const warning = document.querySelector("#massege");

//==================================
// showMasege function
//==================================

const showMassege = (text, style) => {
    warning.textContent = text;
    warning.classList.add(style);
    setTimeout(()=>{
        warning.textContent = ""
    warning.classList.remove(style);
    },1000)
}

//==================================
// deleteTodo function
//==================================

const deleteTodo = (event) => {
    const selectTodo = event.target.parentElement.parentElement;
    todolists.removeChild(selectTodo);
    showMassege("Todo is deleted","bg-danger");
    
    let todos = getTodosLocalStorage();
    todos = todos.filter((todo) => todo.todoId != selectTodo.id);
    localStorage.setItem("mytodos", JSON.stringify(todos));

}

//==================================
// creatTodo function
//==================================

const creatTodo = (todoId, todoValue) => {
    const listCreat = document.createElement("li");
    listCreat.id = todoId;
    listCreat.classList.add("list-style")
    listCreat.innerHTML = `
    <span class="todo-width">${todoValue}</span>
    <button class="btn" id="delete"> 
        <i class="fa fa-trash"> </i> 
    </button> 
    `;
    todolists.appendChild(listCreat)
    const deleteButton = listCreat.querySelector("#delete");
    deleteButton.addEventListener("click",function(todoId){
        let deleteConfirm = confirm("Are you sure to delete?");
        console.log(deleteConfirm);
        if (deleteConfirm){
            deleteTodo(todoId);
        }
    })
}

//==================================
// getTodosLocalStorage function
//==================================

const getTodosLocalStorage = () =>{
    return localStorage.getItem("mytodos") ? 
    JSON.parse(localStorage.getItem("mytodos")) : [];
}

//==================================
// loadTodos function
//==================================

const loadTodos = () => {
    const todos = getTodosLocalStorage();
    todos.map((todo) => creatTodo(todo.todoId, todo.todoValue));
}

//==================================
// add todo function
//==================================

const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;

    //Unique id generate
    const todoId = Date.now().toString();
    creatTodo(todoId, todoValue)
    showMassege("Todo is created", "bg-succsess");

    //adding in local storage
    const todos = getTodosLocalStorage();
    todos.push({todoId, todoValue})
    localStorage.setItem("mytodos", JSON.stringify(todos));
    todoInput.value = "";
}

//==================================
// adding listener
//==================================

todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadTodos);
   
