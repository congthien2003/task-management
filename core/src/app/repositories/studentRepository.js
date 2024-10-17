import Student from "../models/Student.js";

const getById = async function (id) {
	try {
		const existsStudent = await Student.findOne({ _id: id });
		return existsStudent;
	} catch (exception) {
		console.log(exception);

		return null;
	}
};


const getAll = async function () {
	try {
		const listStudent = await Student.find({});
		return listStudent;
	} catch (exception) {
		return null;
	}
};

const create = function ({ name, avartar, age }) {
	try {
		const newStudent = new Student({
			name,
			avartar,
			age
			
		});
		newStudent.save();
		return newStudent;
	} catch (exception) {
		return null;
	}
};





const updateById = async function (id, { name, avartar, age }) {
	try {
		console.log({ name, avartar, age });
		console.log(id);

		const update = await Student.updateOne(
			{ _id: id },
			{ name, avartar, age }
		);

		const updateStudent = await Student.findById({
			_id: id,
		});

		return updateStudent;
	} catch (exception) {
		return null;
	}
};

const deleteById = async function (id) {
	try {
		const result = await Student.deleteOne({
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
	
	
	create,
	updateById,
	deleteById,
};
