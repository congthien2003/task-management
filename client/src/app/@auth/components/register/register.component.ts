import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/core/models/User";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
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
	regiser() {
		this.service
			.register(this.user.username, this.user.email, this.user.password)
			.subscribe({
				next: (data) => {
					localStorage.setItem("token", data.data.token);
					this.toastr.success("", "Đăng ký thành công !", {
						timeOut: 3000,
					});
					this.route.navigate(["/pages"]);
				},
				error: (error) => {
					this.toastr.error(
						error.message,
						"Đăng ký không thành công !",
						{
							timeOut: 3000,
						}
					);
				},
			});
	}
}
