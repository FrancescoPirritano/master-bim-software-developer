export type ProjectStatus = "Pending" | "Active" | "Finished"
export type UserRole = "Architect" | "Engineer" | "Developer"

export interface IProject {
    name: string
    description: string
    status: ProjectStatus
    userRole: UserRole
    finishDate: Date
}

export class Project implements IProject {
    name: string
    description: string
    status: "Pending" | "Active" | "Finished"
    userRole: "Architect" | "Engineer" | "Developer"
    finishDate: Date

    constructor(data: IProject) {
        this.name = data.name
        this.description = data.description
        this.status = data.status
        this.userRole = data.userRole
        this.finishDate = data.finishDate        
    }
}