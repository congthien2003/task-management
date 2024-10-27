import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Board } from "../../core/models/Board";

import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { List } from "../../core/models/List";
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
import { BoardService } from "../../core/services/board.service";
import { ListService } from "../../core/services/list.service";
import { TaskService } from "../../core/services/task.service";
import { AuthService } from "../../core/services/auth.service";
import { User } from "../../core/models/User";
import { UserService } from "../../core/services/user.service";
import { forkJoin } from "rxjs";
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
	imports: [MatImport, CommonModule, FormsModule],
	templateUrl: "./board-detail.component.html",
	styleUrl: "./board-detail.component.scss",
})
export class BoardDetailComponent implements OnInit {
	idBoard: string = "";
	board: Board = {
		_id: "1",
		name: "Board 1",
		owner: "123",
		description: "Project",
		quantity: 3,
		status: 0,
		list: [],
		members: [],
	};

	lists: List[] = [
		{
			_id: "1",
			name: "To do",
			deleted: false,
			_idBoard: "1",
			createdAt: new Date(),
			createdBy: "123",
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
					permitted: [
						{
							email: "abc",
							_id: "123",
						},
					],
					listId: "1",
					attachments: [],
				},
			],
		},
		{
			_id: "1",
			name: "To do",
			deleted: false,
			_idBoard: "1",
			createdAt: new Date(),
			createdBy: "123",
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
					permitted: [
						{
							email: "abc",
							_id: "123",
						},
					],
					listId: "1",
					attachments: [],
				},
			],
		},
	];

	owner!: User;
	isOwner: boolean = false;

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

	constructor(
		private activedRoute: ActivatedRoute,
		private boardService: BoardService,
		private listService: ListService,
		private taskService: TaskService,
		private authService: AuthService,
		private userService: UserService
	) {}
	ngOnInit(): void {
		this.activedRoute.params.subscribe((value) => {
			console.log(value["id"]);
			this.idBoard = value["id"];

			// get Id from Token
			const idUser = this.authService.getIdFromToken();

			this.boardService.getById(this.idBoard).subscribe({
				next: (res) => {
					console.log(res);
					this.board = res.data.board;

					this.userService.getById(this.board.owner).subscribe({
						next: (res) => {
							console.log("User info");
							this.owner = res.data.user;
							console.log(this.owner);
						},
					});
					// Check isOwner
					if (this.board.owner == idUser) {
						this.isOwner = true;
					}

					this.loadList();
				},
			});
		});
		this.loadListNotes();
	}

	drop(event: CdkDragDrop<any[]>) {
		console.log(event);
		const indexListPrev = Number.parseInt(
			event.previousContainer.id.slice(14)
		);
		console.log(indexListPrev);
		const indexListCurrent = Number.parseInt(event.container.id.slice(14));
		console.log(indexListCurrent);

		const idListPrev = this.lists[indexListPrev]._id;
		const idListNext = this.lists[indexListCurrent]._id;

		console.log(idListPrev);
		console.log(idListNext);

		// Gọi services update task
		// Params truyền vào gồm: (idTask, idListPrev, idListNext)
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

		forkJoin({
			res1: this.listService.updateById(
				this.lists[indexListPrev]._id,
				this.lists[indexListPrev]
			),
			res2: this.listService.updateById(
				this.lists[indexListCurrent]._id,
				this.lists[indexListCurrent]
			),
		}).subscribe({
			next: ({ res1, res2 }) => {
				console.log({ res1, res2 });
			},
			error: (err) => {
				console.log(err);
			},
		});
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

	loadList(): void {
		this.listService.getAllByIdBoard(this.board._id).subscribe({
			next: (res) => {
				console.log(res);
				this.lists = res.data.list;
			},
		});
	}

	loadTask(): void {}

	addTask(list: List): void {
		const dialogRef = this.dialog.open(FormAddComponent, {
			data: {
				list,
				memberlist: this.board.members,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			if (result) {
				console.log("added");
				this.loadList();
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
				this.loadTask();
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
