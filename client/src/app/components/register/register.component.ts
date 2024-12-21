import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.scss",
})
export class RegisterComponent {
	formRegister!: FormGroup;

	constructor(
		private service: AuthService,
		private router: Router,
		private toastr: ToastrService
	) {
		this.formRegister = new FormGroup({
			username: new FormControl(""),
			email: new FormControl(""),
			password: new FormControl(""),
		});
	}

	register() {
		this.service
			.register(
				this.formRegister.value.username,
				this.formRegister.value.email,
				this.formRegister.value.password
			)
			.subscribe({
				next: (res) => {
					if (res.isSuccess) {
						this.toastr.success(
							"Đăng ký tài khoản thành công",
							"Thành công",
							{
								timeOut: 3000,
							}
						);
						this.router.navigateByUrl("/auth/login");
					}
				},
			});
	}
}
