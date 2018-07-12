import { property, Entity, model } from "@loopback/repository";

@model()
export class University extends Entity {
    @property({
        type: "number",
        id: true
    })
    university_id: number;

    @property({
        type: "string"
    })
    name: string;

    getId() {
        return this.professor_id;
    }
    



}
