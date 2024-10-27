import { Component, inject, Input, OnInit } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { BoardService } from "../../../core/services/board.service";

@Component({
	selector: "app-form-board",
	standalone: true,
	imports: [
		FormsModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatSelectModule,
	],
	templateUrl: "./form-board.component.html",
	styleUrl: "./form-board.component.scss",
})
export class FormBoardComponent implements OnInit {
	readonly dialogRef = inject(MatDialogRef<FormBoardComponent>);

	form!: FormGroup;

	ListEmailInput: string[] = [];
	emailInput: string = "";

	constructor(private boardService: BoardService) {}
	ngOnInit(): void {
		this.form = new FormGroup({
			name: new FormControl(""),
			description: new FormControl(""),
			owner: new FormControl(""),
			members: new FormControl([]),
			lists: new FormControl([]),
		});
	}

	changeEmailInput($event: any) {
		console.log($event.target.value);
		this.emailInput = $event.target.value;
	}

	addEmail(): void {
		console.log(this.emailInput);
		this.ListEmailInput.push(this.emailInput);
		this.emailInput = "";
	}

	submit(): void {
		this.form.get("members")?.setValue(this.ListEmailInput);
		console.log(this.form.value);
	}
}
