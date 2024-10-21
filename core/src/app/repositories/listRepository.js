import List from "../models/List.js";
// Lấy tất cả list có id trùng với id truyền vào
const getById = async function (id) {
	try {
		const existsList = await List.findOne({ _id: id });
		return existsList;
	} catch (exception) {
		console.log(exception);

		return null;
	}
};
// Lấy tất cả list có idBoard trùng với id Board truyền vào
const getAllByIdBoard = async function (idBoard) {
	try {
		
		const lists = await List.find({
			boardId: idBoard,
		});
		return lists;
	} catch (exception) {
		console.log("Error get all List by Board", exception.message);
		return null;
	}
};
// Lấy tất cả List trong database
const getAll = async function () {
	try {
		const listBoard = await List.find({});
		return listBoard;
	} catch (exception) {
		return null;
	}
};

// Tạo List trong database
const create = function ({ name, description, color, userId, boardId }) {
	try {
		const newList = new List({
			name,
			description,
			color,
            
			createdBy: userId,
            boardId

		});
		newList.save();
		return newList;
	} catch (exception) {
		return null;
	}
};
// Cập nhật list theo id
const updateById = async function (id, { name, description, color, userId, boardId }) {
	try {
		

		const update = await List.updateOne(
			{ _id: id },
			{ name, description, color, userId, boardId}
		);
		if (update.matchedCount === 0) {
			console.log("No List found with the provided ID.");
			return null;
		}
		const updateList = await List.findById({
			_id: id,
		});

		return updateList;
	} catch (exception) {
		console.error("Error updating List:", exception);
		return null;
	}
};

const deleteById = async function (id) {
	try {
		const result = await List.deleteOne({
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
    getAllByIdBoard,
	create,
	updateById,
	deleteById,
};