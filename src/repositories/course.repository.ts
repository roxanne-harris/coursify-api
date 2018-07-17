import { DefaultCrudRepository } from "@loopback/repository";
import { Course } from "../models/course.model";
import { DataSource } from "loopback-datasource-juggler";
import { inject } from "@loopback/core";

export class CourseRepository extends DefaultCrudRepository<
Course,
typeof Course.prototype.id> 
{
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Course, datasource);
    }
}