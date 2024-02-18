interface HogwartsPerson {
    id: number;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
    age: number;
    dateOfBirth: string | null;
    house: HogwartsHouse | null;
}

interface Student extends HogwartsPerson {
    prefect: boolean;
    enrollmentYear: number;
    graduationYear: number;
    graduated: boolean;
}

interface Teacher extends HogwartsPerson {
    headOfHouse: boolean;
    employment: EmpType;
    employmentStart: string | null;
    employmentEnd: string | null;
}

interface Course {
    id: number;
    subject: string | null;
    teacher: Teacher | null;
    students: Student[];
    schoolYear: number;
    current: boolean;
}

interface HogwartsHouse {
    id: number;
    name: string | null;
    founder: string | null;
    colors: string[];
}

enum EmpType {
    TENURED = "tenured",
    TEMPORARY = "temporary",
    DECEASED = "deceased",
    DISCHARGED = "discharged",
    PROBATIONARY = "probationary"
}

export type { Student, Teacher, Course, EmpType, HogwartsHouse, HogwartsPerson };