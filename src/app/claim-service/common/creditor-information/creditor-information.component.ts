import { Component, Input, OnInit } from '@angular/core';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-creditor-information',
  templateUrl: './creditor-information.component.html',
  styleUrls: ['./creditor-information.component.css']
})
export class CreditorInformationComponent implements OnInit {

  @Input() claim_form:any;
  @Input() selectedForm:string='';
  @Input() creditDetails:boolean=false;

  constructor(
    private modelService:ModelService
  ) { }

  ngOnInit() {
  }

  onlineClaimFormPopUp(id:string){
    this.modelService.open('creditModel',{})
  }



}
