//Import UUID package
//The UUID package installed created something called v4 so by using the 'as' we rename the package to uuidv4.
import { v4 as uuidv4 } from 'uuid'


export type ProjectStatus = "Pending" | "Active" | "Finished"
export type UserRole = "Architect" | "Engineer" | "Developer"

// type is used to specify the type of an individual object
// interface is used to specify the type of multiple objects
export interface IProject { //Interface specifies Object types
    name: string
    description: string
    status: ProjectStatus
    userRole: UserRole
    finishDate: Date
}

export class Project implements IProject {
    //To satify the interface
    name: string
    description: string
    status: "Pending" | "Active" | "Finished"
    userRole: "Architect" | "Engineer" | "Developer"
    finishDate: Date

    //Class internals
    ui: HTMLDivElement
    cost: number = 0
    progress: number = 0
    id: string //ID used for the project once UUID package is installed

    // constructor creates instances of data. The constructor runs only once per project instance created.
    constructor(data: IProject) {
        //Project data definition
        this.name = data.name
        this.description = data.description
        this.status = data.status
        this.userRole = data.userRole
        this.finishDate = data.finishDate
        this.id = uuidv4() //uuidv4 is a function so every time is invoked, it returns a UUID for us to use.
        this.setUI() //The setUI method is then created multiple times so we write an if statement in the Project card UI
    
    }

    //Define the method. Unlike the constructor, Method don't get involved after the class is instanciated. 
    //Method needs to be invoked. The goal is to initiate the setUI with the constructor so we add "this.setUI()"
    setUI() {
        //Project card UI
        if(this.ui) {return} //if the UI is already defined then do not run the code to genereate it
        // return is used inside Functions to finish it 
        this.ui = document.createElement("div") //Create an instance of the card
        this.ui.className = "project-card" //The ui refers to a specific class in the HTML (project-card) instead of generic div
    
        // innerHTML is used to create the syntax of the content of that element
        // ${} is used to dynamically insert content in the string based on the data provided by the constructor. "$" can only 
        // be used if the `` syntax is used.
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