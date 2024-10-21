import { Component, Inject, signal } from "@angular/core";
import {
	FormsModule,
	FormGroup,
	FormControl,
	ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Note } from "../../../core/models/Note";

@Component({
	selector: "app-add-note",
	standalone: true,
	imports: [MatButtonModule, FormsModule, ReactiveFormsModule],
	templateUrl: "./add-note.component.html",
	styleUrl: "./add-note.component.scss",
})
export class AddNoteComponent {
	form!: FormGroup;

	mailInput: string = "";
	listEmail: string[] = [];

	isEdit: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: { note: Note | null }) {
		this.form = new FormGroup({
			name: new FormControl(""),
			description: new FormControl(""),
			type: new FormControl(""),
		});

		if (data) {
			this.isEdit = true;
			console.log("Edit form");
			this.form = new FormGroup({
				name: new FormControl(data.note?.name),
				description: new FormControl(data.note?.description),
				type: new FormControl(data.note?.type),
			});
		} else {
			console.log("Add form");
			this.form = new FormGroup({
				name: new FormControl(""),
				description: new FormControl(""),
				type: new FormControl(""),
			});
		}
	}

	submit() {
		console.log("Send mail " + this.mailInput);
	}
}
