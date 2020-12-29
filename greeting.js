/**** Greeting Message ****/
/* if name is saved in local storage, show msg. */
/* else, msg isn't be shown. */

const USERNAME_LS = "userName"
const SHOWING_CN = "showing" // controlled by css

const nameInpForm = document.querySelector(".js-nameInput")
const nameInput = nameInpForm.querySelector("input")
const greetingMsg = document.querySelector(".js-greeting")

function showGreeting(val) {
    nameInpForm.classList.remove(SHOWING_CN)
    greetingMsg.classList.add(SHOWING_CN)
    greetingMsg.innerText = `Hello ${val}!`;
}

function handleSubmit(event) {
    // prevent default event action
    event.preventDefault()

    // get input value
    const nameVal = nameInput.value;

    // show greeting msg
    showGreeting(nameVal)

    // save name to local storage
    setUserNameToLS(nameVal)

    // clean input
    nameInput.value = ""
}

function getUserNameFromLS() {
    const nameFromLS = localStorage.getItem(USERNAME_LS)
    console.log()

    if(nameFromLS !== null) {
        showGreeting(nameFromLS)
    } else {
        nameInpForm.classList.add(SHOWING_CN)
    }
}

function setUserNameToLS(val) {
    localStorage.setItem(USERNAME_LS, val)
}

function init() {
    // get user name from local storage
    getUserNameFromLS()

    // add new eventHandler to submit of input tag
    /* CHECK!! - submit event with form */
    nameInpForm.addEventListener("submit", handleSubmit) 
}

init()