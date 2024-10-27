import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { MasterService } from "./master.service";

@Injectable({
	providedIn: "root",
})
export class AttachmentService {
	private endpoint = {
		create: "attachment", // POST /attachments/:id
		getAllByTask: "attachment/t", // GET /attachments/t/:idTask
		getById: "attachment", // GET /attachments/:id
		deleteById: "attachment/delete", // DELETE /attachments/delete/:id
		getAll: "attachment", // GET /attachments
	};

	constructor(private master: MasterService) {}

	// Tạo mới attachment cho một task theo ID task
	create(
		taskId: string,
		base64: string | ArrayBuffer | null,
		fileName: string
	): Observable<ApiResponse> {
		return this.master.post(`${this.endpoint.create}/${taskId}`, {
			base64,
			fileName,
		});
	}

	// Lấy tất cả attachments theo ID task
	getAllByTask(taskId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getAllByTask}/${taskId}`);
	}

	// Lấy attachment theo ID
	getById(attachmentId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getById}/${attachmentId}`);
	}

	// Xóa attachment theo ID
	deleteById(attachmentId: string): Observable<ApiResponse> {
		return this.master.delete(
			`${this.endpoint.deleteById}/${attachmentId}`
		);
	}

	// Lấy tất cả attachments
	getAll(): Observable<ApiResponse> {
		return this.master.get(this.endpoint.getAll);
	}
}
