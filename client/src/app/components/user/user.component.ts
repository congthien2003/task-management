import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { AuthService } from "../../core/services/auth.service";
import { User } from "../../core/models/User";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "app-user",
	standalone: true,
	imports: [ReactiveFormsModule, MatButtonModule],
	templateUrl: "./user.component.html",
	styleUrl: "./user.component.scss",
})
export class UserComponent implements OnInit {
	user!: User;
	form!: FormGroup;
	constructor(
		private userService: UserService,
		private authService: AuthService,
		private router: Router
	) {}
	ngOnInit(): void {
		if (this.authService.getIdFromToken() == undefined) {
			this.router.navigateByUrl("/auth/login");
		}
		this.userService.getById(this.authService.getIdFromToken()).subscribe({
			next: (res) => {
				this.user = res.data.user;
				this.form = new FormGroup({
					email: new FormControl(this.user.email),
					username: new FormControl(this.user.username),
				});
			},
		});
	}

	save() {
		console.log("Updated");
	}

	backToPage() {
		this.router.navigateByUrl("/board");
	}
}
