import { UniversityRepository } from "../repositories/university.repository";
import { University } from "../models/university.model";
export declare class UniversityController {
    protected universityRepo: UniversityRepository;
    constructor(universityRepo: UniversityRepository);
    getAllUniversities(): Promise<University[]>;
    findUniversityByName(name: string): Promise<University>;
}
