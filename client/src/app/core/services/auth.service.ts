import { Injectable } from "@angular/core";
import { MasterService } from "./master.service";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	endpoint = {
		login: "auth/login",
		register: "auth/register",
	};
	constructor(private services: MasterService) {}

	login(email: string, password: string): Observable<ApiResponse> {
		return this.services.post(this.endpoint.login, { email, password });
	}

	register(
		username: string,
		email: string,
		password: string
	): Observable<ApiResponse> {
		return this.services.post(this.endpoint.register, {
			username,
			email,
			password,
		});
	}

	uploadFile(
		base64: string | ArrayBuffer | null,
		fileName: string
	): Observable<any> {
		return this.services.post("users/upload", { base64, fileName });
	}
}
