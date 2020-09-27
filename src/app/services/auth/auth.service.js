var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
export class AuthService {
    constructor(router, httpClient) {
        this.router = router;
        this.httpClient = httpClient;
        gapi.load('auth2', function () {
            gapi.auth2.init();
        });
    }
    /**
     *
     * @param id_token
     *
     * Set IDP id_token and aws credentials here
     */
    setCredentials(id_token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let options = {
                    headers: {
                        Authorization: id_token
                    }
                };
                let endpoint = API_ROOT + STAGE + '/auth';
                let credentials = yield this.httpClient.get(endpoint, options).toPromise();
                localStorage.setItem('id_token', id_token);
                localStorage.setItem('aws', JSON.stringify(credentials));
                return;
            }
            catch (err) {
                localStorage.removeItem('id_token');
                localStorage.removeItem('aws');
                throw err;
            }
        });
    }
    getCredentials() {
        return localStorage.getItem('aws');
    }
    getIdToken() {
        return localStorage.getItem('id_token');
    }
    /**
     * In addition to AWS credentials expiring after a given amount of time,
     * the login token from the identity provider will also expire.
     * Once this token expires, it will not be usable to refresh AWS credentials,
     * and another token will be needed. The SDK does not manage refreshing of the token value
     */
    isLoggedIn() {
        return __awaiter(this, void 0, void 0, function* () {
            let id_token = this.getIdToken();
            if (id_token) {
                let endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;
                try {
                    return yield this.httpClient.get(endpoint).toPromise();
                }
                catch (err) {
                    throw err;
                }
            }
            else {
                throw new Error("No token found");
            }
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            let googleAuth = yield gapi.auth2.getAuthInstance();
            let googleUser = yield googleAuth.signIn({ scope: 'profile email' });
            let id_token = googleUser.getAuthResponse().id_token;
            yield this.setCredentials(id_token);
            this.router.navigate(['']).then(() => {
                window.location.reload();
            });
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            var googleAuth = gapi.auth2.getAuthInstance();
            yield googleAuth.signOut();
            localStorage.removeItem('id_token');
            localStorage.removeItem('aws');
            this.router.navigate(['login']);
        });
    }
}
AuthService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: Router },
    { type: HttpClient }
];
