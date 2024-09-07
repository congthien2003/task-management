import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { User } from "src/app/core/models/User";
@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
	isLoading = true;
	user: User = {
		username: "",
		email: "",
		password: "",
		phones: "",
		role: 0,
	};
	constructor(
		private service: AuthenticationService,
		private toastr: ToastrService,
		private route: Router
	) {}

	ngOnInit() {
		this.isLoading = false;
	}

	initForm() {}

	login() {
		if (this.service.isAuthenticated()) {
			this.route.navigate(["/pages"]);
		} else {
			this.service.login(this.user.email, this.user.password).subscribe({
				next: (data) => {
					localStorage.setItem("token", data.data.userExists.token);
					this.route.navigate(["/pages"]);
				},
				error: (error) => {
					this.toastr.error(error, "Đăng nhập không thành công !", {
						timeOut: 3000,
					});
				},
			});
		}
	}
}
