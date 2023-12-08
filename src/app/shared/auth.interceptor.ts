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
        private storageService: StorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // before sending the request


        const idToken = this.storageService.GetIdToken();
        /* req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') }); */
        if (this.storageService.GetIdTokenStatus() == StorageTokenStatus.ID_TOKEN_ACTIVE) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken) });
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
