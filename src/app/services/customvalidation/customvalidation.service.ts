import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DataShareService } from '../data-share-service/data-share.service';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  constructor(
    private dataShareService:DataShareService
  ) { }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null!;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[~!@#$%^&*?.=()-+])(?=.*?[0-9]).{8,}$');
      let valid = regex.test(control.value);
      let msg = "Minimum 8 characters";
      if(!valid){
        //let checkNo = new RegExp('^(?=.*?[0-9])$').test(control.value);
        if(!new RegExp('[0-9]').test(control.value)){
          msg = "At least one number";
        }else if(!new RegExp('[A-Z]').test(control.value)){
          msg = "At least one uppercase letter";
        }else if(!new RegExp('[~!@#$%^&*?.=()-+]').test(control.value)){
          msg = "At least one special character";
        }else if(!new RegExp('[a-z]').test(control.value)){
          msg = "At least one lowercase letter";
        }else{
          msg = "Minimum 8 characters";
        }
      }else if(this.checkCommonPassword(control.value)){
        valid = false
        msg = "Common Passwords are not allowed";
      }
      return valid ? null! : { invalidPassword: msg };
    };
  }
  checkCommonPassword(value:string){
    let check = false;
    let commonPasswordList = ['Test@123','Test@12345'];
    for (let index = 0; index < commonPasswordList.length; index++) {
      const element = commonPasswordList[index];
      if(element === value){
        check = true;
        break;
      }
    }
    return check;
  }
  checkDates(endDate: string, startDate: string) {
    return (formGroup: FormGroup) => {
      const startDateControl = formGroup.controls[startDate];
      const endDateControl = formGroup.controls[endDate];
      const date1 =new Date(startDateControl.value);
      const date2 =new Date(endDateControl.value);
      if(date1 > date2) {
        endDateControl.setErrors({ notValid: true });
      }else{
        endDateControl.setErrors(null);
      }
    }
 }

  MatchPassword(password: any, confirmPassword: any) {
    return (formGroup: FormGroup):any => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return (UserList.indexOf(userName) > -1);
  }
  checkLimit(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        return null;
    };
  }

  // GSTIN Regex validation result
  validatePattern(gstin:any) {
    // eslint-disable-next-line max-len
    // var gstinRegexPattern = /^([0-2][0-9]|[3][0-8])[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z][A-Z0-9][Z][A-Z0-9]$/;
    const regex = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
    const valid = regex.test(gstin);
    return valid;
    //return gstinRegexPattern.test(gstin);
  }
  isValidData(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise(resolve => {
      setTimeout(() => {
          let data = control.value;
          if (data == "" || data == null || data == undefined) {
            resolve( null );
          }else if(typeof data == 'object'){
            resolve(null);
          }else{
            resolve({ invaliData: true });
          }
        }, 1000);
      });
  }

}
