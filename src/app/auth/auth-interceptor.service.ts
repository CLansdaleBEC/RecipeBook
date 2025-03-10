import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // take operatore only takes one user and then unsubscribes
    // because we don't want an ongoing subscription

    // exhaustMap waits for first observable to complete, then gives us
    // the user and then relaces it with the inner observable


    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
            return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
