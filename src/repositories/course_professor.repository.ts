import { DefaultCrudRepository } from "@loopback/repository";
import { CourseProfessor } from "../models/course_professor.model";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class CourseProfessorRepository extends DefaultCrudRepository<
CourseProfessor,
typeof CourseProfessor.prototype.id>
{
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(CourseProfessor, datasource);
    }
}