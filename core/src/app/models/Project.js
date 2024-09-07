import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
const Schema = mongoose.Schema;

const Project = new Schema({
	name: { type: String, require: true },
	description: { type: String },
	quantity: { type: Number, default: 1 },
	status: { type: Boolean, default: 0 },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tasks",
		},
	],
});

Project.plugin(mongooseDelete);
Project.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

export default mongoose.model("Projects", Project);
