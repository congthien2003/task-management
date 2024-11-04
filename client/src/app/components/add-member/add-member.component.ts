import { Component, inject, Inject } from "@angular/core";
import { FormGroup, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { BoardService } from "../../core/services/board.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Board } from "../../core/models/Board";
import { FormAddListComponent } from "../list/form-add-list/form-add-list.component";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-add-member",
	standalone: true,
	imports: [MatButtonModule, FormsModule],
	templateUrl: "./add-member.component.html",
	styleUrl: "./add-member.component.scss",
})
export class AddMemberComponent {
	form!: FormGroup;

	mailInput: string = "";
	listEmail: string[] = [];
	readonly dialogRef = inject(MatDialogRef<FormAddListComponent>);
	constructor(
		private boardService: BoardService,
		@Inject(MAT_DIALOG_DATA)
		public data: { board: Board },
		private toastr: ToastrService
	) {}

	invite() {
		console.log("Send mail " + this.mailInput);
		this.boardService
			.addMembers(this.data.board._id, this.mailInput)
			.subscribe({
				next: (res) => {
					this.toastr.success("Add new member", "Success", {
						timeOut: 3000,
					});
					this.dialogRef.close(true);
				},
			});
	}
}
