//One of the 3 ways to create function with the syntax function"name of the function"() {}
function showModal() {
    const modal = document.getElementById("new-project-modal")
    modal.showModal()  
}

/*
One of the 3 ways to create function: syntax const"name of the function" = () => {}
const showModal = () => {
    const modal = document.getElementById("new-project-modal")
    modal.showModal()
}
*/

//This document object is provided by the browser, and its main purpose is to help us interact.
const newProjectBtn = document.getElementById("new-projects-btn")
newProjectBtn.addEventListener("click", showModal) //addEventListener is a method used for an event to happen, e.g. when the user click.