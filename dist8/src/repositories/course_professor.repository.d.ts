import { DefaultCrudRepository } from "@loopback/repository";
import { CourseProfessor } from "../models/course_professor.model";
import { DataSource } from "loopback-datasource-juggler";
export declare class CourseProfessorRepository extends DefaultCrudRepository<CourseProfessor, typeof CourseProfessor.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
