import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { MasterService } from "./master.service";

@Injectable({
	providedIn: "root",
})
export class TaskService {
	endpoint = {
		getAllByIdList: "task/l",
		getById: "task",
		create: "task",
		getAll: "task",
		updateById: "task",
		deleteById: "task/delete",
		registerEmail: "task/register",
	};

	constructor(private master: MasterService) {}

	// Lấy tất cả tasks theo list ID
	getAllByIdList(listId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getAllByIdList}/${listId}`);
	}

	// Lấy task theo ID
	getById(taskId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getById}/${taskId}`);
	}

	// Tạo task mới
	create(taskData: any): Observable<ApiResponse> {
		return this.master.post(this.endpoint.create, taskData);
	}

	// Lấy tất cả tasks
	getAll(): Observable<ApiResponse> {
		return this.master.get(this.endpoint.getAll);
	}

	// Cập nhật task theo ID
	updateById(taskId: string, taskData: any): Observable<ApiResponse> {
		return this.master.put(
			`${this.endpoint.updateById}/${taskId}`,
			taskData
		);
	}

	// Xóa task theo ID
	deleteById(taskId: string): Observable<ApiResponse> {
		return this.master.delete(`${this.endpoint.deleteById}/${taskId}`);
	}

	// Đăng ký email cho task theo ID
	registerEmail(taskId: string, emailData: any): Observable<ApiResponse> {
		return this.master.post(
			`${this.endpoint.registerEmail}/${taskId}`,
			emailData
		);
	}
}
