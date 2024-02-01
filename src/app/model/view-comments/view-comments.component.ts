import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})
export class ViewCommentsComponent implements OnInit {

  @Input() claim_form:any;
  @Input() id: string ='';
  @Output() commetModelResponce = new EventEmitter();


  @ViewChild('claimSubmiteModel') public claimSubmiteModel!: ModalDirective;
  pageTitle:string="";


  constructor(
    private modelService:ModelService
  ) {

  }

  ngOnInit() {
    if (!this.id) {
        console.error('modal must have an id');
        return;
    }
    this.modelService.remove(this.id);
    this.modelService.add(this);
  }
  showModal(alert:any){
    this.claimSubmiteModel.show();
  }
  close(){
    this.claimSubmiteModel.hide();
  }
  uploadFile(){
    this.commetModelResponce.next('upload');
    this.close();
  }




}
