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

//Default Project Card
const defaultProjectData : IProject = {
    name: "Default Project Name",
    description: "Default Project Description",
    status: "Active",
    userRole: "Architect",
    finishDate: new Date(26-10-2024),
}

const defaultProjectCard = projectsManager.newProject(defaultProjectData)

//Control document form
const projectForm = document.getElementById("new-project-form")
const cancelNewProjectButton = document.getElementById("cancel-new-project-btn") //Define cancel property
if(projectForm && projectForm instanceof HTMLFormElement) { // check if projectForm exists in a form of HTMLFormElement
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const projectFormData = new FormData(projectForm)
        const projectData: IProject = { //store data in this dictionary
            name: projectFormData.get("projectName") as string,
            description: projectFormData.get("projectDescription") as string,
            userRole: projectFormData.get("userRole") as UserRole,
            status: projectFormData.get("projectStatus") as ProjectStatus,
            finishDate: new Date(projectFormData.get("projectFinishDate") as string),
        }
        const project = projectsManager.newProject(projectData) //create object project using projectData dictionary
        projectForm.reset() //Reset the form once submitted.
        toggleModal("new-project-modal") //Close the modal after clicking on accept button
        console.log(project) //Print the object project
    })
        cancelNewProjectButton?.addEventListener("click", (e) => { //Event run when click cancel-new-project-btn
            projectForm.reset()
            toggleModal("new-project-modal") //Close the form
        })
} else { 
    console.warn("The project form was not found. Check the ID")
}