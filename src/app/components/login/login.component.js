import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
export class LoginComponent {
    constructor(authService) {
        this.authService = authService;
    }
    ngOnInit() { }
    onSignIn() {
        this.authService.login();
    }
}
LoginComponent.decorators = [
    { type: Component, args: [{
                selector: 'login',
                templateUrl: 'login.component.html'
            },] },
];
/** @nocollapse */
LoginComponent.ctorParameters = () => [
    { type: AuthService }
];
