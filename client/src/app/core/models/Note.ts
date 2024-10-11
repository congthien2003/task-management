export interface Note {
	name: { type: String; require: true };
	description: { type: String };
	type: {
		type: String;
		default: "Normal";
	};
	createdAt: { type: Date };
	updatedAt: { type: Date };
	createdBy: {
		type: string;
	};
	_idProject: {
		type: string;
	};
}
