import mongoose from "mongoose";

const urlDeployment =
	"mongodb+srv://nhoccuthien0538:1IxBSqpbYH1ssSRr@cluster0.w9owtoc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export default async function connect() {
	try {
		await mongoose.connect("mongodb://127.0.0.1/task_management", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connect Successfully !!");
	} catch (error) {
		console.log("Connect failed !!");
	}
}
