import { CourseRepository } from "../repositories/course.repository";
import { Course } from "../models/course.model";
import { Review } from "../models/review.model";
import { ReviewRepository } from "../repositories/review.repository";
import { Course_Professor } from "../models/course_professor.model";
import { Course_ProfessorRepository } from "../repositories/course_professor.repository";
import { UniversityRepository } from "../repositories/university.repository";
import { ProfessorRepository } from "../repositories/professor.repository";
/**
 * Any functions getting or posting Course-types can be found here
 * Ask Miki how to handle many-to-many relationship when using Http!
 */
export declare class CourseController {
    protected professorRepo: ProfessorRepository;
    protected courseRepo: CourseRepository;
    protected reviewRepo: ReviewRepository;
    protected courseProfessorRepo: Course_ProfessorRepository;
    protected universityRepo: UniversityRepository;
    constructor(professorRepo: ProfessorRepository, courseRepo: CourseRepository, reviewRepo: ReviewRepository, courseProfessorRepo: Course_ProfessorRepository, universityRepo: UniversityRepository);
    getAllCourses(): Promise<Course[]>;
    getCourseProfessors(course_id: number): Promise<Course_Professor[]>;
    getCourseById(course_id: number): Promise<Course>;
    getCourseByUniversity(university_id: number): Promise<Course[]>;
    addCourseToDataBase(courseInfo: any): Promise<Course>;
    addCourseProfessorPair(course_professorInfo: any): Promise<Course_Professor>;
    addCourseReview(review: Review): Promise<Review>;
    getAllCourseReviews(course_id: number): Promise<Review[]>;
}
