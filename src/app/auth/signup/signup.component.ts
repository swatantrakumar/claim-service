import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomvalidationService } from 'src/app/services/customvalidation/customvalidation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(
    private customValidationService:CustomvalidationService
  ) { }

  ngOnInit() {
    this.initForm();
  }
  onSignUp() {
    const payload = this.signUpForm.getRawValue();
    console.log(payload);
    this.signUpForm.reset();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$')]),
      'mobileNumber': new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      'password': new FormControl('', [Validators.required, this.customValidationService.patternValidator()]),
      'name': new FormControl('', Validators.required),
    }
    );
  }

}
