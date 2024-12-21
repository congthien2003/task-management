import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { MasterService } from "./master.service";

@Injectable({
	providedIn: "root",
})
export class UserService {
	endpoint = {
		getByEmail: "users/email",
		testGemini: "users/test",
		getById: "users",
		uploadImage: "users/upload",
		getAll: "users",
	};

	constructor(private master: MasterService) {}

	// Lấy thông tin user bằng email
	getByEmail(email: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getByEmail}?email=${email}`);
	}

	// Test Gemini endpoint (nếu cần)
	testGemini(): Observable<ApiResponse> {
		return this.master.get(this.endpoint.testGemini);
	}

	// Lấy thông tin user theo ID
	getById(userId: string): Observable<ApiResponse> {
		return this.master.get(`${this.endpoint.getById}/${userId}`);
	}

	// Tải lên hình ảnh cho user
	uploadImage(imageData: FormData): Observable<ApiResponse> {
		return this.master.post(this.endpoint.uploadImage, imageData);
	}

	// Lấy tất cả người dùng
	getAll(): Observable<ApiResponse> {
		return this.master.get(this.endpoint.getAll);
	}
}
