import { Injectable } from "@angular/core";
import { MasterService } from "./master.service";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { HttpParams } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class StudentService {
	endpoints = {
		getList: "student",
		student: "student",
		delete: "student/delete",
		uploadAvatar: "student/upload",
	};

	constructor(private service: MasterService) {}

	getList(
		pageSize: number,
		currentPage: number,
		hasPrev: boolean,
		hasNext: boolean,
		totalPages: number,
		totalRecords: number
	): Observable<any> {
		const params = new HttpParams()
			.set("pageSize", pageSize)
			.set("currentPage", currentPage)
			.set("hasPrev", hasPrev)
			.set("hasNext", hasNext)
			.set("totalPages", totalPages)
			.set("totalRecords", totalRecords);

		return this.service.get(this.endpoints.getList, { params });
	}

	getById(id: string): Observable<any> {
		return this.service.get(`${this.endpoints.student}/${id}`);
	}

	create(data: any): Observable<any> {
		return this.service.post(this.endpoints.student, data);
	}

	update(id: string, data: any): Observable<any> {
		return this.service.put(`${this.endpoints.student}/${id}`, data);
	}

	delete(id: string): Observable<any> {
		return this.service.delete(`${this.endpoints.delete}/${id}`);
	}

	uploadFile(
		base64: string | ArrayBuffer | null,
		fileName: string
	): Observable<any> {
		return this.service.post(`${this.endpoints.uploadAvatar}`, {
			base64,
			fileName,
		});
	}
}
