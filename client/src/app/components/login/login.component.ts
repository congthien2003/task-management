import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
	ReactiveFormsModule,
	FormGroup,
	FormControl,
	FormBuilder,
} from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
@Component({
	selector: "app-login",
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent {
	formLogin!: FormGroup;

	constructor(private service: AuthService, private router: Router) {
		this.formLogin = new FormGroup({
			email: new FormControl(""),
			password: new FormControl(""),
		});
	}

	login($event: any) {
		console.log(this.formLogin.value);
		this.service
			.login(this.formLogin.value.email, this.formLogin.value.password)
			.subscribe({
				next: (res) => {
					if (res.isSuccess) {
						sessionStorage.setItem("token", res.data.user.token);
						this.router.navigateByUrl("/");
					}
					console.log(res);
				},
			});
	}

	file!: File;
	base64Image: string | ArrayBuffer | null = null;
	onChangeUpload($event: any) {
		console.log($event.target.files[0]);
		const file = $event.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			// Assign the base64 string to a variable
			this.base64Image = reader.result;
			console.log(this.base64Image); // Logs the base64 string to the console
			this.service.uploadFile(this.base64Image, file.name).subscribe({
				next: (res) => {
					console.log(res);
				},
				error: (err) => {
					console.log(err);
				},
			});
		};

		reader.readAsDataURL(file);
	}
}
