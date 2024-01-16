import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-form-b-body',
  templateUrl: './form-b-body.component.html',
  styleUrls: ['./form-b-body.component.css']
})
export class FormBBodyComponent implements OnInit {
  @Input() claim_form:any


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

  activecase:any;





  constructor(
    private storageService:StorageService
  ) {
    this.activecase = this.storageService.GetActiveCase();

   }

  ngOnInit() {
  }
}
