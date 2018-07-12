import { property, Entity, model } from "@loopback/repository";

@model()
export class Review extends Entity {
    @property({
        type: "number",
        id: true
    })
    review_id: number;

    @property({
        type: "number"
    })
    course_id: number;

    @property({
        type: "number"
    })
    student_id: number;

    @property({
        type: "string"
    })
    remark: string;

    @property({
        type: "number"
    })
    rating: number;

    @property({
        type: "string"
    })
    header: string;

    
    getId() {
        return this.review_id;
    }
    



}
