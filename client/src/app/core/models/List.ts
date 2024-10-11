import { Task } from "./Task";

export interface List {
	_id: string;
	name: string;
	deleted: boolean;
	_idBoard: string;
	createdAt: Date;
	_idOwner: string;
	tasks: Task[];
}
