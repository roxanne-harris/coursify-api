import { StudentRepository } from "../repositories/student.repository";
import { Student } from "../models/student.model";
export declare class StudentController {
    protected studentRepo: StudentRepository;
    constructor(studentRepo: StudentRepository);
    verifyToken(jwt: string): string | object;
    loginStudent(student: Student): Promise<{
        token: string;
    }>;
    registerStudent(student: Student): Promise<Student>;
}
