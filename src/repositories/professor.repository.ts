import { DefaultCrudRepository } from "@loopback/repository";
import { Professor } from "../models/professor.model";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";


export class ProfessorRepository extends DefaultCrudRepository<
Professor,
typeof Professor.prototype.id >
{

    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Professor, datasource);
    }
    
}