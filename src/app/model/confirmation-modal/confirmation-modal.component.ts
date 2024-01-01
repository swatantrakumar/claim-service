import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { DataShareService } from 'src/app/services/data-share-service/data-share.service';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() id!: string;
  @Output() alertResponce = new EventEmitter();
  @ViewChild('alertModal') public alertModal!: ModalDirective;

  message:string='';
  alert:boolean=false;


  constructor(
   private modalService : ModelService,
   private dataShareService:DataShareService
  ) { }

  ngOnInit() {
    let modal = this;
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }
      this.modalService.remove(this.id);
      this.modalService.add(this);
  }
  showModal(alert:any){
    this.message = alert.msg;
    this.alertModal.show()
  }

  ok(){
    this.alertModal.hide();
    this.dataShareService.shareConfirmationResponce(true)
    //this.alertResponce.emit(true);
  }

  cancel(){
    this.alertModal.hide();
    this.dataShareService.shareConfirmationResponce(false)
    //this.alertResponce.emit(false);
  }

}
