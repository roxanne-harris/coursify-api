import { Entity, model, property } from "@loopback/repository";

@model()
export class CourseProfessor extends Entity {
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