import { Component } from "@angular/core";
import { Board } from "../../core/models/Board";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
	selector: "app-board",
	standalone: true,
	imports: [RouterLink, RouterOutlet],
	templateUrl: "./board.component.html",
	styleUrl: "./board.component.scss",
})
export class BoardComponent {
	listBoard: Board[] = [
		{
			_id: "1",
			name: "Board 1",
			_idOwner: "123",
			description: "Project",
			quantity: 3,
			status: 0,
		},
		{
			_id: "2",
			name: "Board 1",
			_idOwner: "123",
			description: "Project",
			quantity: 3,
			status: 0,
		},
		{
			_id: "3",
			name: "Board 1",
			_idOwner: "123",
			description: "Project",
			quantity: 3,
			status: 0,
		},
	];

	selected: number = -1;
}
