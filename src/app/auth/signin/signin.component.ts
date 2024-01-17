import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsCognitoService } from 'src/app/services/aws-cognito/aws-cognito.service';
import { ModelService } from 'src/app/services/model/model.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

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
    private modelService:ModelService
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
    this.awsCognitoService.sigin(payload);
    this.loginForm.reset();
    this.loginForm.get('type')?.setValue('MCLMN');
  }

}
