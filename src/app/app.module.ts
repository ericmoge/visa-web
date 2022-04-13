import {FullscreenOverlayContainer, OverlayContainer} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import {AuthenticationGuard, CoreModule} from '@core';
import {NotfoundComponent} from '@shared';
import {UserModule} from '@user';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeGB from '@angular/common/locales/en-GB';

registerLocaleData(localeGB);

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        CoreModule,
        CommonModule,
        UserModule,
        RouterModule.forRoot([
            {
                path: 'admin',
                canActivate: [AuthenticationGuard],
                data: {roles: ['ADMIN']},
                loadChildren: () => import(`./admin/admin.module`).then((m) => m.AdminModule),
            },
            {
                canActivate: [AuthenticationGuard],
                data: {roles: ['IT_SUPPORT', 'INSTRUMENT_CONTROL', 'INSTRUMENT_SCIENTIST']},
                path: 'support',
                loadChildren: () => import(`./support/support.module`).then((m) => m.SupportModule),
            },
            {
                canActivate: [AuthenticationGuard],
                path: 'help',
                loadChildren: () => import(`./documentation/documentation.module`).then((m) => m.DocumentationModule),
            },
            {
                path: '**', component: NotfoundComponent,
            },
        ]),
    ],
    providers: [
        {provide: OverlayContainer, useClass: FullscreenOverlayContainer},
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose: true, hasBackdrop: true}},
        {provide: LOCALE_ID, useValue: 'en-GB'},
        CookieService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
