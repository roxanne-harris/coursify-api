import { property, Entity, model } from "@loopback/repository";;

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

    @property({
        type: "number"
    })
    university_id: number;

    
    getId() {
        return this.course_id;
    }
    



}
