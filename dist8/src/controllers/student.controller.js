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
//import { StudentRepository } from "../repositories/course.repository";
const rest_1 = require("@loopback/rest");
const student_repository_1 = require("../repositories/student.repository");
const student_model_1 = require("../models/student.model");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let StudentController = class StudentController {
    constructor(studentRepo) {
        this.studentRepo = studentRepo;
    }
    verifyToken(jwt) {
        try {
            let payload = jsonwebtoken_1.verify(jwt, "shh");
            return payload;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        // The user is authenticated and we can process...
    }
    async loginStudent(student) {
        // Check that email and password are both supplied
        if (!student.email || !student.password) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // Check that email and password are valid
        // let studentExists: boolean = !!(await this.studentRepo.count({
        //     and: [
        //         { email: student.email },
        //         { password: student.password }
        //     ],
        // }));
        let studentExists = !!(await this.studentRepo.count({ email: student.email }));
        if (!studentExists) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        let foundStudent = await this.studentRepo.findOne({
            where: {
                email: student.email
            },
        });
        if (!await bcrypt.compare(student.password, foundStudent.password)) {
            throw new rest_1.HttpErrors.Unauthorized("Sorry... ");
        }
        let jwt = jsonwebtoken_1.sign({
            student: {
                student_id: foundStudent.student_id,
                email: foundStudent.email
            }
        }, "shh", {
            issuer: "auth.ix.com",
            audience: "ix.com"
        });
        jsonwebtoken_1.sign({
            student: student
        }, 'shh', {
            issuer: 'auth.ix.co.za',
            audience: 'ix.co.za'
        });
        return {
            token: jwt
        };
    }
    async registerStudent(student) {
        // let studentToCreate = new Student();
        // studentToCreate.first_name = student.first_name;
        // etc...
        //student.password = await bcrypt.hash(student.password, 10);
        // Check that email and password are both supplied
        if (!student.email || !student.password) {
            throw new rest_1.HttpErrors.Unauthorized('invalid credentials');
        }
        // Check that email and password are valid
        let studentExists = !!(await this.studentRepo.count({
            and: [
                { email: student.email },
                { password: student.password }
            ],
        }));
        if (studentExists) {
            throw new rest_1.HttpErrors.Unauthorized('user already exists');
        }
        student.password = await bcrypt.hash(student.password, 10);
        student.paid = false;
        return await this.studentRepo.create(student);
    }
    async paymentStudent(student, token) {
        if (student.paid) {
            throw new rest_1.HttpErrors.Unauthorized("Student has already paid");
        }
        console.log(student.paid);
        var stripe = require("stripe")("sk_test_AzW34RUY6PjZkg8u2JXwSfnJ");
        try {
            const charge = stripe.charges.create({
                amount: 50000,
                currency: 'usd',
                source: token,
                receipt_email: student.email,
            });
            student.paid = true;
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
__decorate([
    rest_1.get('/verify'),
    __param(0, rest_1.param.query.string("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "verifyToken", null);
__decorate([
    rest_1.post('/login_'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_model_1.Student]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "loginStudent", null);
__decorate([
    rest_1.post('/register'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_model_1.Student]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "registerStudent", null);
__decorate([
    rest_1.post('/payment'),
    __param(0, rest_1.requestBody()),
    __param(1, rest_1.param.query.string("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [student_model_1.Student, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "paymentStudent", null);
StudentController = __decorate([
    __param(0, repository_1.repository(student_repository_1.StudentRepository)),
    __metadata("design:paramtypes", [student_repository_1.StudentRepository])
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map