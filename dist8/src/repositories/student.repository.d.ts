import { DefaultCrudRepository } from "@loopback/repository";
import { Student } from "../models/student.model";
import { DataSource } from "loopback-datasource-juggler";
export declare class StudentRepository extends DefaultCrudRepository<Student, typeof Student.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
