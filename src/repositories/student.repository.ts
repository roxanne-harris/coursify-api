import { DefaultCrudRepository } from "@loopback/repository";
import { Student } from "../models/student.model";
import { DataSource } from "loopback-datasource-juggler";
import { inject } from "@loopback/core";

export class StudentRepository extends DefaultCrudRepository<
Student,
typeof Student.prototype.id> 
{
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Student, datasource);
    }
}