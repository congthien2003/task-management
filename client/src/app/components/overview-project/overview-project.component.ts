import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Project } from "src/app/core/models/Project";
import { ProjectService } from "src/app/core/services/project.service";

@Component({
	selector: "app-overview-project",
	templateUrl: "./overview-project.component.html",
	styleUrls: ["./overview-project.component.scss"],
})
export class OverviewProjectComponent implements OnInit {
	idProject: string;
	project: Project;
	constructor(
		private activeRoute: ActivatedRoute,
		private projectService: ProjectService
	) {}
	ngOnInit(): void {
		this.idProject = this.activeRoute.snapshot.params["id"];
		this.projectService.getById(this.idProject).subscribe({
			next: (value) => {
				console.log(value);
				this.project = value.data.project as Project;

				console.log(this.project);
			},
		});
	}
}
