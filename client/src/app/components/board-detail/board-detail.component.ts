import { Component, OnInit } from "@angular/core";
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
const MatImport = [
	MatButtonModule,
	MatTabsModule,
	CdkDropList,
	CdkDrag,
	MatMenuModule,
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

	notes: Note[] = [
		{
			name: "Note 1",
			description: "Note 1 for Back-end",
			type: "Pending",
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: "123",
			_idProject: "1",
		},
	];

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
}
