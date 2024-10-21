export interface Note {
	_id: string;
	name: string;
	description: string;
	type: string;
	pinned: boolean;
	createdAt: Date;
	updatedAt: Date;
	createdBy: string;
	_idProject: string;
}
