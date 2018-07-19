import { ProfessorRepository } from "../repositories/professor.repository";
import { Professor } from "../models/professor.model";
import { UniversityRepository } from "../repositories/university.repository";
export declare class ProfessorController {
    protected universityRepo: UniversityRepository;
    protected professorRepo: ProfessorRepository;
    constructor(universityRepo: UniversityRepository, professorRepo: ProfessorRepository);
    addProfessorToDatabase(professorInfo: any): Promise<void>;
    getAllProfessors(): Promise<Professor[]>;
    getProfessorById(professor_id: number): Promise<Professor>;
    getProfessorsByUniversity(university_id: number): Promise<Professor[]>;
}
