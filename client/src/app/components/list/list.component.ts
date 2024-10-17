import { Component, input, Input, OnInit } from "@angular/core";
import { List } from "../../core/models/List";
import { MatButtonModule } from "@angular/material/button";
import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
	CdkDrag,
	CdkDropList,
} from "@angular/cdk/drag-drop";
@Component({
	selector: "app-list",
	standalone: true,
	imports: [MatButtonModule, CdkDropList, CdkDrag],
	templateUrl: "./list.component.html",
	styleUrl: "./list.component.scss",
})
export class ListComponent implements OnInit {
	list!: List;

	@Input() inputList!: List;

	constructor() {}
	ngOnInit(): void {
		this.list = this.inputList;
	}

	drop(event: CdkDragDrop<string[]>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}
}
