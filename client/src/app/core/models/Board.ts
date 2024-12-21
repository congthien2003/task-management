import { List } from "./List";

export interface Board {
	_id: string;
	name: string;
	owner: string;
	description: string;
	quantity: number;
	status: number;
	list: List[];
	members: string[];
}
