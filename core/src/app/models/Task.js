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
	createAt: { type: Date, default: Date.now },
	updateAt: { type: Date, default: Date.now },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true,
	},
	assignBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
	},
	boardId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Boards",
		required: true,
	},
	attachments: [
		{
			fileName: { type: String, required: true },
			fileUrl: { type: String, required: true }, // Store file URL or path
			fileType: { type: String }, // e.g., .txt, .docx, etc.
		},
	],
});

Task.plugin(mongooseDelete);
Task.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

export default mongoose.model("Tasks", Task);
