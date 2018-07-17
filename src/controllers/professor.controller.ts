import { repository } from "@loopback/repository";
import { ProfessorRepository } from "../repositories/professor.repository";
import { Professor } from "../models/professor.model";
import { get, param } from "@loopback/rest";

export class ProfessorController {
    constructor(
        @repository(ProfessorRepository) protected professorRepo: ProfessorRepository
    ) {}

    @get('/professors')
    async getAllProfessors(): Promise<Professor[]> {
        return await this.professorRepo.find();
    }

    @get('/professors/uni')
    async getProfessorsByUniversity(
        @param.query.number('university_id') university_id: number
    ) {
        return await this.professorRepo.find({
            where: {
                university_id: university_id 
            }
        })
    }
}