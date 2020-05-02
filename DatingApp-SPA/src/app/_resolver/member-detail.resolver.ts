import { Observable, of } from 'rxjs';
import { AlertifyService } from './../_Services/alertify.service';
import { UserService } from './../_Services/user.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userSer: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userSer.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    } 
}