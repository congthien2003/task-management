import { Attachment } from "./Attachment";

export interface Task {
	_id: string;
	name: string;
	description: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
	createBy: string;
	assignBy: string;
	_idProject: string;
	Attachments: Attachment[];
}
