import Result from "../common/Result.js";
import noteRepository from "../repositories/noteRepository.js";
const getAll = async function (req, res) {
  try {
    const notes = await noteRepository.getAll();
    res.status(200).json(
      new Result(
        {
          list: notes
        },
        "GET All",
        true
      )
    );
  } catch (exception) {
    res.status(400).json(new Result(null, exception.message, false));
  }
};
const getAllByIdBoard = async function (req, res) {
  try {
    const notes = await noteRepository.getAllByIdBoard(req.params?.idBoard);
    res.status(200).json({
      message: "GET by ID Board",
      data: {
        list: notes
      }
    });
  } catch (exception) {
    res.status(400).json({
      message: "Error",
      data: {}
    });
  }
};
const getAllByIdUser = async function (req, res) {
  try {
    const notes = await noteRepository.getAllByIdUser(req.params?.idUser);
    res.status(200).json({
      message: "GET by ID Note",
      data: {
        list: notes
      }
    });
  } catch (exception) {
    res.status(400).json({
      message: "Error",
      data: {}
    });
  }
};

const getById = async function (req, res) {
  try {
    const existsNote = await noteRepository.getById(req.params?.id);
    if (existsNote != null) {
      res.status(200).json({
        message: "success",
        data: {
          list: existsNote
        }
      });
    } else {
      res.status(400).json({
        message: "Not found",
        data: {}
      });
    }
  } catch (exception) {
    res.status(400).json({
      message: "Error",
      data: {}
    });
  }
};

const create = function (req, res) {
  console.log(req.body);

  const newNote = noteRepository.create(req.body);

  if (newNote != null) {
    res.status(200).json({
      message: "create",
      data: {
        list: newNote
      }
    });
  } else {
    res.status(400).json({
      message: "error",
      data: {}
    });
  }
};
// update status
const updateStatus = async function (req, res) {
  try {
    const { id } = req.params; // Lấy id của ghi chú từ URL
    const { isPinned } = req.body; // Lấy giá trị isPinned từ body của yêu cầu

    if (typeof isPinned !== "boolean") {
      return res
        .status(400)
        .json(new Result(null, "Invalid isPinned value", false));
    }

    const updatedNote = await noteRepository.updateStatus(id, isPinned); // Gọi hàm updateStatus từ repository

    if (updatedNote) {
      return res
        .status(200)
        .json(
          new Result(
            { note: updatedNote },
            `Note status updated to ${isPinned ? "pinned" : "unpinned"}`,
            true
          )
        );
    } else {
      return res.status(404).json(new Result(null, "Note not found", false));
    }
  } catch (exception) {
    console.error("Error in updateStatus:", exception);
    return res
      .status(500)
      .json(new Result(null, "Internal server error", false));
  }
};

const updateById = async function (req, res) {
  const update = await noteRepository.updateById(
    req.params.id.trim(),
    req.body
  );

  if (update !== null) {
    res.status(200).json({
      message: "Update successful",
      data: {
        list: update
      }
    });
    // Lỗi chỗ name kìa
  } else {
    res.status(400).json({
      message: "Update failed",
      data: {}
    });
  }
};

const deleteById = async function (req, res) {
  const deleteSuccess = await noteRepository.deleteById(req.params?.id);
  if (deleteSuccess.deletedCount > 0) {
    res.status(200).json({
      message: "Delete successful",
      data: {}
    });
  } else {
    res.status(400).json({
      message: "Delete failed"
    });
  }
};

export default {
  getById,
  getAllByIdBoard,
  getAllByIdUser,
  getAll,
  create,
  updateStatus,
  updateById,
  deleteById
};
