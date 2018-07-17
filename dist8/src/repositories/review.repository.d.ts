import { DefaultCrudRepository } from "@loopback/repository";
import { DataSource } from "loopback-datasource-juggler";
import { Review } from "../models/review.model";
export declare class ReviewRepository extends DefaultCrudRepository<Review, typeof Review.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
