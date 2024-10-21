import { Component, Inject } from "@angular/core";
import {
	FormGroup,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
} from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { Task } from "../../../core/models/Task";

@Component({
	selector: "app-form-add",
	standalone: true,
	imports: [
		FormsModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatSelectModule,
	],
	templateUrl: "./form-add.component.html",
	styleUrl: "./form-add.component.scss",
})
export class FormAddComponent {
	form!: FormGroup;

	mailInput: string = "";
	listEmail: string[] = ["nhoccuthien0538@gmail.com", "tranthien@gmail.com"];
	listType: string[] = ["Pending", "In Progress", "Completed"];

	isEdit: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: { task: Task | null }) {
		if (data) {
			this.isEdit = true;
			console.log("Edit form");
			this.form = new FormGroup({
				name: new FormControl(data.task?.name),
				description: new FormControl(data.task?.description),
				type: new FormControl(data.task?.status),
				assignFor: new FormControl(data.task?.assignBy),
				file: new FormControl(data.task?.Attachments),
			});
		} else {
			console.log("Add form");
			this.form = new FormGroup({
				name: new FormControl(""),
				description: new FormControl(""),
				type: new FormControl(""),
				assignFor: new FormControl(""),
				file: new FormControl(null),
			});
		}
	}

	submit(): void {}
}
