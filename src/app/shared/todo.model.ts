import { v4 as uuidv4 } from "uuid"


export class Todo{
    id: string | undefined
    completed: boolean | undefined


    constructor(public text: string){
        this.id = uuidv4()
    }
}