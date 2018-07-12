import { property, Entity, model } from "@loopback/repository";
import { Student } from "./student.model";

@model()
export class Course extends Entity {
    @property({
        type: "number",
        id: true
    })
    course_id: number;

    @property({
        type: "string"
    })
    subject: string;

    @property({
        type: "number"
    })
    number: number;

    @property({
        type: "string"
    })
    title: string;

    @property({
        type: "string"
    })
    description: string;

    
    getId() {
        return this.course_id;
    }
    



}
