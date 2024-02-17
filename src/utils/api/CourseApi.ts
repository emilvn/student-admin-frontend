import Api from "./Api.ts";
import type {Course, Student, Teacher} from "../../types/entities.ts";

class CourseApi extends Api<Course> {

	constructor(path : string) {
		super(path);
	}

	public getTeacher: (id: number) => Promise<Teacher> = async (id: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher");
		if(!response.ok){
			throw new Error(response.statusText);
		}
		if(response.status === 204){
			return null;
		}
		return await response.json();
	};

	public getStudents: (id: number) => Promise<Student[]> = async (id: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/students");
		if(!response.ok){
			throw new Error(response.statusText);
		}
		if(response.status === 204){
			return [];
		}
		return await response.json();
	};

	public addStudent: (id: number, studentId: number) => Promise<Course> = async (id: number, studentId: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/students/" + studentId, {
			method: "PUT"
		});
		if(!response.ok){
			throw new Error(response.statusText);
		}
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
		if(!response.ok){
			throw new Error(response.statusText);
		}
		return await response.json();
	};

	public removeStudent: (id: number, studentId: number) => Promise<Student> = async (id: number, studentId: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/students/" + studentId, {
			method: "DELETE"
		});
		if(!response.ok){
			throw new Error(response.statusText);
		}
		return await response.json();
	}

	public removeTeacher: (id: number) => Promise<Course> = async (id: number) => {
		const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher", {
			method: "DELETE"
		});
		if(!response.ok){
			throw new Error(response.statusText);
		}
		return await response.json();
	}

}

export default CourseApi;