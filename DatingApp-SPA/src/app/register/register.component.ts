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

  constructor(private authServ: AuthService) { }

  ngOnInit() {
  }

  onRegister() {
    this.authServ.register(this.model).subscribe(() => {
      console.log('successfull');
    },
    error => {
      console.log(error) ;
    });
  }

  onCancel() {
    this.cancelRegister.emit(false);
    console.log('cancel');
  }

}
