import { Component, inject } from "@angular/core";
import { Board } from "../../core/models/Board";
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { BoardService } from "../../core/services/board.service";
import { SocketIoService } from "../../core/services/socket.io.service";
import { MatDialog } from "@angular/material/dialog";
import { AddMemberComponent } from "../add-member/add-member.component";
import { FormBoardComponent } from "./form-board/form-board.component";
import { ToastrService } from "ngx-toastr";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "app-board",
	standalone: true,
	imports: [RouterLink, RouterOutlet, MatButtonModule],
	templateUrl: "./board.component.html",
	styleUrl: "./board.component.scss",
})
export class BoardComponent {
	listBoard: Board[] = [
		{
			_id: "1",
			name: "Board 1",
			owner: "123",
			description: "Project",
			quantity: 3,
			status: 0,
			list: [],
			members: [],
		},
	];

	listBoardCoop: Board[] = [];
	selected: number = -1;
	idUser: string = "";

	messages: string[] = [];
	newMessage: string = "";
	constructor(
		private auth: AuthService,
		private toastr: ToastrService,
		private boardService: BoardService,
		private router: Router
	) {
		this.idUser = this.auth.getIdFromToken();

		this.boardService.getAllByIdUser(this.idUser).subscribe({
			next: (res) => {
				console.log(res);
				this.listBoard = res.data.list;
			},
		});

		this.boardService.getCoopboardByIdUser(this.idUser).subscribe({
			next: (res) => {
				console.log(res);
				this.listBoardCoop = res.data.list;

				this.listBoard.forEach((e) => {
					this.listBoardCoop = this.listBoardCoop.filter(
						(x) => x._id !== e._id
					);
				});
			},
		});
		console.log(this.idUser);
	}

	readonly dialog = inject(MatDialog);
	createBoard() {
		const dialogRef = this.dialog.open(FormBoardComponent);

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.toastr.success("Add new board", "Success", {
					timeOut: 3000,
				});
			}
		});
	}

	infoUser() {
		this.router.navigateByUrl("/user");
	}

	logOut() {
		this.router.navigateByUrl("/auth/login");
		localStorage.clear();
	}
}
