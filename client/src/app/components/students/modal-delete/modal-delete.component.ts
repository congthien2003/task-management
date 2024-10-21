import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { StudentService } from "../../../core/services/student.service";

@Component({
	selector: "app-modal-delete",
	standalone: true,
	imports: [MatButtonModule],
	templateUrl: "./modal-delete.component.html",
	styleUrl: "./modal-delete.component.scss",
})
export class ModalDeleteComponent {
	constructor(private service: StudentService) {}
	readonly dialogRef = inject(MatDialogRef<ModalDeleteComponent>);
	cancel() {
		this.dialogRef.close(false);
	}

	confirm() {
		this.dialogRef.close(true);
	}
}
