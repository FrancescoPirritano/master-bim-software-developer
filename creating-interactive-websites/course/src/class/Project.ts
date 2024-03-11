import { ProjectsManager } from "./ProjectsManager"

export type status = "Active" | "Pending" | "Finished"
export type userRole = "Architect" | "Engineer" | "Developer"

export interface IProject {
    name: string
    description: string
    status: status
    userRole: userRole
    finishDate: Date
}

export class Project implements IProject {
    //To satisfy IProject
    name: string
    description: string
    status: "Active" | "Pending" | "Finished"
    userRole: "Architect" | "Engineer" | "Developer"
    finishDate: Date

    //Class internals
    ui: HTMLDivElement
    cost: number = 0
    progress: number = 0

    constructor(data: IProject) {
        //Project data definition
        this.name = data.name
        this.description = data.description
        this.status = data.status
        this.userRole = data.userRole
        this.finishDate = data.finishDate
        this.setUI()
    }

    defaultProject = () => {
        const defaultProjectData = {
            name: "Default Project Name" as string,
            description: "Default Project Description" as string,
            status: "Active" as status,
            userRole: "Architect" as userRole,
            finishDate: new Date(12/10/2024)
        }
        defaultProjectCard = ProjectsManager.newProject(defaultProject)
    }

    setUI() {
        if (this.ui) {return}
        this.ui = document.createElement("div")
        this.ui.className = "project-card"
        this.ui.innerHTML = `
        <div class="card-header">
            <p style="background-color: #ca8134; padding:10px; border-radius: 8px; aspect-ratio: 1;">HC</p>
            <div>
                <h5>${this.name}</h5>
                <p style="color: #969696; font-size: var(--font-sm);">${this.description}</p>
            </div>
        </div>
        <div class="card-content">
            <div class="card-property">
                <p style="color: #969696;">Status</p>
                <p>${this.status}</p>
            </div>
            <div class="card-property">
                <p style="color: #969696;">Role</p>
                <p>${this.userRole}</p>
            </div>
            <div class="card-property">
                <p style="color: #969696;">Cost</p>
                <p>$${this.cost}</p>
            </div>
            <div class="card-property">
                <p style="color: #969696;">Estimated Progress</p>
                <p>${this.progress * 100}%</p>
            </div>
        </div>`
    }
}