class TaskDTO {
	constructor(task) {
		this.id = task._id;
		this.name = task.name;
		this.description = task.description;
		this.status = task.status;
		this.createdBy = task.createdBy
			? {
					id: task.createdBy._id,
					username: task.createdBy.username,
					email: task.createdBy.email,
			  }
			: null;
		this.assignBy = task.assignBy
			? {
					id: task.assignBy._id,
					username: task.assignBy.username,
					email: task.assignBy.email,
			  }
			: null;
		this.projectId = task.projectId ? task.projectId._id : null;
		this.attachments = task.attachments
			? task.attachments.map((file) => ({
					fileName: file.fileName,
					fileUrl: file.fileUrl,
					fileType: file.fileType,
			  }))
			: [];
	}
}

export default TaskDTO;
