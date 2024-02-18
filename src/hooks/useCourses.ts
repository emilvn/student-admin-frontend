import {useEffect, useState} from "react";
import {Course, Teacher} from "../types/entities.ts";
import toast from "react-hot-toast";
import CourseApi from "../utils/api/CourseApi.ts";

function useCourses() {
	const [courses, setCourses] = useState<Course[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const api = new CourseApi("/courses");

	const load = () => {
		setIsLoading(true);
		api.get().then(s => {
			if (s !== null) setCourses(s);
		})
			.then(() => setIsLoading(false))
			.catch((e: unknown) => {
				toast.error("Unexpected error. Failed to fetch courses");
				console.error(e);
				setIsLoading(false);
			});

	};
	useEffect(() => {
		load();
	}, []);

	const getById = async (id: number) => {
		try {
			let course: Course | null | undefined = courses.find((s) => s.id === id);
			if (course) {
				return course;
			}
			course = await api.getById(id);
			if (!course) {
				toast.error("Course not found");
				return null;
			}
			return course;
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message);
			}
			toast.error("Unexpected error. Course not found");
			return null;
		}
	};

	const create = async (course: Partial<Course>) => {
		try {
			const newCourse = await api.post(course);
			if (!newCourse) {
				toast.error("Failed to create course");
				return null;
			}
			setCourses([...courses, newCourse]);
			toast.success("Course created");
		} catch (e: unknown) {
			toast.error("Unexpected error. Failed to create course");
			console.error(e);
		}
	};

	const update = async (course: Partial<Course>, id: number) => {
		try {
			const updatedCourse = await api.patch(id, course);
			if (!updatedCourse) {
				toast.error("Failed to update course");
				return null;
			}
			const index = courses.findIndex((s) => s.id === updatedCourse.id);
			courses[index] = updatedCourse;
			setCourses([...courses]);
			toast.success("Course updated");
		} catch (e: unknown) {
			toast.error("Unexpected error. Failed to update course");
			console.error(e);
		}
	};

	const updateTeacher = async (courseId: number, teacher: Teacher) => {
		try {
			const updatedCourse = await api.updateTeacher(courseId, teacher);
			if (!updatedCourse) {
				toast.error("Failed to change teacher on course");
				return null;
			}
			const index = courses.findIndex((s) => s.id === updatedCourse.id);
			courses[index] = updatedCourse;
			setCourses([...courses]);
			toast.success("Course teacher changed");
		} catch (e: unknown) {
			toast.error("Unexpected error. Failed to change teacher on course");
			console.error(e);
		}
	};

	const addStudent = async (courseId: number, studentId: number) => {
		try {
			const updatedCourse = await api.addStudent(courseId, studentId);
			if (!updatedCourse) {
				toast.error("Failed to add student to course");
				return null;
			}
			const index = courses.findIndex((s) => s.id === updatedCourse.id);
			courses[index] = updatedCourse;
			setCourses([...courses]);
			toast.success("Student added to course");
		} catch (e: unknown) {
			toast.error("Unexpected error. Failed to add student to course");
			console.error(e);
		}
	}

	const destroy = async (id: number) => {
		try {
			const deletedStudent = await api.delete(id);
			if (!deletedStudent) {
				toast.error("Failed to delete course");
				return null;
			}
			const index = courses.findIndex((s) => s.id === id);
			courses.splice(index, 1);
			setCourses([...courses]);
			toast.success("Course deleted");
		} catch (e: unknown) {
			toast.error("Unexpected error. Failed to delete course");
			console.error(e);
		}
	}

	const removeTeacher = async (courseId: number) => {
		try {
			const removedTeacher = await api.removeTeacher(courseId);
			if (!removedTeacher) {
				toast.error("Failed to remove teacher from course");
				return null;
			}
			const index = courses.findIndex((c) => c.id === courseId);
			courses[index].teacher = null;
			setCourses([...courses]);
			toast.success("Teacher removed from course");
		} catch (e: unknown) {
			toast.error("Unexpected error. Failed to remove teacher from course");
			console.error(e);
		}
	};
	
	const removeStudent = async (courseId: number, studentId: number) => {
		try {
			const removedStudent = await api.removeStudent(courseId, studentId);
			if (!removedStudent) {
				toast.error("Failed to remove student from course");
				return null;
			}
			const index = courses.findIndex((c) => c.id === courseId);
			courses[index].students = courses[index].students.filter((s) => s.id !== studentId);
			setCourses([...courses]);
			toast.success("Student removed from course");
		} catch (e: unknown) {
			toast.error("Unexpected error. Failed to remove student from course");
			console.error(e);
		}
	};

	return {
		courses,
		isLoading,
		getById,
		create,
		update,
		updateTeacher,
		addStudent,
		destroy,
		removeTeacher,
		removeStudent
	};
}

export default useCourses;