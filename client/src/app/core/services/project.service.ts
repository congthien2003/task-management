import { Injectable } from "@angular/core";
import { ProjectApi } from "../constant/api/project.api";
import { Observable } from "rxjs";
import { MasterService } from "./master/master.service";
import { Project } from "../models/Project";

@Injectable({
	providedIn: "root",
})
export class ProjectService {
	endpoint = ProjectApi;
	constructor(private service: MasterService) {}

	getListByIdUser(idUser: string): Observable<any> {
		return this.service.get(`${this.endpoint.getListByIdUser}/` + idUser);
	}

	getCoopByIdUser(idUser: string): Observable<any> {
		return this.service.get(`${this.endpoint.getCoopByIdUser}/` + idUser);
	}

	getById(idBoard: string): Observable<any> {
		return this.service.get(`${this.endpoint.url}/` + idBoard);
	}

	create(newBoard: Project): Observable<any> {
		return this.service.post(`${this.endpoint.url}`, { newBoard });
	}
}
