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
/**
 * Any functions getting or posting Course-types can be found here
 * Ask Miki how to handle many-to-many relationship when using Http!
 */
let CourseController = class CourseController {
    constructor(courseRepo, reviewRepo, courseProfessorRepo) {
        this.courseRepo = courseRepo;
        this.reviewRepo = reviewRepo;
        this.courseProfessorRepo = courseProfessorRepo;
    }
    async getAllCourses() {
        return await this.courseRepo.find();
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
    async addCourseToDataBase(course) {
        return await this.courseRepo.create(course);
    }
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
    async addCourseProfessorPair(courseProfessor) {
        return this.courseProfessorRepo.create(courseProfessor);
    }
};
__decorate([
    rest_1.get('/courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getAllCourses", null);
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
    __metadata("design:paramtypes", [course_model_1.Course]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourseToDataBase", null);
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
__decorate([
    rest_1.post('/course_professor'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [course_professor_model_1.CourseProfessor]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "addCourseProfessorPair", null);
CourseController = __decorate([
    __param(0, repository_1.repository(course_repository_1.CourseRepository)),
    __param(1, repository_1.repository(review_repository_1.ReviewRepository)),
    __param(2, repository_1.repository(course_professor_repository_1.CourseProfessorRepository)),
    __metadata("design:paramtypes", [course_repository_1.CourseRepository,
        review_repository_1.ReviewRepository,
        course_professor_repository_1.CourseProfessorRepository])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map