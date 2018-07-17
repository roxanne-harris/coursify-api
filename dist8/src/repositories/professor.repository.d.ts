import { DefaultCrudRepository } from "@loopback/repository";
import { Professor } from "../models/professor.model";
import { DataSource } from "loopback-datasource-juggler";
export declare class ProfessorRepository extends DefaultCrudRepository<Professor, typeof Professor.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
