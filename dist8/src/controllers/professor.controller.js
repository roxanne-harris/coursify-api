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
const professor_repository_1 = require("../repositories/professor.repository");
const professor_model_1 = require("../models/professor.model");
const rest_1 = require("@loopback/rest");
const university_repository_1 = require("../repositories/university.repository");
let ProfessorController = class ProfessorController {
    constructor(universityRepo, professorRepo) {
        this.universityRepo = universityRepo;
        this.professorRepo = professorRepo;
    }
    async addProfessorToDatabase(professorInfo) {
        // if (!professorInfo.first_name || !professorInfo.last_name || !professorInfo.universityName) {
        //     throw new HttpErrors.BadRequest("invalid credentials");
        // }
        const uni = await this.universityRepo.findOne({
            where: {
                name: professorInfo.universityName
            }
        });
        if (!uni) {
            throw new rest_1.HttpErrors.BadRequest("university does not exist");
        }
        var prof = new professor_model_1.Professor;
        prof.professor_id = 0;
        prof.university_id = uni.university_id;
        prof.first_name = professorInfo.first_name;
        prof.last_name = professorInfo.last_name;
        // console.log(prof);
        this.professorRepo.create(prof);
    }
    async getAllProfessors() {
        return await this.professorRepo.find();
    }
    async getProfessorById(professor_id) {
        console.log(professor_id);
        return await this.professorRepo.findById(professor_id);
    }
    async getProfessorsByUniversity(university_id) {
        return await this.professorRepo.find({
            where: {
                university_id: university_id
            }
        });
    }
};
__decorate([
    rest_1.post('/professor'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "addProfessorToDatabase", null);
__decorate([
    rest_1.get('/professors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "getAllProfessors", null);
__decorate([
    rest_1.get('/professorid'),
    __param(0, rest_1.param.query.number('professor_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "getProfessorById", null);
__decorate([
    rest_1.get('/professors/uni'),
    __param(0, rest_1.param.query.number('university_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProfessorController.prototype, "getProfessorsByUniversity", null);
ProfessorController = __decorate([
    __param(0, repository_1.repository(university_repository_1.UniversityRepository)),
    __param(1, repository_1.repository(professor_repository_1.ProfessorRepository)),
    __metadata("design:paramtypes", [university_repository_1.UniversityRepository,
        professor_repository_1.ProfessorRepository])
], ProfessorController);
exports.ProfessorController = ProfessorController;
//# sourceMappingURL=professor.controller.js.map