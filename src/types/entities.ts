interface HogwartsPerson {
	id?: number;
	firstName?: string;
	middleName?: string;
	lastName?: string;
	age?: number;
	dateOfBirth?: string;
	house?: HogwartsHouse;
}

interface Student extends HogwartsPerson {
	prefect?: boolean;
	enrollmentYear?: number;
	graduationYear?: number;
	graduated?: boolean;
}

interface Teacher extends HogwartsPerson {
	headOfHouse?: boolean;
	employment?: EmpType;
	employmentStart?: string,
	employmentEnd?: string
}

interface Course {
	id?: number;
	subject?: string;
	teacher?: Teacher;
	students?: Student[];
	schoolYear?: number;
	current?: boolean;
}

interface HogwartsHouse{
	id: number;
	name?: string;
	founder?: string;
	colors?: string[];
}

enum EmpType {
	TENURED= "tenured",
	TEMPORARY = "temporary",
	DECEASED = "deceased",
	DISCHARGED = "discharged",
	PROBATIONARY = "probationary"
}

export type {Student, Teacher, Course, EmpType, HogwartsHouse};