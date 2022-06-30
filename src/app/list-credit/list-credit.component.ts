import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { Location } from '@angular/common';
import { credit } from '../../interfaces/credit';

@Component({
  selector: 'app-list-credit',
  templateUrl: './list-credit.component.html',
  styleUrls: ['./list-credit.component.scss']
})
export class ListCreditComponent implements OnInit {
  public creditos: credit[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    this.creditos = [{
      user: '',
      estado: '',
      value: 0,
      date: '',
      email: ''
    }];
  }

  ngOnInit(): void {
    this.getLista();
  }

  getLista() {
    const email = this.authService.email;
    this.authService.getCredit().subscribe(creds => {
      console.log('creditos111', creds);
      for (let credi of creds) {
        if( credi.email === email){
          this.creditos.push(credi);
        };
      }
    })
  }

  public goBack() {
    this.location.back();
  }
}
