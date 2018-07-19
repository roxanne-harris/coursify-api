"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const course_repository_1 = require("../repositories/course.repository");
const rest_1 = require("@loopback/rest");
const course_model_1 = require("../models/course.model");
const review_model_1 = require("../models/review.model");
const review_repository_1 = require("../repositories/review.repository");
const course_professor_model_1 = require("../models/course_professor.model");
const course_professor_repository_1 = require("../repositories/course_professor.repository");
const university_repository_1 = require("../repositories/university.repository");
const professor_repository_1 = require("../repositories/professor.repository");
/**
 * Any functions getting or posting Course-types can be found here
 * Ask Miki how to handle many-to-many relationship when using Http!
 */
let CourseController = class CourseController {
    constructor(professorRepo, courseRepo, reviewRepo, courseProfessorRepo, universityRepo) {
        this.professorRepo = professorRepo;
        this.courseRepo = courseRepo;
        this.reviewRepo = reviewRepo;
        this.courseProfessorRepo = courseProfessorRepo;
        this.universityRepo = universityRepo;
    }
    async getAllCourses() {
        return await this.courseRepo.find();
    }
    async getCourseProfessors(course_id) {
        return await this.courseProfessorRepo.find({
            where: {
                course_id: course_id
            }
        });
    }
    async getCourseProfessors2(professor_id) {
        return await this.courseProfessorRepo.find({
            where: {
                professor_id: professor_id
            }
        });
    }
    async getCourseById(course_id) {
        return await this.courseRepo.findById(course_id);
    }
    async getCourseByUniversity(university_id) {
        return await this.courseRepo.find({
            where: {
                university_id: university_id
            }
        });
    }
    // @post('/course/add')
    // async addCourseToDataBase(
    //     // TODO: Change argument type, try: any
    //     @requestBody() course: Course
    // ): Promise<Course> {
    //     // TODO: Form course over here
    //     return await this.courseRepo.create(course);
    // }
    async addCourseToDataBase(
    // TODO: Change argument type, try: any
    courseInfo) {
        // TODO: Form course over here
        const uni = await this.universityRepo.findOne({
            where: {
                name: courseInfo.universityName
            }
        });
        if (!uni) {
            throw new rest_1.HttpErrors.BadRequest("university does not exist");
        }
        var course = new course_model_1.Course;
        course.course_id = 0;
        course.university_id = uni.university_id;
        course.subject = courseInfo.subject;
        course.number = courseInfo.number;
        course.title = courseInfo.title;
        course.description = courseInfo.description;
        return await this.courseRepo.create(course);
    }
    async addCourseProfessorPair(course_professorInfo) {
        // console.log(course_professorInfo);
        let courses = await this.courseRepo.find();
        var course;
        courses.forEach((value) => {
            if (value.subject == course_professorInfo.subject) {
                course = value;
            }
        });
        console.log(course);
        if (!course) {
            throw new rest_1.HttpErrors.BadRequest("course does not exist");
        }
        let professors = await this.professorRepo.find();
        var professor;
        professors.forEach((value) => {
            if (value.last_name == course_professorInfo.last_name) {
                professor = value;
            }
        });
        if (!professor) {
            throw new rest_1.HttpErrors.BadRequest("professor does not exist");
        }
        console.log(professor);
        var course_professor = new course_professor_model_1.Course_Professor;
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
    async addCourseReview(review) {
        return this.reviewRepo.create(review);
    }
    async getAllCourseReviews(course_id) {
        return await this.reviewRepo.find({
            where: {
                course_id: course_id
            }
        });
    }
};
__decorate([
    rest_1.get('/courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourses", null);
__decorate([
    rest_1.get('/courseprofessors'),
    __param(0, rest_1.param.query.number("course_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseProfessors", null);
__decorate([
    rest_1.get('/courseprofessors2'),
    __param(0, rest_1.param.query.number("professor_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseProfessors2", null);
__decorate([
    rest_1.get('/course/id'),
    __param(0, rest_1.param.query.number('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseById", null);
__decorate([
    rest_1.get('/course/uni'),
    __param(0, rest_1.param.query.number('university_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseByUniversity", null);
__decorate([
    rest_1.post('/course/add'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourseToDataBase", null);
__decorate([
    rest_1.post('/course_professor'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourseProfessorPair", null);
__decorate([
    rest_1.post('/course/review'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [review_model_1.Review]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourseReview", null);
__decorate([
    rest_1.get('/course/reviews'),
    __param(0, rest_1.param.query.number('course_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourseReviews", null);
CourseController = __decorate([
    __param(0, repository_1.repository(professor_repository_1.ProfessorRepository)),
    __param(1, repository_1.repository(course_repository_1.CourseRepository)),
    __param(2, repository_1.repository(review_repository_1.ReviewRepository)),
    __param(3, repository_1.repository(course_professor_repository_1.Course_ProfessorRepository)),
    __param(4, repository_1.repository(university_repository_1.UniversityRepository)),
    __metadata("design:paramtypes", [professor_repository_1.ProfessorRepository,
        course_repository_1.CourseRepository,
        review_repository_1.ReviewRepository,
        course_professor_repository_1.Course_ProfessorRepository,
        university_repository_1.UniversityRepository])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map