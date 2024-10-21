import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
const Schema = mongoose.Schema;

const Task = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	status: {
		type: String,
		enum: ["Pending", "In Progress", "Completed"],
		default: "Pending",
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
<<<<<<< .mine
	createAt: { type: Date, default: Date.now },
	updateAt: { type: Date, default: Date.now },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",




=======
	assignBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Users",
		},
	],
	boardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Boards",
>>>>>>> .theirs
		required: true,
	},
	permited: [
		{
			email: { type: String}
		},
	],
	listId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Lists",
		required: true,
	},
	
});

Task.plugin(mongooseDelete);
Task.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

export default mongoose.model("Tasks", Task);
