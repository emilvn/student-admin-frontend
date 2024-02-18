import Api from "./Api.ts";
import type { Course, Student, Teacher } from "../../types/entities.ts";

class CourseApi extends Api<Course> {

    constructor(path: string) {
        super(path);
    }

    public getTeacher = async (id: number): Promise<Teacher | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher");
        if (!response.ok) {
            return null;
        }
        if (response.status === 204) {
            return null;
        }
        return await response.json();
    };

    public getStudents = async (id: number): Promise<Student[] | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id + "/students");
        if (!response.ok) {
            return null;
        }
        if (response.status === 204) {
            return [];
        }
        return await response.json();
    };

    public addStudent = async (id: number, studentId: number): Promise<Course | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id + "/students/" + studentId, {
            method: "PUT"
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };

    public updateTeacher = async (id: number, teacher: Teacher): Promise<Course | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher", {
            method: "PUT",
            body: JSON.stringify(teacher),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };

    public removeStudent = async (id: number, studentId: number): Promise<Student | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id + "/students/" + studentId, {
            method: "DELETE"
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };

    public removeTeacher = async (id: number): Promise<Teacher | null> => {
        const response = await fetch(Api.endpoint + this.path + "/" + id + "/teacher", {
            method: "DELETE"
        });
        if (!response.ok) {
            return null;
        }
        return await response.json();
    };

}

export default CourseApi;