import { Injectable } from "@angular/core";
import { MasterService } from "./master.service";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/ApiResponse";
import { JwtManager } from "../../util/JwtManager";
import * as jwtdecode from "jwt-decode";
@Injectable({
	providedIn: "root",
})
export class AuthService {
	jwtManager: JwtManager = new JwtManager();
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

	getIdFromToken(): any {
		const token = this.jwtManager.getToken();
		if (token === "") {
			return null;
		}
		const tokenPayload = jwtdecode.jwtDecode(token);
		if ("_id" in tokenPayload) {
			return tokenPayload["_id"];
		} else {
			return null;
		}
	}

	getUsernameFromToken(): any {
		const token = this.jwtManager.getToken();
		if (token === "") {
			return null;
		}
		const tokenPayload = jwtdecode.jwtDecode(token);
		if ("username" in tokenPayload) {
			return tokenPayload["username"];
		} else {
			return null;
		}
	}

	uploadFile(
		base64: string | ArrayBuffer | null,
		fileName: string
	): Observable<any> {
		return this.services.post("users/upload", { base64, fileName });
	}
}
