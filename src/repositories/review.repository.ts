import { DefaultCrudRepository } from "@loopback/repository";
import { DataSource } from "loopback-datasource-juggler";
import { inject } from "@loopback/core";
import { Review } from "../models/review.model";

export class ReviewRepository extends DefaultCrudRepository<
Review,
typeof Review.prototype.id> 
{
    constructor(@inject('datasources.db') protected datasource: DataSource) {
        super(Review, datasource);
    }
}