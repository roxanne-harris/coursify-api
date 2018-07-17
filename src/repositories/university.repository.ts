import { DefaultCrudRepository } from "@loopback/repository";
import { University } from "../models/university.model";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class UniversityRepository extends DefaultCrudRepository<
University,
typeof University.prototype.id>
{
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(University, datasource);
    }
}
