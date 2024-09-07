import { Component } from "@angular/core";
import {
	FormGroup,
	FormControl,
	AsyncValidatorFn,
	AbstractControl,
	ValidationErrors,
	ValidatorFn,
	NonNullableFormBuilder,
	Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable, Observer } from "rxjs";
import { AuthenticationService } from "src/app/core/services/auth/authentication.service";
import { ProjectService } from "src/app/core/services/project.service";
import { UserService } from "src/app/core/services/user/user.service";

@Component({
	selector: "app-create-project",
	templateUrl: "./create-project.component.html",
	styleUrls: ["./create-project.component.scss"],
})
export class CreateProjectComponent {
	validateForm: FormGroup<{
		name: FormControl<string>;
		description: FormControl<string>;
	}>;

	submitForm(): void {
		let data: any;
		data.name = this.validateForm.value.name ?? "";
		data.description = this.validateForm.value.description ?? "";
		data.owner = this.idUser;
		this.projectService.create(data).subscribe({
			next: (res: any) => {
				console.log(res);

				this.toastrService.success("", "Create success !", {
					timeOut: 3000,
				});
			},
			error: (error: any) => {
				this.toastrService.error(error.message, "Create failed !", {
					timeOut: 3000,
				});
			},
		});
	}

	resetForm(e: MouseEvent): void {
		e.preventDefault();
		this.validateForm.reset();
	}

	userNameAsyncValidator: AsyncValidatorFn = (control: AbstractControl) =>
		new Observable((observer: Observer<ValidationErrors | null>) => {
			setTimeout(() => {
				if (control.value === "JasonWood") {
					// you have to return `{error: true}` to mark it as an error event
					observer.next({ error: true, duplicated: true });
				} else {
					observer.next(null);
				}
				observer.complete();
			}, 1000);
		});

	idUser: string = "";

	constructor(
		private fb: NonNullableFormBuilder,
		private userService: UserService,
		private authService: AuthenticationService,
		private projectService: ProjectService,
		private toastrService: ToastrService
	) {
		this.validateForm = this.fb.group({
			name: ["", [Validators.required], [this.userNameAsyncValidator]],
			description: ["", [Validators.required]],
		});

		this.idUser = this.authService.getIdFromToken();

		this.userService.getByEmail("thien@gmail.com").subscribe({
			next: (value) => {
				console.log(value);
			},
		});
	}
}
