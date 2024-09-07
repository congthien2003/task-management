import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { UserComponent } from "./user/user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateProjectComponent } from "./create-project/create-project.component";

// Import Nz
import { NzTableModule } from "ng-zorro-antd/table";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { OverviewProjectComponent } from "../components/overview-project/overview-project.component";

const NZModuleImport = [
	NzTableModule,
	NzButtonModule,
	NzLayoutModule,
	NzMenuModule,
];

@NgModule({
	declarations: [
		HomeComponent,
		HeaderComponent,
		FooterComponent,
		PagesComponent,
		UserComponent,
		CreateProjectComponent,
		OverviewProjectComponent,
	],
	imports: [
		CommonModule,
		PagesRoutingModule,
		ReactiveFormsModule,
		NZModuleImport,
	],
})
export class PagesModule {}
