import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service/api.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { Router } from '@angular/router';
import { EnvService } from 'src/app/services/env-service/env.service';


@Component({
  selector: 'lib-rest-pass',
  templateUrl: './rest-pass.component.html',
  styleUrls: ['./rest-pass.component.css']
})
export class RestPassComponent implements OnInit {
  resetForm!:FormGroup

  constructor(
    private apiService:ApiService,
    private notificationService:NotificationService,
    private commonFunctionService:CommonFunctionService,
    private http:HttpClient,
    private envService: EnvService,
    private router:Router,

  ) { }
  warningMessage="";  
  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.resetForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$')])
    }
    );
  }
  reset(){
    let value = this.resetForm.getRawValue();
    let payload ={
      email:value.email,
    }
    console.log(value);
    this.resetForm.reset();
    this.sendPasswordRestLink(payload);
  }
  sendPasswordRestLink(payload:any){
    let api = this.envService.getAuthApi('FORGET_PASSWORD');
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if(respData && respData['success']){
         this.notificationService.notify("bg-success", "Please check your mail for password reset link !!!");
        } else if(respData && respData['error']){
          this.notificationService.notify("bg-danger", respData['error']);
          this.warningMessage= respData['error'];
        }
      },
      (error)=>{
        this.notificationService.notify("bg-danger", error.message);
      }
    )
  }

}
