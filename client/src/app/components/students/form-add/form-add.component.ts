import { Component, inject } from "@angular/core";
import {
	Form,
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { StudentService } from "../../../core/services/student.service";

@Component({
	selector: "app-form-add",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatButtonModule],
	templateUrl: "./form-add.component.html",
	styleUrl: "./form-add.component.scss",
})
export class FormAddComponent {
	form!: FormGroup;

	file: File | undefined;

	constructor(private service: StudentService) {
		this.form = new FormGroup({
			name: new FormControl(""),
			age: new FormControl(0),
		});
	}

	submit() {
		console.log(this.form.value);
	}

	readonly dialogRef = inject(MatDialogRef<FormAddComponent>);
	cancel() {
		this.dialogRef.close();
	}

	onChangeFile($events: any) {
		if ($events.target.files[0]) {
			this.file = $events.target.files[0];
		}
	}

	base64Image: string | ArrayBuffer | null = null;
	onUpload() {
		const reader = new FileReader();
		if (this.file !== undefined) {
			reader.onload = () => {
				// Assign the base64 string to a variable
				this.base64Image = reader.result;
				console.log(this.base64Image);
				const data = {
					...this.form.value,
					avartar: this.base64Image?.toString(),
					fileName: this.file!.name,
				};
				console.log(data);

				this.service.create(data).subscribe({
					next: (res) => {
						console.log(res);
						this.dialogRef.close(true);
					},
					error: (err) => {
						console.log(err);
					},
				});
			};

			reader.readAsDataURL(this.file);
		}
	}
}
