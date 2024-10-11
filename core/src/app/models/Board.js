import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
const Schema = mongoose.Schema;

const Board = new Schema({
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
	lists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Lists",
		},
	],
});

Board.plugin(mongooseDelete);
Board.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

export default mongoose.model("Boards", Board);
