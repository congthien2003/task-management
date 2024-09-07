import { RouterModule, Routes, RouterOutlet } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "../@auth/guards/auth.guard";
import { UserComponent } from "./user/user.component";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { OverviewProjectComponent } from "../components/overview-project/overview-project.component";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
		children: [
			{
				path: ":id",
				component: OverviewProjectComponent,
			},
		],
	},
	{
		path: "create",
		component: CreateProjectComponent,
		canActivate: [authGuard],
	},
	{
		path: "user",
		component: UserComponent,
		canActivate: [authGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {}
