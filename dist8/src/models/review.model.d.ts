import { Entity } from "@loopback/repository";
export declare class Review extends Entity {
    review_id: number;
    course_id: number;
    student_id: number;
    remark: string;
    rating: number;
    header: string;
    getId(): number;
}
