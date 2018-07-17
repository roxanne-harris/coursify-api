import { Entity } from "@loopback/repository";
export declare class Course extends Entity {
    course_id: number;
    subject: string;
    number: number;
    title: string;
    description: string;
    university_id: number;
    getId(): number;
}
