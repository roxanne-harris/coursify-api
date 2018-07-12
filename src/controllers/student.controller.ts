import { repository } from "@loopback/repository";
//import { StudentRepository } from "../repositories/course.repository";
import { post, requestBody, HttpErrors, get, param } from "@loopback/rest";
import { StudentRepository } from "../repositories/student.repository";
import { Student } from "../models/student.model";
import { sign, verify } from "jsonwebtoken";

export class StudentController {
    constructor(
        @repository(StudentRepository) protected studentRepo: StudentRepository
    ) { }

    @get('/verify')
    verifyToken(
        @param.query.string("jwt") jwt: string
    ) {
        try {
            let payload = verify(jwt, "shh");
            return payload;
        } catch (err) {
            throw new HttpErrors.Unauthorized("Invalid token");
        }

        // The user is authenticated and we can process...
    }

    @post('/login_')
    async loginStudent(
        @requestBody() student: Student
    ) {

        // Check that email and password are both supplied
        if (!student.email || !student.password) {
            throw new HttpErrors.Unauthorized('invalid credentials');
        }

        // Check that email and password are valid
        let studentExists: boolean = !!(await this.studentRepo.count({
            and: [
                { email: student.email },
                { password: student.password }
            ],
        }));

        if (!studentExists) {
            throw new HttpErrors.Unauthorized('invalid credentials');
        }

        let foundStudent = await this.studentRepo.findOne({
            where: {
                and: [
                    { email: student.email },
                    { password: student.password }
                ],
            },
        }) as Student;

        let jwt = sign({
            student: {
                student_id: foundStudent.student_id,
                email: foundStudent.email
                }
            },
            "shh",
            {
                issuer: "auth.ix.com",
                audience: "ix.com"
            });

        sign({
            student: student
        }, 'shh', {
                issuer: 'auth.ix.co.za',
                audience: 'ix.co.za'
            });

        return {
            token: jwt
        };

    }



    @post('/register')
    async registerStudent(
        @requestBody() student: Student
    ): Promise<Student> {


        // let studentToCreate = new Student();
        // studentToCreate.first_name = student.first_name;
        // etc...


        // Check that email and password are both supplied
        if (!student.email || !student.password) {
            throw new HttpErrors.Unauthorized('invalid credentials');
        }

        // Check that email and password are valid
        let studentExists: boolean = !!(await this.studentRepo.count({
            and: [
                { email: student.email },
                { password: student.password }
            ],
        }));

        if (studentExists) {
            throw new HttpErrors.Unauthorized('user already exists');
        }

        return await this.studentRepo.create(student);
    }




}