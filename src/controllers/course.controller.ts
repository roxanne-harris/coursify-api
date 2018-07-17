import { repository } from "@loopback/repository";
import { CourseRepository } from "../repositories/course.repository";
import { post, requestBody, HttpErrors, get, param } from "@loopback/rest";
import { Course } from "../models/course.model";
import { Review } from "../models/review.model";
import { ReviewRepository } from "../repositories/review.repository";
import { CourseProfessor } from "../models/course_professor.model";
import { Professor } from "../models/professor.model";
import { CourseProfessorRepository } from "../repositories/course_professor.repository";

/**
 * Any functions getting or posting Course-types can be found here
 * Ask Miki how to handle many-to-many relationship when using Http!
 */
export class CourseController {
    constructor(
        @repository(CourseRepository) protected courseRepo: CourseRepository,
        @repository(ReviewRepository) protected reviewRepo: ReviewRepository,
        @repository(CourseProfessorRepository) protected courseProfessorRepo: CourseProfessorRepository
    ) { }

    
    @get('/courses')
    async getAllCourses(): Promise<Course[]> {
        return await this.courseRepo.find();
    }


    @get('/course/id')
    async getCourseById(
        @param.query.number('course_id') course_id: number
    ) {
        return await this.courseRepo.findById(course_id);
    }

    @get('/course/uni')
    async getCourseByUniversity(
        @param.query.number('university_id') university_id: number
    ) {
        return await this.courseRepo.find({
            where: {
                university_id: university_id
            }
        })
    }

    @post('/course/add')
    async addCourseToDataBase(
        @requestBody() course: Course
    ): Promise<Course> {
        return await this.courseRepo.create(course);
    }

    @post('/course/review')
    async addCourseReview(
        @requestBody() review: Review,
    ) {
        return this.reviewRepo.create(review);
    }

    @get('/course/reviews')
    async getAllCourseReviews(
        @param.query.number('course_id') course_id: number
    ) {
        return await this.reviewRepo.find({
            where: {
                course_id: course_id
            }
        });
    }

    @post('/course_professor')
    async addCourseProfessorPair(
        @requestBody() courseProfessor: CourseProfessor
    ): Promise<CourseProfessor> {
        return this.courseProfessorRepo.create(courseProfessor);
    }

    // @get('/courses/search')
    // async searchCourses(
    //     @param.query.string('subject') subject: string,
    //     @param.query.number('number') number?: number
    // ) {
    //     return await this.courseRepo.find({
    //         where: {
    //             and: [
    //                 { subject: subject },
    //                 { number: number }
    //             ]
    //         }
    //     })
    // }

    // @get('/courses/{subject}/{number}')
    // async findCourse(
    //     @param.path.string('subject') subject: string,
    //     @param.path.number('number') number: number
    // ) {
    //     let courseExists: boolean = !!(await this.courseRepo.count(
    //         { subject },
    //         { number }
    //     ));

    //     if (!courseExists) {
    //         throw new HttpErrors.BadRequest('course does not exist');
    //     }

    //     return await this.courseRepo.findOne({
    //         where: {
    //             and: [
    //                 { subject: subject },
    //                 { number: number }
    //             ]
    //         }
    //     });
    // }

    

    // make sure course and student exist or else this will fail
    

    

    // @get('/reviews/student')
    // async getAllReviewsByStudentId(
    //     @param.query.number('student_id') student_id: number
    // ) {
    //     return await this.reviewRepo.find({
    //         where: {
    //             student_id: student_id
    //         }
    //     });
    // }



}
