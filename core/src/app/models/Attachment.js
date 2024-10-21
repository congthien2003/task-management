import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
// import User from "./User"
const Schema = mongoose.Schema;

const Attachment = new Schema({
	filePath: { type: String, required: true },
	fileName: { type: String, required: true},
	createAt: { type: Date, default: Date.now },
	updateAt: { type: Date, default: Date.now },
	taskId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tasks",
		required: true,
	},
	
});

Attachment.plugin(mongooseDelete);
Attachment.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

export default mongoose.model("Attachments", Attachment);
