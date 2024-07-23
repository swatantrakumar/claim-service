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
    let locaion=this.document.location;
    if(this.storageService.checkIdTokenStatus().status){
      if(locaion.hash.startsWith("#/") && !locaion.hash.startsWith("#/signin")){
        this.storageService.setCaseCode(location.hash.replace("#/",""));
      }
      this.awsCognitoService.redirectAccordingToModule();
      //this.router.navigate(['/claim-service']);
    }else{
     // let locaion=this.document.location;
 //     console.log(locaion);
      let publicUrls = "#/new-pass";      
     if(!locaion.hash.startsWith(publicUrls)){
        if(locaion.hash.startsWith("#/") && !locaion.hash.startsWith("#/signin")){
          this.storageService.setCaseCode(location.hash.replace("#/",""));
        }
        this.router.navigate(['/signin']);
     }
    }
  }

}
