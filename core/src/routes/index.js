import userRouter from "./users.js";
import authRouter from "./auth.js";
import projectRouter from "./project.js";
// import siteRouter from "./site.js";

function route(app) {
	app.use("/auth", authRouter);
	app.use("/api/users", userRouter);
	app.use("/api/projects", projectRouter);
	// app.use("/", siteRouter);
}

export default route;
