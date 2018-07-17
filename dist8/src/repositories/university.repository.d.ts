import { DefaultCrudRepository } from "@loopback/repository";
import { University } from "../models/university.model";
import { DataSource } from "loopback-datasource-juggler";
export declare class UniversityRepository extends DefaultCrudRepository<University, typeof University.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
