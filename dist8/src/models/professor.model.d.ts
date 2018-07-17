import { Entity } from "@loopback/repository";
export declare class Professor extends Entity {
    professor_id: number;
    university_id: number;
    first_name: string;
    last_name: string;
    getId(): number;
}
