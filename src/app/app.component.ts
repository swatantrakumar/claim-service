import { StorageService } from './services/storage-service/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'claim-service';
  constructor(
    private router: Router,
    private storageService:StorageService

  ) {}

  ngOnInit() {
    if(this.storageService.checkIdTokenStatus().status){
      this.router.navigate(['/claim-service']);
    }else{
      this.router.navigate(['/signin']);
    }
  }

}
