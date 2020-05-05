import { AuthService } from './../../_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from './../../_Services/alertify.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true ;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userSer: UserService, private authSer: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.authSer.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl) ;
  }

  updateUser() {
    this.userSer.updateUser(this.authSer.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success("Profile updated Successfully");
      this.editForm.reset(this.user);
    },
    error => {
      this.alertify.error(error);
    });
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
