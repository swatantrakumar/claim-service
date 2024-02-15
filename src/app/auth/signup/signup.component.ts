import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';
import { EnvService } from 'src/app/services/env-service/env.service';
import { CustomvalidationService } from 'src/app/services/customvalidation/customvalidation.service';
import { ModelService } from 'src/app/services/model/model.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private awsCognitoService:AwsCognitoService,
    private customValidationService:CustomvalidationService,
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
  onSignUp() {
    this.modelService.open("WAIT_MODEL",{});
    const payload = this.signUpForm.getRawValue();
    this.Signup(payload);
    //this.awsCognitoService.signup(payload);
    //this.signUpForm.reset();
  }
  Signup(payload:any){
    let api = this.envService.getAuthApi('USER_SIGNUP');
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if(respData && respData['success']){
         this.notificationService.notify("bg-success", "A verification link has been sent to your email account. please click on the link to verify your email and continue the registration process. ");
         this.router.navigate(['/signin']);
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

  initForm() {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$')]),
      'mobile': new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      'password': new FormControl('', [Validators.required]),
      'name': new FormControl('', Validators.required),
    }
    );
  }

}
