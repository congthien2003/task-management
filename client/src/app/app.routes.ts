import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { BoardComponent } from "./components/board/board.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
	{
		path: "board/:id",
		component: BoardComponent,
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
