import { property, Entity, model } from "@loopback/repository";

@model()
export class Professor extends Entity {
    @property({
        type: "number",
        id: true
    })
    professor_id: number;

    @property({
        type: "string"
    })
    first_name: string;

    @property({
        type: "string"
    })
    last_name: string;

    
    getId() {
        return this.professor_id;
    }
    



}
