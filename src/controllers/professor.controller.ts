import { repository } from "@loopback/repository";
import { ProfessorRepository } from "../repositories/professor.repository";
import { Professor } from "../models/professor.model";
import { get, param, requestBody, post, HttpErrors } from "@loopback/rest";
import { UniversityRepository } from "../repositories/university.repository";

export class ProfessorController {
    constructor(
        @repository(UniversityRepository) protected universityRepo: UniversityRepository,
        @repository(ProfessorRepository) protected professorRepo: ProfessorRepository
    ) {}

    @post('/professor')
    async addProfessorToDatabase(
        @requestBody() professorInfo: any
    ){

        // if (!professorInfo.first_name || !professorInfo.last_name || !professorInfo.universityName) {
            
        //     throw new HttpErrors.BadRequest("invalid credentials");
        // }

        const uni = await this.universityRepo.findOne({
            where: {
                name: professorInfo.universityName
            }
        });

        if(!uni) {
            throw new HttpErrors.BadRequest("university does not exist")
        }

        var prof = new Professor;
        prof.professor_id = 0;
        prof.university_id = uni.university_id;
        prof.first_name = professorInfo.first_name;
        prof.last_name = professorInfo.last_name;

       // console.log(prof);
        
        this.professorRepo.create(prof);
    }

    @get('/professors')
    async getAllProfessors(): Promise<Professor[]> {
        return await this.professorRepo.find();
    }

    @get('/professorid')
    async getProfessorById(
        @param.query.number('professor_id') professor_id: number
    ) {
        console.log(professor_id);
        return await this.professorRepo.findById(professor_id);
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