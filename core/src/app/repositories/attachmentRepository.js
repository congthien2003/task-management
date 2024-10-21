import Attachment from "../models/Attachment.js";
import Task from "../models/Task.js";

// Lấy tất cả attachment có id trùng với id truyền vào
const getById = async function (id) {
	try {
		const existsAttachment = await Attachment.findOne({ _id: id });
		return existsAttachment;
	} catch (exception) {
		console.log(exception);

		return null;
	}
};
// Lấy tất cả Attachment có idTask trùng với id Task truyền vào
const getAllByIdTask = async function (idTask) {
	try {
		
		const attachments = await Attachment.find({
			taskId: idTask,
		});
		return attachments;
	} catch (exception) {
		console.log("Error get all Attachment by Task", exception.message);
		return null;
	}
};
// Lấy tất cả Attachment trong database
const getAll = async function () {
	try {
		const listAttachment = await Attachment.find({});
		return listAttachment;
	} catch (exception) {
		return null;
	}
};

const create = async function (id, fileName, filePath) {
	try {

		const newAttachment = new Attachment({
			filePath: filePath,
			fileName: fileName,
			taskId: id
		});
		await newAttachment.save();
		
        return newAttachment;
        
	} catch (exception) {
		console.error("Error creating attachment: ", exception);
		throw exception;
	}
};
const deleteById = async function (id) {
	try {
		const result = await Attachment.deleteOne({
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
	
	create,
	getAll,
	getAllByIdTask,
	getById,
	deleteById
};