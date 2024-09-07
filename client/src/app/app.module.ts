import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { ToastrModule } from "ngx-toastr";
import { CommonModule, registerLocaleData } from "@angular/common";
import { TokenInterceptor } from "./core/interceptors/token.interceptor";
import { LoadingInterceptor } from "./core/interceptors/loading.interceptor";
import en from "@angular/common/locales/en";
import { FormsModule } from "@angular/forms";

import { NzConfig, NZ_CONFIG } from "ng-zorro-antd/core/config";
import { OverviewProjectComponent } from "./components/overview-project/overview-project.component";

const ngZorroConfig: NzConfig = {
	theme: {
		primaryColor: "#4caf50",
	},
};

registerLocaleData(en);
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		BrowserAnimationsModule,
		HttpClientModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: "toast-top-right",
			preventDuplicates: true,
		}),
		FormsModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoadingInterceptor,
			multi: true,
		},
		{ provide: NZ_CONFIG, useValue: ngZorroConfig },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
