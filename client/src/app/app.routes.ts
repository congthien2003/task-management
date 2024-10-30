import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { BoardComponent } from "./components/board/board.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { BoardDetailComponent } from "./components/board-detail/board-detail.component";
import { authGuard } from "./guard/auth.guard";
import { RegisterComponent } from "./components/register/register.component";
import { UserComponent } from "./components/user/user.component";

export const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "user",
		component: UserComponent,
	},
	{
		path: "board",
		component: BoardComponent,
		canActivate: [authGuard],
		children: [
			{
				path: ":id",
				component: BoardDetailComponent,
			},
		],
	},
	{
		path: "auth",
		children: [
			{
				path: "login",
				component: LoginComponent,
			},
			{
				path: "register",
				component: RegisterComponent,
			},
		],
	},
];
