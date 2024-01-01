import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-claim-employe',
  templateUrl: './claim-employe.component.html',
  styleUrls: ['./claim-employe.component.css']
})
export class ClaimEmployeComponent implements OnInit {

  @Input() claim_form:any;
  @Input() claimObj:any;
  @Input() claimDetails:any;
  @Input() id: string ='';
  @ViewChild('claimEmployeModel') public claimEmployeModel!: ModalDirective;

  claimTypes:any=[];

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
    this.claimEmployeModel.show();
  }
  close(){
    this.claimEmployeModel.hide();
  }

}
