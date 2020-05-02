import { User } from '../../_models/user';
import { AlertifyService } from '../../_Services/alertify.service';
import { UserService } from '../../_Services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  // loadUsers() {
  //   this.userSer.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   },
  //   error => {
  //     this.alertify.error(error);
  //   });
  // }

}
