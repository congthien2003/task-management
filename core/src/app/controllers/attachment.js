import attachmentRepository from "../repositories/attachmentRepository.js";
import Result from "../common/Result.js";
import { getFilename } from "../../util/getFilename.js"
import { promises as fsProm } from 'fs'; 

const getAll = async function (req, res) {
	try {
		const attachments = await attachmentRepository.getAll();
		res.status(200).json(
			new Result(
				{
					list: attachments,
				},
				"GET All",
				true
			)
		);
	} catch (exception) {
		res.status(400).json(new Result(null, exception.message, false));
	}
};

const getAllByIdTask = async function (req, res) {
	try {
		const attachments = await attachmentRepository.getAllByIdTask(
			req.params?.idTask
		);
		res.status(200).json({
			message: "GET by ID Task",
			data: {
				list: attachments,
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
		const existsAttachment = await attachmentRepository.getById(req.params?.id);
		if (existsAttachment != null) {
			res.status(200).json({
				message: "success",
				data: {
					list: existsAttachment,
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


const create = async function (req, res) {
	
	
	// Kiểm tra kiểu file hợp lệ
	const validFileTypes = [
		"image/jpeg", 
		"image/png", 
		"text/plain", 
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	];
	if (!validFileTypes.includes(req.headers["content-type"])) {
		return res.status(400).json({
			status: "error",
			message: "Invalid file"
		});
	}
	const fileName = getFilename(req.header("Content-type")),
		filePath = "D:/OneDrive/Hutech/subjectNew/PTNN/task-management/core/src/assets/files/" + fileName,
		path = "/static/" + fileName;
	
	const newAttachment = await attachmentRepository.create(req.params.id.trim(), fileName, path);

	if (newAttachment != null) {
		try{
			// Ghi file lên đĩa
			await fsProm.writeFile(filePath, req.body);
		}catch(error){
			return res.status(500).json({
				status: "error",
				message: "Error writing file to disk",
				error,
			});
		}
		res.status(200).json({
			message: "create",
			data: {
				list: newAttachment,
			},
		});
	} else {
		res.status(400).json({
			message: "error",
			data: {},
		});
	}
};
const deleteById = async function (req, res) {
	const deleteSuccess = await attachmentRepository.deleteById(req.params?.id);
	if (deleteSuccess.deletedCount > 0) {
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
	
	create,
	getAll,
	getAllByIdTask,
	getById,
	deleteById
};