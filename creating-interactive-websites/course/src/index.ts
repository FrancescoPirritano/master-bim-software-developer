import { IProject, status, userRole } from "./class/Project"
import { ProjectsManager } from "./class/ProjectsManager"

//method to show modal
function showModal(id: string) {
    const modal = document.getElementById(id)
    if (modal && modal instanceof HTMLDialogElement) {
        modal.showModal()
    } else {
        console.warn("ID was not found in the specified modal:", id)
    }
}

//method to close modal
function closeModal(id: string) {
    const modal = document.getElementById(id)
    if (modal && modal instanceof HTMLDialogElement) {
        modal.close()
    } else {
        console.warn("ID was not found in the specified modal:", id)
    }
}

//toggleFunction to close modal
function toggleModal(id: string) {
    const modal = document.getElementById(id)
    if(modal && modal instanceof HTMLDialogElement) {
        if(modal.open) {
            modal.close()
        } else modal.showModal()
    } else {
        console.warn("ID was not found in the specified modal:", id)
    }
}

const projectListUI = document.getElementById("projects-list") as HTMLElement
const projectManagers = new ProjectsManager(projectListUI)

// This document object is provided by the browser, and its main purpose is to help us interact with the website
const newProjectBtn = document.getElementById("new-project-btn")
console.log("New project btn value", newProjectBtn)
if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => {showModal("new-project-modal")})
} else {
    console.warn("The new project button was not found")
}

const projectForm = document.getElementById("new-project-form")
const cancelNewProjectForm = document.getElementById("cancel-new-project-btn")

if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(projectForm)

        const projectInformation: IProject = {
            name: formData.get("projectName") as string,
            description: formData.get("projectDescription") as string,
            userRole: formData.get("userRole") as userRole,
            status: formData.get("projectStatus") as status,
            finishDate: new Date(formData.get("projectFinishDate") as string),
        }
        const project = projectManagers.newProject(projectInformation)
        projectForm.reset()
        toggleModal("new-project-modal")
        console.log(project)
    })

    cancelNewProjectForm?.addEventListener("click", () => {
        projectForm.reset()
        toggleModal("new-project-modal")
    })

} else {
    console.warn("The project form was not found. Check the ID")
}