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

//Define cancel properties
const cancelNewProjectButton = document.getElementById("cancel-new-project-btn") as HTMLButtonElement //Define cancel property for new projects
if(cancelNewProjectButton) {
    cancelNewProjectButton.addEventListener("click", (e) => { //Event run when click cancel-new-project-btn
        e.preventDefault()
        toggleModal("new-project-modal") //Close the form
    })
}

//Define close property for Error Popup
const closeErrorPopup = document.getElementById("cancel-error-popup-btn") as HTMLButtonElement //Define cancel property for popup form 

if(closeErrorPopup) { 
    closeErrorPopup.addEventListener("click", (e) => { 
        e.preventDefault()
        toggleModal("error-popup-modal") //Close error dialog
    })
}

//Define property to get total project cost
const totalProjectCost = projectsManager.getTotalProjectCost()

//Define Project Cost and close button
const totalProjectCostDisplay = document.getElementById("total-projects-cost-btn") as HTMLButtonElement //Define total cost property
if(totalProjectCostDisplay) { 
    totalProjectCostDisplay.addEventListener("click", (e) => {
        console.log("Total projects cost: $ ", totalProjectCost)
        // alert("Cost: $ " + totalProjectCost) // Alert shown when click total-projects-cost
        toggleModal("total-projects-cost-modal") //Event run when click total-projects-cost
    }) 
    } else {
        console.warn("Projects Cost button is not found:")
} 

const cancelTotalProjectsCost = document.getElementById("close-total-projects-cost-btn") as HTMLButtonElement
if(cancelTotalProjectsCost) { 
    cancelTotalProjectsCost.addEventListener("click", (e) => {
        toggleModal("total-projects-cost-modal")
    })
}

//Control document form
const projectForm = document.getElementById("new-project-form")
if(projectForm && projectForm instanceof HTMLFormElement) { // Check if projectForm exists in a form of HTMLFormElement
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
        //try an catch error statement. It's a statement like if/else but it only works with errors.
        try { //any code inside try, if given error, will stop and any code inside catch will be executed.
            const project = projectsManager.newProject(projectData) //create object project using projectData dictionary
            projectForm.reset() //Reset the form once submitted.
            toggleModal("new-project-modal") //Close the modal after clicking on accept button
        } catch (err) { //or catch(err)
            // alert(error) or window.alert(err) //
            const errorMessage = document.getElementById("err") as HTMLElement
            errorMessage.textContent = err
            toggleModal("error-popup-modal")            
        }

    })

} else { 
    console.warn("The project form was not found. Check the ID")
}

//Export project to JSON
const exportProjectsBtn = document.getElementById("export-projects-btn")
if(exportProjectsBtn) {
    exportProjectsBtn.addEventListener("click", () => {
        projectsManager.exportToJSON()
    })
}

//Import JSON file to create projects
const importProjectsBtn = document.getElementById("import-projects-btn")
if(importProjectsBtn) { 
    importProjectsBtn.addEventListener("click", () => {
        projectsManager.importToJSON()
    })
}