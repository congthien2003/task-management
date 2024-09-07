class ProjectDTO {
	constructor(project) {
		this.id = project._id;
		this.name = project.name;
		this.description = project.description;
		this.quantity = project.quantity;
		this.status = project.status;
		this.owner = project.owner
			? {
					id: project.owner._id,
					username: project.owner.username,
					email: project.owner.email,
			  }
			: null;
		this.members = project.members
			? project.members.map((member) => ({
					id: member._id,
					username: member.username,
					email: member.email,
			  }))
			: [];
		this.tasks = project.tasks
			? project.tasks.map((task) => ({
					id: task._id,
					name: task.name,
					status: task.status,
			  }))
			: [];
	}
}

export default ProjectDTO;
