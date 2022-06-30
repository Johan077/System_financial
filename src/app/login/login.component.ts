import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public useRegist = {
    name: '',
    email: '',
    password: '',
  }
  public user = {
    email: '',
    password: '',
  }
  public log = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.log = false;
  }

  /* metodo de ingresar login */
  ingresar() {
    this.authService.login(this.user.email, this.user.password).then(res => {
      if( res === null){
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'Usuario o contraseña invalido',
        })
      }else{
        console.log('usuario ingresado con exito', res);
        this.authService.email = this.user.email;
        console.log('email ingresad',this.authService.email);
        this.validaLog();
      }
    }).catch(err => {
      console.log('usuario no pudo ser Ingresado', err);
    })
  }

  /* metodo de registrar usuario */
  register() {
    this.authService.register(this.useRegist.email, this.useRegist.password).then(res => {
      this.log = false;
      console.log('usuario registrado con exito', res);
    }).catch(err => {
      console.log('usuario no pudo ser registrado', err);
    })
  }

  /* metodo de registrar con Google */
  google() {
    this.authService.google(this.user.email, this.useRegist.password).then(res => {
      console.log('usuario ingresado con exito', res);
      this.authService.email = res?.user?.email!;
      console.log('email ingresad',this.authService.email);
      this.validaLog();
    }).catch(err => {
      console.log('usuario no pudo ser Ingresado', err);
    })
  }

  /*Validacion logeo Usuario */
  validaLog() {
    this.authService.getLogged().subscribe(res => {
      this.router.navigate(['/home']);
    })
  }

}