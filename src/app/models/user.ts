export interface User {
    matricule: string; 
    password: string;
    role: string;
}

export class Role {
    static student = 'STUDENT';
    static teacher = 'TEACHER';
    static admin = 'ADMIN';
}