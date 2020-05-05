import { AuthService } from './../_Services/auth.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_Services/alertify.service';
import { UserService } from '../_Services/user.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userSer: UserService, private router: Router, private alertify: AlertifyService,
                private authSer: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        console.log(this.authSer.decodedToken.nameid);
        return this.userSer.getUser(this.authSer.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('problem retrieving your data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }  
}
