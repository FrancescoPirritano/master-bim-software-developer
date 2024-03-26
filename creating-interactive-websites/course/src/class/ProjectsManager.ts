import { IProject, Project } from "./Project"

//Master Class existing for the whole application to keep reference to all projects,
// be able to delete them, import/export them, etc.
export class ProjectsManager {
    //List property to keep a reference to all projects. All the projects will be instances of the project Class created in
    // Project.ts.
    //We import Project.ts and define the type of this List as project. We use [] to tell Typescript that it's a list of 
    //project instances.
    list: Project[] = []
    ui: HTMLElement //Container for all the project cards

    //Diplay the project card in the web
    constructor(container: HTMLElement) {
        this.ui = container
    }

    //Create a method for the new project.
    newProject(data: IProject) {
        const project = new Project(data)
        this.ui.append(project.ui) //This inserts a dumb element inside of another, e.g. 
        this.list.push(project)
        return project //return project is the return value of the newProject method
    }

    //Get a reference to store projects
    getProject() { }

    deleteProject() { }

    exportToJSON() { }

    importToJSON() { }


}