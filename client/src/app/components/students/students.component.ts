import { Component, inject, OnInit } from "@angular/core";
import { Student } from "../../core/models/Student";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { FormEditComponent } from "./form-edit/form-edit.component";
import { ModalDeleteComponent } from "./modal-delete/modal-delete.component";
import { FormAddComponent } from "./form-add/form-add.component";
import { StudentService } from "../../core/services/student.service";

@Component({
	selector: "app-students",
	standalone: true,
	imports: [MatButtonModule, CommonModule],
	templateUrl: "./students.component.html",
	styleUrl: "./students.component.scss",
})
export class StudentsComponent implements OnInit {
	students: Student[] = [
		{
			_id: "123",
			name: "Cong Thien",
			avartar: "sdjkadsa",
			age: 23,
		},
	];

	currentPage: number = 1;
	pageSize: number = 5;
	totalRecords: number = 0;
	totalPages: number = 0;
	hasPrev: boolean = false;
	hasNext: boolean = false;

	constructor(private service: StudentService) {}
	ngOnInit(): void {
		this.loadList();
	}

	loadList() {
		this.service
			.getList(
				this.pageSize,
				this.currentPage,
				this.hasPrev,
				this.hasNext,
				this.totalPages,
				this.totalRecords
			)
			.subscribe({
				next: (res) => {
					this.students = res.data.students;
					this.totalRecords = res.data.totalRecords;
					this.hasNext = res.data.hasNext;
					this.hasPrev = res.data.hasPrev;
					this.totalPages = res.data.totalPages;
					console.log(res);
				},
				error: (err) => {
					console.log(err);
				},
			});
	}
	readonly dialog = inject(MatDialog);
	openEdit(_id: string) {
		const dialogRef = this.dialog.open(FormEditComponent, {
			data: { _id: _id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				this.loadList();
			}
		});
	}

	openAdd() {
		const dialogRef = this.dialog.open(FormAddComponent, {});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				this.loadList();
			}
		});
	}

	openDelete(_id: string) {
		const dialogRef = this.dialog.open(ModalDeleteComponent, {
			data: { _id: _id },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				this.service.delete(_id).subscribe({
					next: (res) => {
						console.log(res);
						this.loadList();
					},
				});
			}
		});
	}

	goToPreviousPage() {
		if (this.hasPrev) {
			this.currentPage--;
			this.loadList();
		}
	}

	goToNextPage() {
		if (this.hasNext) {
			this.currentPage++;
			this.loadList();
		}
	}
}
