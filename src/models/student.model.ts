import { property, Entity, model } from "@loopback/repository";

@model()
export class Student extends Entity {
    @property({
        type: "number",
        id: true
    })
    student_id: number;

    @property({
        type: "string"
    })
    first_name: string;

    @property({
        type: "string"
    })
    last_name: string;

    @property({
        type: "string",
        required: true
    })
    email: string;

    @property({
        type: "string",
        required: true
    })
    password: string;

    @property({
        type: "boolean"
    })
    paid: boolean;

    @property({
        type: "number",
    })
    university_id: number;

  

    
    getId() {
        return this.student_id;
    }
    



}
