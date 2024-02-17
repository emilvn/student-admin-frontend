import Api from "./Api.ts";
import type {Course, Student, Teacher} from "../../types/entities.ts";

class CourseApi extends Api<Course> {

	constructor() {
		super("/courses");
	}

	public getTeacher: (id: number) => Promise<Teacher> = async (id: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher");
		return await response.json();
	};

	public getStudents: (id: number) => Promise<Student[]> = async (id: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/students");
		return await response.json();
	};

	public addStudent: (id: number, studentId: number) => Promise<Course> = async (id: number, studentId: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/students/" + studentId, {
			method: "PUT"
		});
		return await response.json();
	};

	public updateTeacher: (id: number, teacher: Teacher) => Promise<Teacher> = async (id: number, teacher: Teacher) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher", {
			method: "PUT",
			body: JSON.stringify(teacher),
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	};

	public removeStudent: (id: number, studentId: number) => Promise<Student> = async (id: number, studentId: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/students/" + studentId, {
			method: "DELETE"
		});
		return await response.json();
	}

	public removeTeacher: (id: number) => Promise<Course> = async (id: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher", {
			method: "DELETE"
		});
		return await response.json();
	}

}