import { repository } from "@loopback/repository";
import { CourseRepository } from "../repositories/course.repository";
import { post, requestBody, HttpErrors, get, param } from "@loopback/rest";
import { Course } from "../models/course.model";
import { Review } from "../models/review.model";
import { ReviewRepository } from "../repositories/review.repository";

export class CourseController {
    constructor(
        @repository(CourseRepository) protected courseRepo: CourseRepository,
        @repository(ReviewRepository) protected reviewRepo: ReviewRepository
    ) { }

    @get('/course')
    async getCourseById(
        @param.path.number('course_id') course_id: number
    ) {
        return await this.courseRepo.findById(course_id);
    }



    @get('/courses')
    async findAllCourses(): Promise<Course[]> {
        let result = await this.courseRepo.find();
        // console.dir(result);
        return result;
    }

    @get('/courses/search')
    async searchCourses(
        @param.query.string('subject') subject: string,
        @param.query.number('number') number?: number
    ) {
        return await this.courseRepo.find({
            where: {
                and: [
                    { subject: subject },
                    { number: number }
                ]
            }
        })
    }

    @get('/courses/{subject}/{number}')
    async findCourse(
        @param.path.string('subject') subject: string,
        @param.path.number('number') number: number
    ) {
        let courseExists: boolean = !!(await this.courseRepo.count(
            { subject },
            { number }
        ));

        if (!courseExists) {
            throw new HttpErrors.BadRequest('course does not exist');
        }

        return await this.courseRepo.findOne({
            where: {
                and: [
                    { subject: subject },
                    { number: number }
                ]
            }
        });
    }

    @post('/addCourse')
    async addCourse(
        @requestBody() course: Course
    ): Promise<Course> {

        if (!course.subject || !course.number) {
            throw new HttpErrors.BadRequest('missing required data');
        }

        let courseExists: boolean = !!(await this.courseRepo.count(
            { subject: course.subject },
            { number: course.number }
        ));

        if (courseExists) {
            throw new HttpErrors.BadRequest('course already exists');
        }

        return await this.courseRepo.create(course);
    }

    // make sure course and student exist or else this will fail
    @post('/review')
    async postReview(
        @requestBody() review: Review,
    ) {
        return this.reviewRepo.create(review);
    }

    @get('/reviews/course')
    async getAllReviewsByCourseId(
        @param.query.number('course_id') course_id: number
    ) {
        return await this.reviewRepo.find({
            where: {
                course_id: course_id
            }
        });
    }

    @get('/reviews/student')
    async getAllReviewsByStudentId(
        @param.query.number('student_id') student_id: number
    ) {
        return await this.reviewRepo.find({
            where: {
                student_id: student_id
            }
        });
    }



}
