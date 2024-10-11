import { Injectable } from "@angular/core";
import { MasterService } from "./master.service";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";

@Injectable({
	providedIn: "root",
})
export class BoardService {
	endpoint = {
		getAll: "board",
		getAllByIdUser: "board/GetAll",
		getCoopboardByIdUser: "board/GetCoop",
		addMembers: "board/add-member",
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
	addMembers(boardId: string, members: any): Observable<ApiResponse> {
		return this.master.post(
			`${this.endpoint.addMembers}/${boardId}`,
			members
		);
	}

	// Xóa thành viên khỏi board
	removeMembers(boardId: string, memberId: string): Observable<ApiResponse> {
		return this.master.delete(
			`${this.endpoint.removeMembers}/${boardId}/${memberId}`
		);
	}

	// Lấy board theo ID
	getById(boardId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getById}/${boardId}`);
	}
}
