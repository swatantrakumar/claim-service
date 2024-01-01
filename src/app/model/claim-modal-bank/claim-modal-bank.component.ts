import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-claim-modal-bank',
  templateUrl: './claim-modal-bank.component.html',
  styleUrls: ['./claim-modal-bank.component.css']
})
export class ClaimModalBankComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @ViewChild('claimBankModel') public claimBankModel!: ModalDirective;

  constructor(
    private modelService:ModelService,
  ) { }

  ngOnInit() {
    let modal = this;
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }
    this.modelService.remove(this.id);
    this.modelService.add(this);
  }
  showModal(){
    this.claimBankModel.show();
  }
  close(){
    this.claimBankModel.hide();
  }

}
