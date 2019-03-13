import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
// import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_directives/auth.guard';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AlertService } from './_services/alert.service';
import { LoginComponent } from './login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { MaterialModule } from '../material/material.module';


    

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
    ],
    declarations: [
        // AlertComponent,
        LoginComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: []
})

export class LoginModule { }