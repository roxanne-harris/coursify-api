import { UniversityRepository } from "../repositories/university.repository";
import { repository } from "@loopback/repository";
import { post, get, param } from "@loopback/rest";
import { University } from "../models/university.model";

export class UniversityController {
    constructor(
        @repository(UniversityRepository) protected universityRepo: UniversityRepository
    ) {}

    @get('/universities')
    async getAllUniversities(): Promise<University[]> {
        return await this.universityRepo.find();
    }

    @get('/university')
    async findUniversityByName(
        @param.query.string("name") name: string
    ) {
        return await this.universityRepo.findOne({
            where: {
                name: name
            }
        })
    }

}