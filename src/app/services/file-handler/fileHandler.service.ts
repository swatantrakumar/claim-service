import { Injectable } from '@angular/core';
import { CommonFunctionService } from '../common-function/common-function.service';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {
  rxFiles:any = [];
  rxid:string='';
  activeNode:any='';
  fileName:string='';
  uploadData:any;
constructor(
  private commonUtilService:CommonFunctionService
) { }

setFiles(event:any, fileType:string,claim_form:any,fileTypes:any,uploadData:any) {
  this.activeNode = claim_form.myPath;
  fileTypes[fileType] = [];
  uploadData=[];
  this.rxid = event.target.id;
  var files = event.target.files;
  this.fileName = files[0].name;
  for (var i = 0; i < files.length; i++) {
      var file = files[i];
      this.rxFiles.push(file);
      var reader = new FileReader();
      reader.onload = this.imageIsLoaded;
      reader.readAsDataURL(file);
  }
fileTypes[fileType] = this.commonUtilService.cloneObject(this.rxFiles);
uploadData = this.uploadData;
}
rx:any = {};
imageIsLoaded= (e:any) => {
var rxFile = this.rxFiles[0];
this.rxFiles.splice(0, 1);
this.rx = {};
this.rx.fileData = e.target.result;
this.rx.fileData = this.rx.fileData.split(',')[1];
if (rxFile.name && rxFile.name != '') {
    this.rx.fileName = rxFile.name;
    this.rx.id = this.rxid;
    var splits = this.rx.fileName.split('.');
    this.rx.fileExtn = splits[splits.length-1];
    this.rx.innerBucketPath = this.activeNode.key+ "/"+this.rx.fileName;
} else {
    this.rx.fileName = rxFile.webkitRelativePath;
}
this.rx.size = rxFile.size;
this.uploadData.push(this.rx);

}

getSelectedFilenameForUploadcustom(uploadData:any,fullId:any){
  if(uploadData || uploadData && uploadData.length>0){
    if(uploadData && uploadData.length > 0 && fullId == uploadData[0].id){
        if(!uploadData || uploadData.length==0){
            return " Choose File ";
        }else if(uploadData.length==1){
            return uploadData[0].fileName;
        }else {
            return uploadData.length + " Files" ;
        }

    }
    else{
        return " Choose File "
    }
  }
  else{
      return " Choose File "
  }
}

}
