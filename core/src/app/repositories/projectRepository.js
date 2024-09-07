import Project from "../models/Project.js";

const getById = async function (id) {
	try {
		const existsProject = await Project.findOne({ _id: id });
		return existsProject;
	} catch (exception) {
		console.log(exception);

		return null;
	}
};

const getAllByIdUser = async function (idUser) {
	try {
		// const ownerId = mongoose.Types.ObjectId(idUser);
		const listProject = await Project.find({
			owner: idUser,
		});
		return listProject;
	} catch (exception) {
		console.log("Error get all by idUSer", exception.message);
		return null;
	}
};

const getCoopProjectByIdUser = async function (idUser) {
	try {
		// const ownerId = mongoose.Types.ObjectId(idUser);
		const listProject = await Project.find({
			members: { $in: [idUser] },
		});
		return listProject;
	} catch (exception) {
		console.log("Error get all by idUSer", exception.message);
		return null;
	}
};

const getAll = async function () {
	try {
		const listProject = await Project.find({});
		return listProject;
	} catch (exception) {
		return null;
	}
};

const create = function ({ name, description, quantity, ownerId }) {
	try {
		const newProject = new Project({
			name,
			description,
			quantity,
			owner: ownerId,
		});
		newProject.save();
		return newProject;
	} catch (exception) {
		return null;
	}
};

const addMembers = async function (id, members) {
	try {
		const update = await Project.updateOne(
			{ _id: id },
			{
				members,
				quantity: members.length + 1,
			}
		);
		const project = await Project.findById({
			_id: id,
		});

		return project;
	} catch (exception) {
		console.log(exception.message);
		return null;
	}
};

const removeMembers = async function (id, members) {
	try {
		const update = await Project.updateOne(
			{ _id: id },
			{
				$pullAll: {
					members: members,
				},
			}
		).exec();
		const project = await Project.findById({
			_id: id,
		});
		return project;
	} catch (exception) {
		console.log(exception.message);
		return null;
	}
};

const updateById = async function (id, { name, description, quantity }) {
	try {
		console.log({ name, description, quantity });
		console.log(id);

		const update = await Project.updateOne(
			{ _id: id },
			{ name, description, quantity }
		);

		const project = await Project.findById({
			_id: id,
		});

		return project;
	} catch (exception) {
		return null;
	}
};

const deleteById = async function (id) {
	try {
		const result = await Project.deleteOne({
			_id: id,
		});
		console.log(result);
		return result;
	} catch (exception) {
		console.log(exception.message);
		return false;
	}
};

export default {
	getAll,
	getById,
	getAllByIdUser,
	getCoopProjectByIdUser,
	addMembers,
	removeMembers,
	create,
	updateById,
	deleteById,
};
