import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ModelService } from 'src/app/services/model/model.service';

@Component({
  selector: 'app-file-type-cell-rendrer-framework',
  template: `<div class="text-center" (click)="handleClick()" [innerHTML]="value"></div>`,
  //templateUrl: './file-type-cell-rendrer-framework.component.html',
  //styleUrls: ['./file-type-cell-rendrer-framework.component.css']
})
export class FileTypeCellRendrerFrameworkComponent  implements ICellRendererAngularComp  {
  constructor(
    private modelService:ModelService
  ){

  }
  value: any;
  data:any;
  fieldName:String | undefined;

  agInit(params: any): void {
    if(params && params.value && params.value.length > 0){
      this.value = '<img style="width: 20px;height: 20px !important;" src="./assets/img/folder.png">';
      this.data = params.data;
    }else{
      this.value = "--";
    }
    this.fieldName = params.colDef.field;
  }

  handleClick() {
    let object = {
      type : "",
      fieldName : this.fieldName,
      title:'Documents'
    }
    this.modelService.open('SUBMITE_MODEL',object);
  }

  refresh(): boolean {
    return false;
  }

}
