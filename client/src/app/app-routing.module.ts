import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages/pages.component";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () =>
			import("./@auth/auth.module").then((m) => m.AuthModule),
	},
	{
		path: "p",
		component: PagesComponent,
		loadChildren: () =>
			import("./pages/pages.module").then((m) => m.PagesModule),
	},
	{ path: "", redirectTo: "p", pathMatch: "full" },
	{ path: "**", redirectTo: "p" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
