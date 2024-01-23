import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';
import { StorageService } from 'src/app/services/storage-service/storage.service';

@Component({
  selector: 'app-claim-review-approval',
  templateUrl: './claim-review-approval.component.html',
  styleUrls: ['./claim-review-approval.component.css']
})
export class ClaimReviewApprovalComponent implements OnInit {
  @Input() claim_form:any;
  @Input() id!: string;
  @ViewChild('claimReviewModel') public claimReviewModel!: ModalDirective;
  claimStatus:any;
  constructor(
    private modalService : ModelService,
    private storageService:StorageService
  ) {

  }

  ngOnInit() {
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }
    this.modalService.remove(this.id);
    this.modalService.add(this);
  }
  showModal(alert:any){
    this.claimStatus=this.storageService.GetClaimStatus();
    this.claimReviewModel.show();
  }
  close(){
    this.claimReviewModel.hide();
  }

}
