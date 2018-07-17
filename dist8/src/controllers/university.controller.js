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
const university_repository_1 = require("../repositories/university.repository");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
let UniversityController = class UniversityController {
    constructor(universityRepo) {
        this.universityRepo = universityRepo;
    }
    async getAllUniversities() {
        return await this.universityRepo.find();
    }
    async findUniversityByName(name) {
        return await this.universityRepo.findOne({
            where: {
                name: name
            }
        });
    }
};
__decorate([
    rest_1.get('/universities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "getAllUniversities", null);
__decorate([
    rest_1.get('/university'),
    __param(0, rest_1.param.query.string("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversityController.prototype, "findUniversityByName", null);
UniversityController = __decorate([
    __param(0, repository_1.repository(university_repository_1.UniversityRepository)),
    __metadata("design:paramtypes", [university_repository_1.UniversityRepository])
], UniversityController);
exports.UniversityController = UniversityController;
//# sourceMappingURL=university.controller.js.map