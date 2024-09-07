import { Injectable } from "@angular/core";
import { MasterService } from "../master/master.service";
import { UserApi } from "../../constant/api/user.api";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class UserService {
	endpoint = UserApi;
	constructor(private service: MasterService) {}

	list(): Observable<any> {
		return this.service.get(this.endpoint.getAll);
	}

	getById(id: number): Observable<any> {
		return this.service.get(`${this.endpoint.getById}/${id} `);
	}

	getByEmail(email: string): Observable<any> {
		const params = new HttpParams().set("email", email);
		return this.service.get(`${this.endpoint.getById}/email`, { params });
	}

	create(user: any): Observable<any> {
		return this.service.post(`${this.endpoint.create}`, user);
	}

	update(user: any): Observable<any> {
		return this.service.put(`${this.endpoint.update}`, user);
	}
}
