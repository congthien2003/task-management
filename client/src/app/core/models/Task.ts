import { Attachment } from "./Attachment";

export interface Task {
	_id: string;
	name: string;
	description: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	createBy: string;
	permitted: [
		{
			email: string;
			_id: string;
		}
	];
	listId: string;
	attachments: Attachment[];
}
