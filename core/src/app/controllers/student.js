import studentRepository from "../repositories/studentRepository.js";
import Result from "../common/Result.js";

import { getFilename } from "../../util/getFilename.js";

const getAll = async function (req, res) {
	try {
		const liststudent = await studentRepository.getAll();
		res.status(200).json(
			new Result(
				{
					list: liststudent,
				},
				"GET All",
				true
			)
		);
	} catch (exception) {
		res.status(400).json(new Result(null, exception.message, false));
	}
};



const getById = async function (req, res) {
	try {
		const existsstudent = await studentRepository.getById(req.params?.id);
		if (existsstudent != null) {
			res.status(200).json({
				message: "success",
				data: {
					student: existsstudent,
				},
			});
		} else {
			res.status(400).json({
				message: "Not found",
				data: {},
			});
		}
	} catch (exception) {
		res.status(400).json({
			message: "Error",
			data: {},
		});
	}
};

const uploadImage = async function (req, res) {
	const { base64, fileName } = req.body;

	// Extract base64 data (skip the metadata part)
	const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");

	const pathFile = "D:/Code Project/TaskManagement/core/src/assets";
	// Create a path to save the file
	const filePath = path.join(pathFile, "images", fileName);

	// Write file to the server
	fs.writeFile(filePath, base64Data, "base64", (err) => {
		if (err) {
			return res
				.status(500)
				.send({ message: "File upload failed", error: err });
		}
		res.status(200).send({
			message: "File uploaded successfully",
			path: filePath,
		});
	});
};

const create = function (req, res) {
	console.log(req.body);
    
    // validate if file type is valid. If not, return 400 Bad Request.
    if( req.headers[ "content-type" ] !== "image/jpeg" 
        && req.headers[ "content-type" ] !== "image/png" 
        ) {
        return res.status( 400 ).json({ 
        status: "error", 
        message: "Invalid file. Please upload a JPEG or PNG file only."
        });
    }

    // Set the path where the file should be saved.
    const filename = getFilename( req.header( "Content-Type" ) ),
    filepath = "../../assets/images" + '/' + filename;

    try {
    
        // write the binary data from the request body into a file.
        fsProm.writeFile( filepath, req.body );

    } catch (error) {

        // respond with a 500 Internal Server Error if something goes wrong
        return res.status( 500 ).json({ 
            status: "error", 
            message: "Error while writing the binary file to disk.", 
            error 
        });

    }
    req.body.avartar = filepath;
	const newstudent = studentRepository.create(req.body);

	if (newstudent != null) {
		res.status(200).json({
			message: "create",
			data: {
				student: newstudent,
			},
		});
	} else {
		res.status(400).json({
			message: "error",
			data: {},
		});
	}
};





const updateById = async function (req, res) {
	const update = await studentRepository.updateById(
		req.params.id.trim(),
		req.body
	);

	if (update !== null) {
		res.status(200).json({
			message: "Update successful",
			data: {
				student: update,
			},
		});
	} else {
		res.status(400).json({
			message: "Update failed",
			data: {},
		});
	}
};

const deleteById = async function (req, res) {
	const deleteSuccess = await studentRepository.deleteById(req.params?.id);
	if (deleteSuccess) {
		res.status(200).json({
			message: "Delete successful",
			data: {},
		});
	} else {
		res.status(400).json({
			message: "Delete failed",
		});
	}
};

export default {
	getAll,
	uploadImage,
	getById,
	create,
	updateById,
	deleteById,
};
