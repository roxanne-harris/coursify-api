import { DefaultCrudRepository } from "@loopback/repository";
import { Course } from "../models/course.model";
import { DataSource } from "loopback-datasource-juggler";
export declare class CourseRepository extends DefaultCrudRepository<Course, typeof Course.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
