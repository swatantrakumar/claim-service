import { StorageService } from './services/storage-service/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private awsCognitoService:AwsCognitoService

  ) {}

  ngOnInit() {
    if(this.storageService.checkIdTokenStatus().status){
      this.awsCognitoService.redirectAccordingToModule();
      //this.router.navigate(['/claim-service']);
    }else{
      this.router.navigate(['/signin']);
    }
  }

}
