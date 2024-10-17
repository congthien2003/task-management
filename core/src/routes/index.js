import userRouter from "./users.js";
import authRouter from "./auth.js";
import boardRouter from "./board.js";
import studentRouter from "./student.js";
// import siteRouter from "./site.js";

function route(app) {
	app.use("/api/auth", authRouter);
	app.use("/api/users", userRouter);
	app.use("/api/board", boardRouter);
	app.use("/api/student", studentRouter);
	// app.use("/", siteRouter);
}

export default route;
