/**** To-Do List ****/
/* If data exists in local storage, parse data and put into todoList array */
/* else do nothing */
/* If data entered by input, 
   1. show data with creating li/span/button component and appending to ul.
   2. save to local storage(id/text object -> string) 
   3. put into todoList array with id. */
/* When delete btn clicked,
   1. remove li component.
   2. refresh todoList array.
   3. save to local storage. */

const TODOS_LS = "toDos"

const todoInpForm = document.querySelector(".js-todoInput")
const todoInput = todoInpForm.querySelector("input")
const todoMsgList = document.querySelector(".js-todoList") 

let todoListArr = [];

function handleDeleteToDo(event) {
    event.preventDefault()

    // delete li element 
    const delLi = event.target.parentNode
    todoMsgList.removeChild(delLi)

    // update todoListArr
    /* CHECK!! - filter */
    const updatedArr = todoListArr.filter(function(todo) {
        return parseInt(delLi.id) !== todo.id
    })

    // For refreshing ids
    for(let i=0; i<updatedArr.length; i++){
        updatedArr[i].id = i+1;
    }

    todoListArr = updatedArr;

    setTodoToLS();
}

function setTodoToLS() {
    const todoStr = JSON.stringify(todoListArr)
    localStorage.setItem(TODOS_LS, todoStr); // todoStr must be string.
}

function showToDos(val) {
    const li = document.createElement("li")
    const span = document.createElement("span")
    const delBtn = document.createElement("button")

    const toDoId = todoListArr.length + 1;

    delBtn.innerText = "X"
    delBtn.addEventListener("click", handleDeleteToDo)

    span.innerText = val;

    li.appendChild(delBtn)
    li.appendChild(span)
    li.id = toDoId

    todoMsgList.appendChild(li)

    const todoObj = {
        id: toDoId,
        todoTxt: val
    }

    todoListArr.push(todoObj)
}

function handleTodoSubmit(event) {
    // prevent default event action
    event.preventDefault()

    // show todo list
    showToDos(todoInput.value)

    // save to local storage
    setTodoToLS()

    todoInput.value = ""
}

function loadToDos() {
    const todoData = localStorage.getItem(TODOS_LS)
    if(todoData !== null) {
        const parsedTodo = JSON.parse(todoData)
        
        for(let i=0; i<parsedTodo.length; i++) {
            // call showToDos
            showToDos(parsedTodo[i].todoTxt)
        }
    }
}

function init() {
    loadToDos()
    todoInpForm.addEventListener("submit", handleTodoSubmit)
}

init();