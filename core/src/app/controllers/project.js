import projectRepository from "../repositories/projectRepository.js";
import Result from "../common/Result.js";
const getAll = async function (req, res) {
	try {
		const listProject = await projectRepository.getAll();
		res.status(200).json(
			new Result(
				{
					list: listProject,
				},
				"GET All",
				true
			)
		);
	} catch (exception) {
		res.status(400).json(new Result(null, exception.message, false));
	}
};

const getAllByIdUser = async function (req, res) {
	try {
		const listProject = await projectRepository.getAllByIdUser(
			req.params?.idUser
		);
		res.status(200).json({
			message: "GET by ID User",
			data: {
				list: listProject,
			},
		});
	} catch (exception) {
		res.status(400).json({
			message: "Error",
			data: {},
		});
	}
};

const getById = async function (req, res) {
	try {
		const existsProject = await projectRepository.getById(req.params?.id);
		if (existsProject != null) {
			res.status(200).json({
				message: "success",
				data: {
					project: existsProject,
				},
			});
		} else {
			res.status(400).json({
				message: "Not found",
				data: {},
			});
		}
	} catch (exception) {
		res.status(400).json({
			message: "Error",
			data: {},
		});
	}
};

const getCoopProjectByIdUser = async function (req, res) {
	try {
		const listProjects = await projectRepository.getCoopProjectByIdUser(
			req.params?.idUser
		);
		res.status(200).json({
			message: "GET Coop by ID",
			data: {
				list: listProjects,
			},
		});
	} catch (exception) {
		res.status(400).json({
			message: "Error",
			data: {},
		});
	}
};

const create = function (req, res) {
	console.log(req.body);

	const newProject = projectRepository.create(req.body);

	if (newProject != null) {
		res.status(200).json({
			message: "create",
			data: {
				project: newProject,
			},
		});
	} else {
		res.status(400).json({
			message: "error",
			data: {},
		});
	}
};

const addMembers = async function (req, res) {
	const members = req.body?.members;
	const id = req.params?.id;

	if (members == undefined) {
		return res.status(400).json({
			message: "Not have members to add",
			data: {},
		});
	}

	const project = await projectRepository.addMembers(id, members);

	if (project !== null) {
		res.status(200).json({
			message: "Add members successful",
			data: {
				project: project,
			},
		});
	} else {
		res.status(400).json({
			message: "Add failed",
			data: {},
		});
	}
};

const removeMembers = async function (req, res) {
	const members = req.body.members;
	const id = req.params.id;

	if (members == undefined) {
		return res.status(400).json({
			message: "Not have members to add",
			data: {},
		});
	}

	const project = await projectRepository.removeMembers(id, members);

	if (project !== null) {
		res.status(200).json({
			message: "Remove members successful",
			data: {
				project: project,
			},
		});
	} else {
		res.status(400).json({
			message: "Remove failed",
			data: {},
		});
	}
};

const updateById = async function (req, res) {
	const update = await projectRepository.updateById(
		req.params.id.trim(),
		req.body
	);

	if (update !== null) {
		res.status(200).json({
			message: "Update successful",
			data: {
				project: update,
			},
		});
	} else {
		res.status(400).json({
			message: "Update failed",
			data: {},
		});
	}
};

const deleteById = async function (req, res) {
	const deleteSuccess = await projectRepository.deleteById(req.params?.id);
	if (deleteSuccess) {
		res.status(200).json({
			message: "Delete successful",
			data: {},
		});
	} else {
		res.status(400).json({
			message: "Delete failed",
		});
	}
};

export default {
	getAll,
	getAllByIdUser,
	getCoopProjectByIdUser,
	addMembers,
	removeMembers,
	getById,
	create,
	updateById,
	deleteById,
};
