import { Component, inject, Inject } from "@angular/core";
import {
	FormGroup,
	FormControl,
	FormsModule,
	ReactiveFormsModule,
} from "@angular/forms";
import {
	MAT_DIALOG_DATA,
	MatDialog,
	MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { Task } from "../../../core/models/Task";
import { Board } from "../../../core/models/Board";
import { TaskService } from "../../../core/services/task.service";
import { List } from "../../../core/models/List";
import { ToastrService } from "ngx-toastr";
import { AttachmentService } from "../../../core/services/attachment.service";
import { HttpClient } from "@angular/common/http";
import { Attachment } from "../../../core/models/Attachment";

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
	listEmail: string[] = [];
	listType: string[] = ["Pending", "In Progress", "Completed"];

	isEdit: boolean = false;
	listAttachments: Attachment[] = [];
	file!: File;
	readonly dialogRef = inject(MatDialogRef<FormAddComponent>);
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: { task: Task; memberlist: string[]; list: List },
		private taskService: TaskService,
		private toastr: ToastrService,
		private attachmentService: AttachmentService,
		private http: HttpClient
	) {
		this.listEmail = data.memberlist;
		console.log(this.data.memberlist);

		if (data.task) {
			this.isEdit = true;
			console.log("Edit form");
			console.log(data.task);

			this.form = new FormGroup({
				name: new FormControl(data.task?.name),
				description: new FormControl(data.task?.description),
				status: new FormControl(data.task?.status),
				permitted: new FormControl(data.task?.permitted),
			});

			this.attachmentService.getAllByTask(this.data.task._id).subscribe({
				next: (res) => {
					console.log(res);
					this.listAttachments = res.data.list;
				},
			});
		} else {
			console.log("Add form");
			this.form = new FormGroup({
				name: new FormControl(""),
				description: new FormControl(""),
				status: new FormControl(""),
				permitted: new FormControl(""),
			});
		}
	}

	onChangeFile($event: any) {
		if ($event.target.files[0]) {
			console.log($event.target.files[0]);
			this.file = $event.target.files[0];
		}
	}
	downloadFile(filename: string) {
		console.log("Download file");
		return this.http
			.get("http://localhost:3000/api/attachment/download", {
				params: { filename }, // Gửi tên file qua query params
				responseType: "blob", // Nhận về dạng blob (file)
			})
			.subscribe(
				(blob) => {
					const url = window.URL.createObjectURL(blob); // Tạo URL từ blob
					const a = document.createElement("a"); // Tạo thẻ <a> để tải file
					a.href = url;
					a.download = filename; // Đặt tên file khi tải về
					a.click(); // Kích hoạt sự kiện click để tải file
					window.URL.revokeObjectURL(url); // Xóa URL sau khi tải xong
				},
				(error) => {
					console.error("Download failed:", error);
				}
			);
	}

	deleteFile(_id: string) {
		this.attachmentService.deleteById(_id).subscribe({
			next: (res) => {
				this.toastr.success("Xóa file thành công", "Thành công", {
					timeOut: 3000,
				});
				this.listAttachments = this.listAttachments.filter(
					(e) => e._id !== _id
				);
				console.log(res);
			},
		});
	}

	deleteTask(): void {
		this.taskService.deleteById(this.data.task._id).subscribe({
			next: (res) => {
				this.toastr.warning("Xóa thành công", "Thành công", {
					timeOut: 3000,
				});
				this.dialogRef.close(true);
			},
		});
	}

	base64Image: string | ArrayBuffer | null = null;
	onChangeUpload($event: any) {
		console.log($event.target.files[0]);
		const reader = new FileReader();

		reader.onload = () => {
			// Assign the base64 string to a variable
			this.base64Image = reader.result;
			console.log(this.base64Image); // Logs the base64 string to the console
			this.attachmentService
				.create(this.data.task._id, this.base64Image, this.file.name)
				.subscribe({
					next: (res) => {
						console.log(res);
					},
					error: (err) => {
						console.log(err);
					},
				});
		};

		reader.readAsDataURL(this.file);
	}

	submit(): void {
		if (this.isEdit) {
			console.log("edit");
			this.data.task.name = this.form.get("name")?.value;
			this.data.task.description = this.form.get("description")?.value;
			this.data.task.status = this.form.get("status")?.value;
			// if (this.form.get("permitted")?.value !== "") {
			// 	this.data.task.permitted.push(
			// 		this.form.get("permitted")?.value
			// 	);
			// }
			console.log(this.data.task);

			this.taskService
				.updateById(this.data.task._id, this.data.task)
				.subscribe({
					next: (res) => {
						console.log(res);
						this.toastr.success(
							"Update thành công",
							"Cập nhật task mới",
							{
								timeOut: 3000,
							}
						);
						if (this.file !== undefined) {
							const reader = new FileReader();

							reader.onload = () => {
								// Assign the base64 string to a variable
								this.base64Image = reader.result;
								console.log(this.base64Image); // Logs the base64 string to the console
								this.attachmentService
									.create(
										this.data.task._id,
										this.base64Image,
										this.file.name
									)
									.subscribe({
										next: (res) => {
											console.log(res);
										},
										error: (err) => {
											console.log(err);
										},
									});
							};

							reader.readAsDataURL(this.file);
						}

						this.dialogRef.close(true);
					},
					error: (err) => {
						console.log(err);
					},
				});
		} else {
			console.log("add");
			console.log(this.form);
			const data = {
				...this.form.value,
				listId: this.data.list._id,
				createdBy: this.data.list.createdBy,
			};
			console.log(data);

			this.taskService.create(data).subscribe({
				next: (res) => {
					console.log(res);
					this.toastr.success("Tạo thành công", "Tạo task mới", {
						timeOut: 3000,
					});
					if (this.file !== undefined) {
						const reader = new FileReader();

						reader.onload = () => {
							// Assign the base64 string to a variable
							this.base64Image = reader.result;
							console.log(this.base64Image); // Logs the base64 string to the console
							this.attachmentService
								.create(
									this.data.task._id,
									this.base64Image,
									this.file.name
								)
								.subscribe({
									next: (res) => {
										console.log(res);
									},
									error: (err) => {
										console.log(err);
									},
								});
						};

						reader.readAsDataURL(this.file);
					}
					this.dialogRef.close(true);
				},
				error: (err) => {
					console.log(err);
				},
			});
		}
	}
}
