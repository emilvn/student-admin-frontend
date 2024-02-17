import {useEffect, useState} from "react";
import {Student, Teacher} from "../types/entities.ts";
import Api from "../utils/api/Api.ts";
import toast from "react-hot-toast";

function usePeople<T extends Student | Teacher>(personType:"student" | "teacher") {
	const [people, setPeople] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const api = new Api<T>("/" + personType + "s");

	const load = () => {
		setIsLoading(true);
		api.get().then(s => {
			if(s !== null) setPeople(s);
		})
			.then(() => setIsLoading(false))
			.catch((e: unknown) => {
				toast.error("Unexpected error. Failed to fetch " + personType + "s");
				console.error(e);
				setIsLoading(false);
			});

	};
	useEffect(() => {
		load();
	}, []);

	const getById = async (id: number) => {
		try {
			let person = people.find((s) => s.id === id);
			if (person) {
				return person;
			}
			person = await api.getById(id);
			if(!person){
				toast.error(personType + " not found");
				return null;
			}
			return person;
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message);
			}
			toast.error("Unexpected error. " + personType + " not found");
			return null;
		}
	};

	const create = async (person: T) => {
		try {
			const newPerson = await api.post(person);
			if(!newPerson){
				toast.error("Failed to create " + personType);
				return;
			}
			setPeople([...people, newPerson]);
			toast.success(personType + " created");
		} catch (e : unknown) {
			toast.error("Unexpected error. Failed to create " + personType);
			console.error(e);
		}
	};

	const update = async (person: T, id: number) => {
		try {
			const updatedStudent = await api.patch(id, person);
			if(!updatedStudent){
				toast.error("Failed to update " + personType);
				return;
			}
			const index = people.findIndex((s) => s.id === updatedStudent.id);
			people[index] = updatedStudent;
			setPeople([...people]);
			toast.success(personType + " updated");
		} catch (e : unknown) {
			toast.error("Unexpected error. Failed to update " + personType);
			console.error(e);
		}
	};

	const destroy = async (id: number) => {
		try {
			const deletedStudent = await api.delete(id);
			if(!deletedStudent){
				toast.error("Failed to delete " + personType);
				return;
			}
			const index = people.findIndex((s) => s.id === id);
			people.splice(index, 1);
			setPeople([...people]);
			toast.success(personType + " deleted");
		} catch (e : unknown) {
			toast.error("Unexpected error. Failed to delete " + personType);
			console.error(e);
		}
	}

	return {people, isLoading, getById, create, update, destroy};
}

export default usePeople;