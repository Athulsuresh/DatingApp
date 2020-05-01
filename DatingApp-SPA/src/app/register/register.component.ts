import { AlertifyService } from './../_Services/alertify.service';
import { AuthService } from './../_Services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authServ: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  onRegister() {
    this.authServ.register(this.model).subscribe(() => {
      this.alertify.success('Registration Successful');
    },
    error => {
      this.alertify.error(error);
    });
  }

  onCancel() {
    this.cancelRegister.emit(false);
  }

}
