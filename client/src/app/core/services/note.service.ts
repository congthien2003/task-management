import { Injectable } from "@angular/core";
import { MasterService } from "./master.service";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { Note } from "../models/Note";

@Injectable({
	providedIn: "root",
})
export class NoteService {
	// Định nghĩa các endpoint tương ứng với các route của Note API
	endpoint = {
		getAll: "notes", // GET /
		getByIdUser: "notes", // GET /:idUser
		getByIdBoard: "notes/b", // GET /b/:idBoard
		getById: "notes", // GET /:id
		updateById: "notes", // PUT /:id
		deleteById: "notes/delete", // DELETE /delete/:id
		create: "notes", // POST /
		updateStatus: "notes/updateStatus", // PUT /updateStatus/:id
	};

	constructor(private master: MasterService) {}

	// Lấy tất cả các notes
	getAll(): Observable<ApiResponse> {
		return this.master.get(this.endpoint.getAll);
	}

	// Lấy tất cả các notes theo user ID
	getAllByIdUser(userId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getByIdUser}/${userId}`);
	}

	// Lấy tất cả các notes theo board ID
	getAllByIdBoard(boardId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getByIdBoard}/${boardId}`);
	}

	// Lấy note theo ID
	getById(noteId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getById}/${noteId}`);
	}

	// Cập nhật note theo ID
	updateById(noteId: string, note: Note): Observable<ApiResponse> {
		return this.master.put(`${this.endpoint.updateById}/${noteId}`, note);
	}

	// Cập nhật status của note
	updateStatus(noteId: string): Observable<ApiResponse> {
		return this.master.put(`${this.endpoint.updateStatus}/${noteId}`, {});
	}

	// Xóa note theo ID
	deleteById(noteId: string): Observable<ApiResponse> {
		return this.master.delete(`${this.endpoint.deleteById}/${noteId}`);
	}

	// Tạo mới một note
	create(note: any): Observable<ApiResponse> {
		return this.master.post(this.endpoint.create, note);
	}
}
