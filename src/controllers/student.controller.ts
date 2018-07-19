import { repository } from "@loopback/repository";
//import { StudentRepository } from "../repositories/course.repository";
import { post, requestBody, HttpErrors, get, param } from "@loopback/rest";
import { StudentRepository } from "../repositories/student.repository";
import { Student } from "../models/student.model";
import { sign, verify } from "jsonwebtoken";
import * as bcrypt from 'bcrypt';


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
        // let studentExists: boolean = !!(await this.studentRepo.count({
        //     and: [
        //         { email: student.email },
        //         { password: student.password }
        //     ],
        // }));

        let studentExists: boolean = !!(await this.studentRepo.count(
            { email: student.email }
        ));

        if (!studentExists) {
            throw new HttpErrors.Unauthorized('invalid credentials');
        }

        let foundStudent = await this.studentRepo.findOne({
            where: {
                email: student.email
            },
        }) as Student;

        if (!await bcrypt.compare(student.password, foundStudent.password)) {
            throw new HttpErrors.Unauthorized("Sorry... ");
        }


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

        //student.password = await bcrypt.hash(student.password, 10);



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

        student.password = await bcrypt.hash(student.password, 10);
        student.paid = false;

        return await this.studentRepo.create(student);
    }

    @post('/payment')
    async paymentStudent(
        @requestBody() student: Student,
        @param.query.string("token") token: any
    ) {

        if (student.paid) {
            throw new HttpErrors.Unauthorized("Student has already paid");
        }

        console.log(student);

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

        } catch (error) {


            return false;
        }

    }
}