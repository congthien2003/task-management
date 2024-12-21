import { Component, inject } from "@angular/core";
import {
	FormGroup,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StudentService } from "../../../core/services/student.service";
import { FormAddComponent } from "../form-add/form-add.component";
import { MatButtonModule } from "@angular/material/button";
import { Student } from "../../../core/models/Student";

@Component({
	selector: "app-form-edit",
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule, MatButtonModule],
	templateUrl: "./form-edit.component.html",
	styleUrl: "./form-edit.component.scss",
})
export class FormEditComponent {
	form!: FormGroup;

	file: File | undefined;

	student: Student = {
		_id: "",
		name: "",
		avartar: "",
		age: 0,
	};
	readonly data = inject<any>(MAT_DIALOG_DATA);
	constructor(private service: StudentService) {
		this.service.getById(this.data._id).subscribe({
			next: (res) => {
				this.student = res.data.student;

				this.form = new FormGroup({
					name: new FormControl(res.data.student.name),
					age: new FormControl(res.data.student.age),
				});
			},
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
		if (
			$events.target.files[0] &&
			$events.target.files[0].name != this.student.avartar
		) {
			this.file = $events.target.files[0];
		}
	}

	base64Image: string | ArrayBuffer | null = null;

	onUpload() {
		if (this.file !== undefined) {
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

					this.service.update(this.student._id, data).subscribe({
						next: (res) => {
							this.dialogRef.close(true);
						},
						error: (err) => {
							console.log(err);
						},
					});
				};

				reader.readAsDataURL(this.file);
			}
		} else {
			const data = {
				...this.form.value,
			};
			console.log(data);

			this.service.update(this.student._id, data).subscribe({
				next: (res) => {
					this.dialogRef.close(true);
				},
				error: (err) => {
					console.log(err);
				},
			});
		}
	}
}
