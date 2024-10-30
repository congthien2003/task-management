import { Component, inject, Inject } from "@angular/core";
import {
	FormsModule,
	FormGroup,
	ReactiveFormsModule,
	FormControl,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ListService } from "../../../core/services/list.service";
import { List } from "../../../core/models/List";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Task } from "../../../core/models/Task";
import { Board } from "../../../core/models/Board";

@Component({
	selector: "app-form-add-list",
	standalone: true,
	imports: [MatButtonModule, FormsModule, ReactiveFormsModule],
	templateUrl: "./form-add-list.component.html",
	styleUrl: "./form-add-list.component.scss",
})
export class FormAddListComponent {
	form!: FormGroup;

	listName: string = "";
	list!: List;
	color: any = "#fff";
	readonly dialogRef = inject(MatDialogRef<FormAddListComponent>);

	constructor(
		private listService: ListService,
		@Inject(MAT_DIALOG_DATA)
		public data: { board: Board }
	) {
		this.form = new FormGroup({
			name: new FormControl(""),
			description: new FormControl(""),
		});
	}

	submit() {
		const data = {
			userId: this.data.board.owner,
			boardId: this.data.board._id,
			color: this.color,
			...this.form.value,
		};
		console.log("Created", data);
		this.listService.create(data).subscribe({
			next: (res) => {
				console.log(res);
				this.dialogRef.close(true);
			},
		});
	}
}
