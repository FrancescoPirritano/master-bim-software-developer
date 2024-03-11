import { IProject, Project } from "./Project";

export class ProjectsManager {
    static newProject() {
        throw new Error("Method not implemented.");
    }
    list: Project[] = []
    ui: HTMLElement

    constructor(container: HTMLElement) {
        this.ui = container
    }

    newProject(data: IProject) {
        const project = new Project(data)
        this.ui.append(project.ui)
        this.list.push(project)
        return project
    }
}