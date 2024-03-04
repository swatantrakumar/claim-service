import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';
import { ModelService } from 'src/app/services/model/model.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EnvService } from 'src/app/services/env-service/env.service';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private awsCognitoService:AwsCognitoService,
    private storageService:StorageService,
    private modelService:ModelService,
    private apiService:ApiService,
    private notificationService:NotificationService,
    private commonFunctionService:CommonFunctionService,
    private http:HttpClient,
    private envService: EnvService,
    private router:Router,

  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      'userId': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required]),
      'type':new FormControl('MCLMN', [Validators.required])
    });
  }
  onSignIn() {
    this.modelService.open("WAIT_MODEL",{});
    const value = this.loginForm.getRawValue();
    let payload ={
      email:value.userId,
      password:value.password
    }
    let type = value.type;
    this.storageService.setProjectModule(type);
    //this.awsCognitoService.sigin(payload);
    this.SignIn(payload);
    this.loginForm.reset();
    this.loginForm.get('type')?.setValue('MCLMN');
  }
  SignIn(payload:any){
    let api = this.envService.getAuthApi('USER_SIGNIN');
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if(respData && respData['success']){
         this.notificationService.notify("bg-success", "Sign In successfull !!!");
          let userInfo = JSON.parse(respData.USER[0]);
          this.storageService.SetUserInfo(userInfo);
          this.storageService.SetIdToken(respData['token']);
          const cognitoExpiresIn = 86400;
          this.storageService.setExpiresIn(cognitoExpiresIn);         
          this.awsCognitoService.handleUserResponceData(respData);
        } else if(respData && respData['error']){
          this.notificationService.notify("bg-danger", respData['error']);
        }
        this.modelService.close("WAIT_MODEL");
      },
      (error)=>{
        this.notificationService.notify("bg-danger", error.message);
        this.modelService.close("WAIT_MODEL");
      }
    )
  }


}
