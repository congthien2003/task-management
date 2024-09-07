export interface Project {
	status: boolean;
	_id: string;
	name: string;
	description: string;
	quantity: number;
	owner: string;
	members: string[]; // Assuming members are an array of user IDs (strings)
	tasks: string[]; // Assuming tasks are an array of task IDs (strings)
	deleted: boolean;
	createAt: Date;
	updateAt: Date;
}
