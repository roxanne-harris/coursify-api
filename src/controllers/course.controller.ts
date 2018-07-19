import { repository } from "@loopback/repository";
import { CourseRepository } from "../repositories/course.repository";
import { post, requestBody, HttpErrors, get, param } from "@loopback/rest";
import { Course } from "../models/course.model";
import { Review } from "../models/review.model";
import { ReviewRepository } from "../repositories/review.repository";
import { Course_Professor } from "../models/course_professor.model";
import { Professor } from "../models/professor.model";
import { Course_ProfessorRepository } from "../repositories/course_professor.repository";
import { UniversityRepository } from "../repositories/university.repository";
import { ProfessorRepository } from "../repositories/professor.repository";

/**
 * Any functions getting or posting Course-types can be found here
 * Ask Miki how to handle many-to-many relationship when using Http!
 */
export class CourseController {
    constructor(
        @repository(ProfessorRepository) protected professorRepo: ProfessorRepository,
        @repository(CourseRepository) protected courseRepo: CourseRepository,
        @repository(ReviewRepository) protected reviewRepo: ReviewRepository,
        @repository(Course_ProfessorRepository) protected courseProfessorRepo: Course_ProfessorRepository,
        @repository(UniversityRepository) protected universityRepo: UniversityRepository
    ) { }


    @get('/courses')
    async getAllCourses(): Promise<Course[]> {
        return await this.courseRepo.find();
    }

    @get('/courseprofessors')
    async getCourseProfessors(
        @param.query.number("course_id") course_id: number
    ) {

        return await this.courseProfessorRepo.find({
            where: {
                course_id: course_id
            }
        });

       
    }

    @get('/courseprofessors2')
    async getCourseProfessors2(
        @param.query.number("professor_id") professor_id: number
    ) {

        return await this.courseProfessorRepo.find({
            where: {
                professor_id: professor_id
            }
        });

       
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

    // @post('/course/add')
    // async addCourseToDataBase(
    //     // TODO: Change argument type, try: any
    //     @requestBody() course: Course
    // ): Promise<Course> {
    //     // TODO: Form course over here
    //     return await this.courseRepo.create(course);
    // }

    @post('/course/add')
    async addCourseToDataBase(
        // TODO: Change argument type, try: any
        @requestBody() courseInfo: any
    ): Promise<Course> {
        // TODO: Form course over here

        const uni = await this.universityRepo.findOne({
            where: {
                name: courseInfo.universityName
            }
        })

        if(!uni) {
            throw new HttpErrors.BadRequest("university does not exist")
        }

        var course = new Course;
        course.course_id = 0;
        course.university_id = uni.university_id;
        course.subject = courseInfo.subject;
        course.number = courseInfo.number;
        course.title = courseInfo.title;
        course.description = courseInfo.description;

        return await this.courseRepo.create(course);
    }

    @post('/course_professor')
    async addCourseProfessorPair(
        @requestBody() course_professorInfo: any
    ) {

        // console.log(course_professorInfo);

        let courses = await this.courseRepo.find();
        var course: any;

        courses.forEach((value: any) => {
            if (value.subject == course_professorInfo.subject) {
                course = value;
            }
        });

        console.log(course);

        if(!course) {
            throw new HttpErrors.BadRequest("course does not exist")
        }



        let professors = await this.professorRepo.find();
        var professor: any;

        professors.forEach((value: any) => {
            if (value.last_name == course_professorInfo.last_name) {
                professor = value;
            }
        });

        if(!professor) {
            throw new HttpErrors.BadRequest("professor does not exist")
        }

        console.log(professor);

        var course_professor = new Course_Professor;
        course_professor.cp_id = 0;
        course_professor.course_id = course.course_id;
        course_professor.professor_id = professor.professor_id;
        return await this.courseProfessorRepo.create(course_professor);
    }



    // @post('/course/add')
    // async addCourseToDataBase(
    //     // TODO: Change argument type, try: any
    //     @requestBody() course: any
    // ): Promise<Course> {
    //     // TODO: Form course over here
    //     const uni  = await this.universityRepo.findOne({
    //         where: {
    //             name: course.universityName
    //         }
    //     })

    //     const uniId = uni.university_id;


    //     let c = new Course(

    //     )
    //     return await this.courseRepo.create(course);
    // }

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
