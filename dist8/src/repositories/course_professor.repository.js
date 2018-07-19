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
const course_professor_model_1 = require("../models/course_professor.model");
const core_1 = require("@loopback/core");
const loopback_datasource_juggler_1 = require("loopback-datasource-juggler");
let Course_ProfessorRepository = class Course_ProfessorRepository extends repository_1.DefaultCrudRepository {
    constructor(datasource) {
        super(course_professor_model_1.Course_Professor, datasource);
        this.datasource = datasource;
    }
};
Course_ProfessorRepository = __decorate([
    __param(0, core_1.inject('datasources.db')),
    __metadata("design:paramtypes", [loopback_datasource_juggler_1.DataSource])
], Course_ProfessorRepository);
exports.Course_ProfessorRepository = Course_ProfessorRepository;
//# sourceMappingURL=course_professor.repository.js.map