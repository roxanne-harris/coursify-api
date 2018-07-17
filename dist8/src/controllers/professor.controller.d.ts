import { ProfessorRepository } from "../repositories/professor.repository";
import { Professor } from "../models/professor.model";
export declare class ProfessorController {
    protected professorRepo: ProfessorRepository;
    constructor(professorRepo: ProfessorRepository);
    getAllProfessors(): Promise<Professor[]>;
    getProfessorsByUniversity(university_id: number): Promise<Professor[]>;
}
