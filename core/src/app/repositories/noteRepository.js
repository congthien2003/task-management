import Note from "../models/Note.js";
import Notes from "../models/Note.js";
const getById = async function (id) {
  try {
    const existsNotes = await Notes.findOne({ _id: id });
    return existsNotes;
  } catch (exception) {
    console.error("Error fetching note by ID:", exception);
    return null;
  }
};
// Lấy tất cả list có idBoard trùng với id Board truyền vào
const getAllByIdBoard = async function (idBoard) {
  try {
    const notes = await Note.find({
      boardId: idBoard
    });
    return notes;
  } catch (exception) {
    console.log("Error get all Note by Board", exception.message);
    return null;
  }
};
const getAllByIdUser = async function (idUser) {
  try {
    const notes = await Notes.find({ createdBy: idUser });
    return notes;
  } catch (exception) {
    console.error("Error fetching notes by user ID:", exception);
    return [];
  }
};

const getAll = async function () {
  try {
    const notes = await Notes.find();
    return notes;
  } catch (exception) {
    console.error("Error fetching all notes:", exception);
    return [];
  }
};
// Tạo note trong database
const create = function ({
  name,
  description,
  type,
  isPinned,
  createdAt,
  updatedAt,
  userId,
  boardId
}) {
  try {
    const newNote = new Note({
      name,
      description,
      type,
      isPinned,
      createdAt,
      updatedAt,
      createdBy: userId,
      boardId
    });
    newNote.save();
    return newNote;
  } catch (exception) {
    console.log(exception);

    return null;
  }
};

// update status
const updateStatus = async function (id, isPinned) {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { isPinned },
      { new: true }
    );

    if (!updatedNote) {
      console.log("Note not found");
      return null;
    }

    return updatedNote;
  } catch (exception) {
    console.error("Error updating status:", exception);
    return null;
  }
};
const updateById = async function (
  id,
  { name, description, type, isPinned, createdAt, updatedAt, userId, boardId }
) {
  try {
    const update = await Note.updateOne(
      { _id: id },
      {
        name,
        description,
        type,
        isPinned,
        createdAt,
        updatedAt,
        userId,
        boardId
      }
    );
    if (update.matchedCount === 0) {
      console.log("No Note found with the provided ID.");
      return null;
    }
    const updateNote = await Note.findById({
      _id: id
    });

    return updateNote;
  } catch (exception) {
    console.error("Error updating Notes:", exception);
    return null;
  }
};

const deleteById = async function (id) {
  try {
    const result = await Note.deleteOne({
      _id: id
    });
    console.log(result);
    return result;
  } catch (exception) {
    console.log(exception.message);
    return false;
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
