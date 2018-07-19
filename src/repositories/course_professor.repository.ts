import { DefaultCrudRepository } from "@loopback/repository";
import { Course_Professor } from "../models/course_professor.model";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class Course_ProfessorRepository extends DefaultCrudRepository<
Course_Professor,
typeof Course_Professor.prototype.id>
{
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Course_Professor, datasource);
    }
}