import { DefaultCrudRepository } from "@loopback/repository";
import { Course_Professor } from "../models/course_professor.model";
import { DataSource } from "loopback-datasource-juggler";
export declare class Course_ProfessorRepository extends DefaultCrudRepository<Course_Professor, typeof Course_Professor.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
