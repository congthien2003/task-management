import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Board } from "../../core/models/Board";

import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { List } from "../../core/models/List";
import { ListComponent } from "../list/list.component";
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
	CdkDrag,
	CdkDropList,
} from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { Note } from "../../core/models/Note";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormEditComponent } from "../students/form-edit/form-edit.component";
import { AddMemberComponent } from "../add-member/add-member.component";
import { AddNoteComponent } from "../note/add-note/add-note.component";
import { FormAddComponent } from "../task/form-add/form-add.component";
import { Task } from "../../core/models/Task";
import { MatProgressBarModule } from "@angular/material/progress-bar";
const MatImport = [
	MatButtonModule,
	MatTabsModule,
	MatDialogModule,
	CdkDropList,
	CdkDrag,
	MatMenuModule,
	MatProgressBarModule,
];

@Component({
	selector: "app-board-detail",
	standalone: true,
	imports: [MatImport, ListComponent, CommonModule, FormsModule],
	templateUrl: "./board-detail.component.html",
	styleUrl: "./board-detail.component.scss",
})
export class BoardDetailComponent implements OnInit {
	board: Board = {
		_id: "1",
		name: "Board 1",
		_idOwner: "123",
		description: "Project",
		quantity: 3,
		status: 0,
	};

	lists: List[] = [
		{
			_id: "1",
			name: "To do",
			deleted: false,
			_idBoard: "1",
			createdAt: new Date(),
			_idOwner: "123",
			color: "#563d7c",
			tasks: [
				{
					_id: "1",
					name: "Task 1",
					description: "Task 1 for Back-end",
					status: "Pending",
					createdAt: new Date(),
					updatedAt: new Date(),
					createBy: "123",
					assignBy: "123",
					_idBoard: "1",
					Attachments: [],
				},
				{
					_id: "2",
					name: "Task 2",
					description: "Task 2 for Front-end",
					status: "Proccess",
					createdAt: new Date(),
					updatedAt: new Date(),
					createBy: "123",
					assignBy: "123",
					_idBoard: "1",
					Attachments: [],
				},
			],
		},
		{
			_id: "2",
			name: "Done",
			deleted: false,
			_idBoard: "1",
			createdAt: new Date(),
			_idOwner: "123",
			color: "#ff5733",
			tasks: [
				{
					_id: "1",
					name: "Task 3",
					description: "Task 3 for Back-end",
					status: "Pending",
					createdAt: new Date(),
					updatedAt: new Date(),
					createBy: "123",
					assignBy: "123",
					_idBoard: "1",
					Attachments: [],
				},
				{
					_id: "2",
					name: "Task 4",
					description: "Task 4 for Front-end",
					status: "Proccess",
					createdAt: new Date(),
					updatedAt: new Date(),
					createBy: "123",
					assignBy: "123",
					_idBoard: "1",
					Attachments: [],
				},
			],
		},
	];

	typeColor: any[] = [
		{
			type: "Pending",
			color: "red",
		},
	];

	notes: Note[] = [
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "1",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "2",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "3",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "4",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "",
		},
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			pinned: true,
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
			_id: "",
		},
	];

	pinnedNotes: Note[] = [];
	defaultNotes: Note[] = [];

	// Mảng chứa ID của tất cả các list để kết nối
	// Sửa tên cho đúng connected by Sabo
	connectedLists: string[] = this.lists.map(
		(_, index) => `cdk-drop-list-${index}`
	);

	constructor(private activedRoute: ActivatedRoute) {}
	ngOnInit(): void {
		this.activedRoute.params.subscribe((value) => {
			console.log(value["id"]);
		});
		this.loadListNotes();
	}

	drop(event: CdkDragDrop<any[]>) {
		console.log(event);

		console.log(
			event.previousContainer.data,
			event.container.data,
			event.previousIndex,
			event.currentIndex
		);
		if (event.previousContainer === event.container) {
			// Task được di chuyển trong cùng một danh sách
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			// Task được di chuyển từ danh sách khác
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}

	//! BOARD FUNCTION
	readonly dialog = inject(MatDialog);
	openDialogAddMember() {
		const dialogRef = this.dialog.open(AddMemberComponent);

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				console.log("added");
			}
		});
	}

	//! LIST FUNCTION

	EditingNameList: boolean = false;
	nameList: string = "";
	editList(list: List): void {}

	deleteList(_id: string): void {
		console.log(_id);
	}

	addTask(): void {
		const dialogRef = this.dialog.open(FormAddComponent);

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				console.log("added");
			}
		});
	}

	editTask(task: Task): void {
		const dialogRef = this.dialog.open(FormAddComponent, {
			data: {
				task,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				console.log("added");
			}
		});
	}

	//! NOTE FUNCTION

	loadListNotes(): void {
		this.pinnedNotes = this.notes.filter((e) => e.pinned === true);
		this.defaultNotes = this.notes.filter((e) => e.pinned === false);
	}

	addNote(): void {
		const dialogRef = this.dialog.open(AddNoteComponent);

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				console.log("added");
			}
		});
	}

	editNote(note: Note) {
		const dialogRef = this.dialog.open(AddNoteComponent, {
			data: {
				note,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				console.log("added");
			}
		});
	}

	pinHandle(id: string): void {
		console.log("pin note");
	}
}
