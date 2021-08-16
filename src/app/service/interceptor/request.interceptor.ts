import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators'
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
const TOKEN_KEY = 'auth-token';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    protected url = 'http://example.com/api';
    protected debug = true;

    constructor(private alertController: AlertController, private storage: Storage) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

       
        // const token = this.authenticationService.getToke()

        return from(this.storage.get("user"))
            .pipe(
                switchMap((user) => {
                    if (user) {
                        let userJSON = JSON.parse(user);
                        let token = userJSON.token.access_token;
                        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
                    }

                    if (!request.headers.has('Content-Type')) {
                        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
                    }
                    return next.handle(request).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                // do nothing for now
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            const status = error.status;
                            const reason = error && error.error.reason ? error.error.reason : '';
                            return throwError(error);
                        })
                    );
                })
            );


    }
}