import userRepository from "../repositories/userRepository.js";
import Result from "../common/Result.js";
const getById = async function (req, res) {
	const id = req?.params?.id ?? "";
	if (id != "") {
		const userExists = await userRepository.getById(id);

		if (userExists) {
			res.status(200).json(
				new Result({ user: userExists }, "success", true)
			);
		} else {
			res.status(400).json(new Result(null, "Not found", false));
		}
	} else {
		res.status(400).json(new Result(null, "Not have id", false));
	}
};

const getByEmail = async function (req, res) {
	const email = req.query?.email ?? "";

	if (email === "") {
		return res.status(400).json({
			message: `Not email to find !`,
			data: {},
		});
	} else {
		const userExists = await userRepository.getByEmail(email);
		if (userExists) {
			res.status(200).json(new Result(userExists, "success", true));
		} else {
			res.status(400).json(new Result("Not found", false));
		}
	}
};

const getAll = async function (req, res) {
	const userExists = await userRepository.getAll();
	res.status(200).json({
		message: `Get all success !`,
		data: {
			users: userExists,
		},
	});
};

import { GoogleGenerativeAI } from "@google/generative-ai";

const testGemini = async function (req, res) {
	const genAI = new GoogleGenerativeAI(
		"AIzaSyDcL4IDc0V_qQMpEQNY4u8FZBewbA2pnsE"
	);
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const prompt = req.body.message;

	const result = await model.generateContent(prompt);
	console.log(result.response.text());
	res.json(result.response.text());
};

export default {
	getById,
	getAll,
	getByEmail,
	testGemini,
};
