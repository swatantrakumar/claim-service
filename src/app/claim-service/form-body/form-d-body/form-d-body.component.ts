import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-form-d-body',
  templateUrl: './form-d-body.component.html',
  styleUrls: ['./form-d-body.component.css']
})
export class FormDBodyComponent implements OnInit {
  @Input() claim_form:any
  @Input() claimModeByEmployee:boolean=false;


  @Input() downloadFile!:(doc:any) => void;
  @Input() deleteDocument!:(doc:any,index:number,key?:any) => void;
  @Input() idVerificationWindow!: () => void;
  @Input() claimModelPopUp!: () => void;
  @Input() getSelectedFilenameForUpload!:() => void;
  @Input() uploadFile!:(type:any,key?:any) => void;
  @Input() getSelectedFilenameForUploadcustom!:(index:any) => void;
  @Input() setFiles!:(event:any, fileType:string) => void;
  @Input() saveClaimForm!:()=>void;
  @Input() onlineClaimFormPopUp!:(type:any) => void;
  @Input() onlineBankAccount!:() => void;
  @Input() validateKeyDates!:(keyDate:string) => void;
  activecase:any;





  constructor(
    private storageService:StorageService
  ) {
    this.activecase = this.storageService.GetActiveCase();

   }

  ngOnInit() {
  }

  millisecondsToDate(milliseconds: number): string {
    const date = new Date(milliseconds);
    return date.toISOString().slice(0, 10); // Assuming you want yyyy-MM-dd format
  }
  onDateInput(selectedDate: any,fieldName:string) {
    // Check if the selected date is the same as the current date in the model
    const selectedMilliseconds = new Date(selectedDate.value).getTime();
    this.claim_form[fieldName] = selectedMilliseconds;
  }


}
