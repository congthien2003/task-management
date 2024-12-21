import { Injectable } from "@angular/core";
import { MasterService } from "./master.service";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { Board } from "../models/Board";

@Injectable({
	providedIn: "root",
})
export class BoardService {
	endpoint = {
		getAll: "board",
		getAllByIdUser: "board/GetAll",
		getCoopboardByIdUser: "board/c",
		addMembers: "board",
		removeMembers: "board/remove-member",
		getById: "board",
	};

	constructor(private master: MasterService) {}

	// Lấy tất cả boards
	getAll(): Observable<ApiResponse> {
		return this.master.get(this.endpoint.getAll);
	}

	// Lấy tất cả boards theo user ID
	getAllByIdUser(userId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getAllByIdUser}/${userId}`);
	}

	// Lấy tất cả cooperative boards theo user ID
	getCoopboardByIdUser(userId: string): Observable<ApiResponse> {
		return this.master.get(
			`${this.endpoint.getCoopboardByIdUser}/${userId}`
		);
	}

	// Thêm thành viên vào board
	addMembers(boardId: string, memberEmail: any): Observable<ApiResponse> {
		return this.master.post(
			`${this.endpoint.addMembers}/${boardId}/add-members`,
			{ email: memberEmail }
		);
	}

	// Xóa thành viên khỏi board
	removeMembers(
		boardId: string,
		memberEmail: string
	): Observable<ApiResponse> {
		return this.master.delete(
			`${this.endpoint.removeMembers}/${boardId}/remove-member`,
			memberEmail
		);
	}

	// Lấy board theo ID
	getById(boardId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getById}/${boardId}`);
	}

	deleteById(boardId: string): Observable<ApiResponse> {
		return this.master.delete(`board/delete/${boardId}`);
	}

	create(board: Board): Observable<ApiResponse> {
		return this.master.post(`${this.endpoint.getById}`, board);
	}
}
