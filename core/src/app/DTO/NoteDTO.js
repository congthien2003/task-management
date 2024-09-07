class NoteDTO {
	constructor(note) {
		this.id = note._id;
		this.name = note.name;
		this.description = note.description;
		this.createdBy = task.createdBy
			? {
					id: task.createdBy._id,
					username: task.createdBy.username,
					email: task.createdBy.email,
			  }
			: null;
		this.projectId = task.projectId ? task.projectId._id : null;
	}
}

export default NoteDTO;
