import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { credit } from '../../interfaces/credit';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {
  public credit: credit = {
    user: '',
    estado: '',
    value: 0,
    date: '',
    email:''
  }

  public fechCredt = '';
  public propiet = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { 
    this.propiet = this.authService.email
  }

  ngOnInit(): void {
  }

  async sendCredit() {
    const fechIni = moment(this.credit.date).format('YYYY-MM-DD');
    this.fechCredt = fechIni.toString();
    var validaCredi = Math.random() < 0.5;
    const cred: credit = {
      user: this.credit.user,
      estado: '',
      value: this.credit.value,
      date: this.fechCredt,
      email: this.propiet 
    }
    const valor = cred.value!;
    //Validacion si precio se encuentra dentro de rango
    if (valor >= 10000 && valor <= 100000) {
      //Validacion si el credito fu aprobado
      if (validaCredi === true) {
        cred.estado = 'Aprobado';
        Swal.fire(
          'Felicidades',
          'El sistema ha dedicidio que su credito ha sido aprobado',
          'success'
        );
        const response = await this.authService.addCredit(cred);
        this.router.navigate(['/home']);
      } else {
        cred.estado = 'Desaprobado';
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: 'El sistema determino que su credito fue Desaprobado',
        });
        const response = await this.authService.addCredit(cred);
        this.router.navigate(['/home']);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: 'El valor solcitado no sencuentra dentro del rango de entre $10.000 - $100.000 porfavor no utilice puntos',
      })
    }
    console.log('credito escogio', cred);
  }

  public goBack(){
    this.location.back();
  }

}
