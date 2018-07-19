import { Entity, model, property } from "@loopback/repository";

@model()
export class Course_Professor extends Entity {
    @property({
        type: "number",
        id: true
    })
    cp_id: number;

    @property({
        type: "number",
    })
    course_id: number;

    @property({
        type: "number",
    })
    professor_id: number;
}