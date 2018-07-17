import { CourseRepository } from "../repositories/course.repository";
import { Course } from "../models/course.model";
import { Review } from "../models/review.model";
import { ReviewRepository } from "../repositories/review.repository";
import { CourseProfessor } from "../models/course_professor.model";
import { CourseProfessorRepository } from "../repositories/course_professor.repository";
/**
 * Any functions getting or posting Course-types can be found here
 * Ask Miki how to handle many-to-many relationship when using Http!
 */
export declare class CourseController {
    protected courseRepo: CourseRepository;
    protected reviewRepo: ReviewRepository;
    protected courseProfessorRepo: CourseProfessorRepository;
    constructor(courseRepo: CourseRepository, reviewRepo: ReviewRepository, courseProfessorRepo: CourseProfessorRepository);
    getAllCourses(): Promise<Course[]>;
    getCourseById(course_id: number): Promise<Course>;
    getCourseByUniversity(university_id: number): Promise<Course[]>;
    addCourseToDataBase(course: Course): Promise<Course>;
    addCourseReview(review: Review): Promise<Review>;
    getAllCourseReviews(course_id: number): Promise<Review[]>;
    addCourseProfessorPair(courseProfessor: CourseProfessor): Promise<CourseProfessor>;
}
