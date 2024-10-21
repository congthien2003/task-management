import { Component } from "@angular/core";
import { FormGroup, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "app-add-member",
	standalone: true,
	imports: [MatButtonModule, FormsModule],
	templateUrl: "./add-member.component.html",
	styleUrl: "./add-member.component.scss",
})
export class AddMemberComponent {
	form!: FormGroup;

	mailInput: string = "";
	listEmail: string[] = [];

	constructor() {}

	invite() {
		console.log("Send mail " + this.mailInput);
	}
}
