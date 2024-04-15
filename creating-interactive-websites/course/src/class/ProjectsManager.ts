//Projects Manager contains classes and methods to manage the project, e.g. create new, delete, import/export.

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
    //Add map and inlcudes methods to check and avoid to create a project with the same name.
    newProject(data: IProject) {
        const projectNames = this.list.map((project) => { //Taking projects from the list and return their names. The result is 
                                                        //a new list projectNames
            return project.name
        })
        const nameInUse = projectNames.includes(data.name) //Check if a project name (data.name) is included in the projectNames list
        if(nameInUse) {
            throw new Error(`The "${data.name}" project name already exists`)
            //throw is a special keyword used to stop the execution of the application by providing an error explaining why that
            //happened -> new Error an in built method that allows to display a message. We can control what happens after the error
            //by going to index.ts and use the try and catch statement.
        }

        const project = new Project(data) //Create project
        project.ui.addEventListener("click", () => { //Event when the project card is clicked
            const projectsPage = document.getElementById("projects-page")
            const detailsPage = document.getElementById("project-details")
            if (!(projectsPage && detailsPage)) { return } // || is OR operator. If there is no projects page or details page, then
                                                            //Finish the function. !projectsPage || !detailsPage or 
                                                            // (!(projectsPage && detailsPage))
            projectsPage.style.display = "none"
            detailsPage.style.display = "flex"
            
        })


        this.ui.append(project.ui) //This inserts a dumb element inside of another, e.g. 
        this.list.push(project)
        return project //return project is the return value of the newProject method
    }

    //Get a reference to store projects
    //The way to achieve all these methods is to use array operators which are built in methods that allows to process
    //each item of a given list individually

    //Get project needs an argument to retrieve the project, hence the project needs a unique ID which is set by the code and not
    //the user. To achieve that, there is an international standard called the UUID.
    //To ensure the code can generate UUID, we use the UUID package. We run 'npm i uuid'.
    //The UUID package is not a development dependency (so we don't install using -uuid as we did with npm). When we run the app,
    //the code depends on the UUID package to be working fine.
    getProject(id: string) {
        //We find if there is a project that matches the given ID. Iterator methods will always
        // have the callback in the first argument () => {}. Callback is just a function that is passed as an input to
        //another function.
        //When Javascript is iterating each elements in the array, it invoking this function and pass it to a reference
        //of the current element being iterated. We can catch up that iteration element here in the argument of anonymous function
        // e.g. "project".
        const project = this.list.find((project) => { //In the case of find method, we use the callback must return a boolean value so the current 
                                        //project being iterated knows if it's the one we are looking for.
            return project.id === id  //When the return value by the callback is true, means that the ID of the current project
                                        //being iterated matches the ID of the provided ID. Then find method finishes the 
                                        //iteration and give the ID found. So we define a const to store the project ID found.
        })
        return project
     }

    deleteProject(id: string) {
        const project = this.getProject(id)             //To remove the UI from the page. Get the project by its ID.
        if(!project) { return }                         //If the project to be deleted is not found, then finish the function.
        project.ui.remove                               //The ! sign before the project is to invert the boolean result.
                                                        //If the value is true, then it's converted to false. We can read the if
                                                        //expression as if there is no project, return the function. 
                                                        //If the project is found, then remove the UI and filter the data.                                           

        const remaining = this.list.filter((project) => { //The callback filter method must also return a boolean.
            return project.id !== id                    //If the boolean is false, the value is going to be removed from the
                                                        //list. Otherwise, it's going to be kept.
        })                                              //The filter method is non destructive, that means the original list
                                                        //of projects keeps unaffected and the methods return a new list with
        this.list = remaining                           //the filter data. In programming this is known as immutability and it is
     }                                                  //important as it let us preserve the integrity of data.
                                                        //Remaining are all the projects which are not matching with the provided
                                                        //in the argument, hence the ID. We store them in a constant and then we
                                                        //replace the list value with those "remaining" projects.
                                                        //We are removing the project from the list, but not the UI from the page.


    //Method to calculate the total cost of all projects.
    //reduce(callbackFn, initialValue). If initialValue is not provided, TypeError is thrown.
    getTotalProjectCost() { 
        const totalCost: number = this.list.reduce((accumulator, project) => accumulator + project.cost, 0)
        return totalCost
    }

    //Get project by name method
    getProjectByName(name: string) {
        const project = this.list.find((project) => {
            return project.name === name
        })
        return project

    }
    
    // Exporting information means creating, each file has an extension which define its data format.
    // JSON is JavaScript Object Notation, text based format with "key": "value". 
    exportToJSON(filename: string = "projects") { //If not filename is provided, the default name is "projects"
        const json = JSON.stringify(this.list, (key, value) => { //Stringify method convert any input in a JSON string
            if(key === "ui") return undefined //Check if key match the string "ui". If match, return "undefined"
            return value //else return value
        }) 
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob) //Set the blob to create the url to donwload it
        const a = document.createElement('a') //Ghost element which is not added to the HTML but it's only used to download data
        a.href = url //The 'a' element has a href property where we set the url of the data to be downloaded
        a.download = filename //Download property used to set the name of the file to be downloaded
        a.click()
        URL.revokeObjectURL(url) //Clean the url

    }

    importToJSON() {
        const input = document.createElement('input') //Create input file
        input.type = 'file' //Define the type of the input
        input.accept = 'application/json' //Define the file type accepted
        const reader = new FileReader() //Create an instance of the file reader object
        reader.addEventListener("load", () => { //The load event happens after the change event
            const json = reader.result //Getting the result of the reader
            if (!json) { return } //If there is no result, finish the callback. If there are results ->
            const projects: IProject[] = JSON.parse(json as string) // -> Treat the json as string and parse the content.
                                                                    //Parse method converts json back to JS object
            for (const project of projects) {
                try {
                    this.newProject(project)
                } catch (error) {
                    alert(error.message)
                    
                }
            }
        })
        input.addEventListener('change', () => { //When the file is selected using the input, the change event is fired.
            const fileList = input.files // The file property will be assigned to fileList
            if (!fileList) { return } //Checking if the file property contains something
            reader.readAsText(fileList[0]) //Read the file as text. When finishing processing the file content, the load event is fired.
        })
        input.click()
    } 

}