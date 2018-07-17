import { Entity } from "@loopback/repository";
export declare class Student extends Entity {
    student_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    paid: boolean;
    university_id: number;
    getId(): number;
}
