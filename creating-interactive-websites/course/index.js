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

//Control document form
const projectForm = document.getElementById("new-project-form")
if(projectForm) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const projectFormData = new FormData(projectForm)
        const projectData = {
            name: projectFormData.get("projectName"),
            description: projectFormData.get("projectDescription"),
            role: projectFormData.get("userRole"),
            status: projectFormData.get("projectStatus"),
            finishDate: projectFormData.get("projectFinishDate"),
        }
        console.log(projectData)
    })
} else {
    console.warn("The project form was not found. Check the ID")
}