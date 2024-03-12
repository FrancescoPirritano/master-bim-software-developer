//One of the 3 ways to create function with the syntax function"name of the function"() {}
function showModal(id) {
    const modal = document.getElementById(id)
    if(modal) {
        modal.showModal()
    } else {
        console.warn("Modal ID was not found:", id)
    }
      
}

//This document object is provided by the browser, and its main purpose is to help us interact.
const newProjectBtn = document.getElementById("new-project-btn")
if(newProjectBtn) { //runs if true
    newProjectBtn.addEventListener("click", () => {showModal("new-project-modal")}) 
    //addEventListener is a method used for an event to happen, e.g. when the user click.
} else { //runs if false
    console.warn("New project button was not found:")
}

