import { Project, IProject, ProjectStatus, UserRole } from "./class/Project"
// Project class is not used anymore once we introduce the ProjectsManager class.
import { ProjectsManager } from "./class/ProjectsManager" //Import ProjectsManager to create a new List and append data

/*
//One of the 3 ways to create function with the syntax function"name of the function"() {}
//Open Modal 
function showModal(id: string) {
    const modal = document.getElementById(id)
    if(modal && modal instanceof HTMLDialogElement) { // instanceof is to ensure modal is an HTML element 
        modal.showModal()
    } else {
        console.warn("Modal ID was not found:", id)
    }
      
} 

//Close Modal
function closeModal(id: string) {
    const modal = document.getElementById(id)
    if(modal && modal instanceof HTMLDialogElement) { // instanceof is to ensure modal is an HTML element 
        modal.close()
    } else {
        console.warn("Modal ID was not found:", id)
    }
      
} */

//Define accept/cancel properties
const submitNewProjectButton = document.getElementById("submit-new-project-btn") as HTMLElement
const cancelNewProjectButton = document.getElementById("cancel-new-project-btn") as HTMLElement

//Toggle Modal
function toggleModal(id: string) {
    const modal = document.getElementById(id)
    if(modal && modal instanceof HTMLDialogElement) {
        if(modal.open) {
            modal.close()
        } else {
            modal.showModal()
        }
    } else {
        console.warn("Modal ID was not found:", id)
    }
}

//Before the ProjectsManager class runs, get a reference to the project list in the HTML document
const projectsListUI = document.getElementById("projects-list") as HTMLElement

//Create an instance of the ProjectsManager 
const projectsManager = new ProjectsManager(projectsListUI)


//This document object is provided by the browser, and its main purpose is to help us interact.
const newProjectBtn = document.getElementById("new-project-btn")
if(newProjectBtn) { //runs if true
    newProjectBtn.addEventListener("click", () => {toggleModal("new-project-modal")}) 
    //addEventListener is a method used for an event to happen, e.g. when the user click.
} else { //runs if false
    console.warn("New project button was not found:")
}

//Control document form
const projectForm = document.getElementById("new-project-form")
if(projectForm && projectForm instanceof HTMLFormElement) { // instanceof is to ensure modal is an HTML element 
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const projectFormData = new FormData(projectForm)
        const projectData: IProject = {
            name: projectFormData.get("projectName") as string,
            description: projectFormData.get("projectDescription") as string,
            userRole: projectFormData.get("userRole") as UserRole,
            status: projectFormData.get("projectStatus") as ProjectStatus,
            finishDate: new Date(projectFormData.get("projectFinishDate") as string),
        }
        const project = projectsManager.newProject(projectData)
        projectForm.reset() //Reset the form once submitted.
        toggleModal("new-project-modal") //Close the modal after it's submitted.
    })
} else {
    console.warn("The project form was not found. Check the ID")
}