import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { MasterService } from "./master.service";

@Injectable({
	providedIn: "root",
})
export class ListService {
	endpoint = {
		getAllByIdBoard: "list/b", // Lấy tất cả lists theo board ID
		getById: "list", // Lấy list theo ID
		updateById: "list", // Cập nhật list theo ID
		deleteById: "list/delete", // Xóa list theo ID
		create: "list", // Tạo list mới
		getAll: "list", // Lấy tất cả lists
	};

	constructor(private master: MasterService) {}

	// Lấy tất cả lists theo board ID
	getAllByIdBoard(boardId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getAllByIdBoard}/${boardId}`);
	}

	// Lấy list theo ID
	getById(listId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getById}/${listId}`);
	}

	// Cập nhật list theo ID
	updateById(listId: string, listData: any): Observable<ApiResponse> {
		return this.master.put(
			`${this.endpoint.updateById}/${listId}`,
			listData
		);
	}

	// Xóa list theo ID
	deleteById(listId: string): Observable<ApiResponse> {
		return this.master.delete(`${this.endpoint.deleteById}/${listId}`);
	}

	// Tạo list mới
	create(listData: any): Observable<ApiResponse> {
		return this.master.post(this.endpoint.create, listData);
	}

	// Lấy tất cả lists
	getAll(): Observable<ApiResponse> {
		return this.master.get(this.endpoint.getAll);
	}
}
