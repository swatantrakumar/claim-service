import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { StorageService } from '../services/storage-service/storage.service';
import { EnvService } from '../services/env-service/env.service';
import { AuthService } from '../services/api-service/auth-api-service/auth.service';
import { StorageTokenStatus } from './enums/storage-token-status.enum';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private storageService: StorageService,
        private envService:EnvService,
        private authService:AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // before sending the request


        const idToken: string = this.storageService.GetIdToken();
        /* req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') }); */
        if (this.storageService.GetIdTokenStatus() == StorageTokenStatus.ID_TOKEN_ACTIVE) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken) });
        } else if (this.storageService.GetIdTokenStatus() == StorageTokenStatus.ID_TOKEN_EXPIRED) {

            const url = req.url;
            if (!url.startsWith(this.envService.baseUrl('AUTH_SIGNOUT'))) {
                this.authService.SessionExpired();
                return;
            }
        } else if (this.storageService.GetIdTokenStatus() == StorageTokenStatus.ID_TOKEN_NOT_CREATED) {
            const url = req.url;
            if (url.indexOf("/rest/public") != -1) {
                return next.handle(req).pipe(
                    finalize(
                        () => {
                            // this.loaderService.isLoading.next(false);
                        }
                    )
                );
            } else {
                const authUrl = this.envService.getBaseUrl() + "login";
                if (!url.startsWith(authUrl))
                    return;
            }
        }

        return next.handle(req).pipe(
            finalize(
                () => {
                    // this.loaderService.isLoading.next(false);
                }
            )
        );
    }
}
