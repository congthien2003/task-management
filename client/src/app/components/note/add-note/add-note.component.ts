import { Component, inject, Inject, signal } from "@angular/core";
import {
	FormsModule,
	FormGroup,
	FormControl,
	ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Note } from "../../../core/models/Note";
import { NoteService } from "../../../core/services/note.service";
import { Board } from "../../../core/models/Board";

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
	readonly dialogRef = inject(MatDialogRef<AddNoteComponent>);

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: { note: Note | null; board: Board },
		private noteService: NoteService
	) {
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
		console.log({
			...this.form.value,
			idBoard: this.data.board._id,
			idUser: this.data.board.owner,
		});

		const data = {
			...this.form.value,
			boardId: this.data.board._id,
			userId: this.data.board.owner,
		};

		this.noteService.create(data).subscribe({
			next: (res) => {
				this.dialogRef.close(true);
			},
		});
	}
}
