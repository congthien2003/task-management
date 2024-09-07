import { Component, OnInit } from "@angular/core";
import { ProjectService } from "src/app/core/services/project.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
	array = [1, 2, 3, 4];
	effect = "scrollx";
	isCollapsed: boolean | undefined;
	idUser = "66d9b49e83936c7d6045bfe9";
	constructor(private projectService: ProjectService) {}

	ngOnInit(): void {
		this.projectService.getListByIdUser(this.idUser).subscribe({
			next: (res) => {
				console.log(res);
			},
		});
	}
}
