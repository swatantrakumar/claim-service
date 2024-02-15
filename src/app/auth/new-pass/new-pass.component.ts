import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notify/notification.service';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CommonFunctionService } from 'src/app/services/common-function/common-function.service';
import { EnvService } from 'src/app/services/env-service/env.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  resetNewPass!:FormGroup;
  linkVerified=false;
  user_id="";
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService:NotificationService,
    private commonFunctionService:CommonFunctionService,
    private envService: EnvService,
    private http: HttpClient,

  ) {
    let linkVerified=false; 
    if(activatedRoute.queryParams){
      const index = JSON.stringify(activatedRoute.snapshot.params["key1"]);
      if(index != ''){
        const key1 = activatedRoute.snapshot.params["key1"];
        const key2 = activatedRoute.snapshot.params["key2"];
        const key3 = activatedRoute.snapshot.params["key3"];
        this.user_id=key1;
      const data = {
        "_id":key1,
        "verifCode": key2,
        "masterId" : key3,
      }
      this.verifyResetPasswordLink(data);
    }else{
      this.user_id='';
    }
    }
  }

  ngOnInit() {
    this.initForm();

  }

  verifyResetPasswordLink(payload:any){
    let api = this.envService.getAuthApi('VERIFY_RESET_LINK');
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if(respData && respData['success']){
         this.notificationService.notify("bg-success", "Link Verified !!!");
         this.linkVerified=true;
        } else if(respData && respData['error']){
          this.notificationService.notify("bg-danger", respData['error']);
          this.router.navigate(['/signin']);
        }
      },
      (error)=>{
        this.notificationService.notify("bg-danger", error.message);
        this.router.navigate(['/signin']);
      }
    )
  }
  initForm(){
    this.resetNewPass = new FormGroup({
      'verificationCode': new FormControl('', [Validators.required]),
      'newPassword': new FormControl('', [Validators.required]),
      'confirmPassword': new FormControl('', [Validators.required])
    }
    );
  }
  saveNewPassword(){
    let value = this.resetNewPass.getRawValue();
    console.log(value);
    let payload ={
      _id:this.user_id,
      password:value.newPassword
    }
    if(value.newPassword ==value.confirmPassword){
        this.updatePassword(payload);  
        this.resetNewPass.reset();
    }else{
      this.notificationService.notify("bg-danger", "New Password and Confirm Password do not match");
    }
  }
  updatePassword(payload:any){
    let api = this.envService.getAuthApi('UPDATE_PASSWORD');
    this.http.post(api, payload).subscribe(
      (respData:any) =>{
        if(respData && respData['success']){
         this.notificationService.notify("bg-success", "Password updated successfully !!!");
         this.linkVerified=true;
         this.router.navigate(['/signin']);
        } else if(respData && respData['error']){
          this.notificationService.notify("bg-danger", respData['error']);
        }
      },
      (error)=>{
        this.notificationService.notify("bg-danger", error.message);
      }
    )
  }
}
