import {useEffect, useState} from "react";
import {Student} from "../types/entities.ts";
import Api from "../utils/api/Api.ts";
import toast from "react-hot-toast";

function useStudents() {
	const [students, setStudents] = useState<Student[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const api = new Api<Student>("/students");

	const load = () => {
		setIsLoading(true);
		api.get().then(s => {
			if(s !== null) setStudents(s);
		})
			.then(() => setIsLoading(false))
			.catch((e: unknown) => {
				toast.error("Unexpected error. Failed to update student");
				console.error(e);
				setIsLoading(false);
			});

	};
	useEffect(() => {
		load();
	}, []);

	const getById = async (id: number) => {
		try {
			let student = students.find((s) => s.id === id);
			if (student) {
				return student;
			}
			student = await api.getById(id);
			if(!student){
				toast.error("Student not found");
				return null;
			}
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message);
			}
			toast.error("Unexpected error. Student not found");
			return null;
		}
	};

	const create = async (student: Student) => {
		try {
			const newStudent = await api.post(student);
			if(!newStudent){
				toast.error("Failed to create student");
				return;
			}
			setStudents([...students, newStudent]);
			toast.success("Student created");
		} catch (e : unknown) {
			toast.error("Unexpected error. Failed to create student");
			console.error(e);
		}
	};

	const update = async (student: Student, id: number) => {
		try {
			const updatedStudent = await api.patch(id, student);
			if(!updatedStudent){
				toast.error("Failed to update student");
				return;
			}
			const index = students.findIndex((s) => s.id === updatedStudent.id);
			students[index] = updatedStudent;
			setStudents([...students]);
			toast.success("Student updated");
		} catch (e : unknown) {
			toast.error("Unexpected error. Failed to update student");
			console.error(e);
		}
	};

	const destroy = async (id: number) => {
		try {
			const deletedStudent = await api.delete(id);
			if(!deletedStudent){
				toast.error("Failed to delete student");
				return;
			}
			const index = students.findIndex((s) => s.id === id);
			students.splice(index, 1);
			setStudents([...students]);
			toast.success("Student deleted");
		} catch (e : unknown) {
			toast.error("Unexpected error. Failed to delete student");
			console.error(e);
		}
	}

	return {students, isLoading, getById, create, update, destroy};
}

export default useStudents;