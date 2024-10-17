import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
const Schema = mongoose.Schema;

const Student = new Schema({
	name: { type: String, require: true },
	avartar: { type: String },
	age: { type: Number },
	
});

Student.plugin(mongooseDelete);
Student.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

export default mongoose.model("Students", Student);
