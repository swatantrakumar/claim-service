import { DOCUMENT } from '@angular/common';
import { StorageService } from './services/storage-service/storage.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { privateDecrypt } from 'crypto';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'claim-service';
  constructor(
    private router: Router,
    private storageService:StorageService,
    private awsCognitoService:AwsCognitoService,
    @Inject(DOCUMENT) private document: Document,

  ) {}

  ngOnInit() {
    if(this.storageService.checkIdTokenStatus().status){
      this.awsCognitoService.redirectAccordingToModule();
      //this.router.navigate(['/claim-service']);
    }else{
      let locaion=this.document.location;
      console.log(locaion);
      let publicUrls = "#/new-pass";      
     if(!locaion.hash.startsWith(publicUrls)){
        this.router.navigate(['/signin']);
     }
    }
  }

}
