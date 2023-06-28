import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPasswordUser: any = {
    email: '',
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  recoverpassword(recoverPasswordUser: any){
    this.authService.recoverpassword(recoverPasswordUser.email)
  }
}
