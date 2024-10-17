import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { BoardComponent } from "./components/board/board.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { BoardDetailComponent } from "./components/board-detail/board-detail.component";

export const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "board",
		component: BoardComponent,
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
