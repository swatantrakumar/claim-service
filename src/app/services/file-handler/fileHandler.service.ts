import { Injectable } from '@angular/core';
import { CommonFunctionService } from '../common-function/common-function.service';
import { StorageService } from '../storage-service/storage.service';
import { NotificationService } from '../notify/notification.service';
import { ApiService } from '../api-service/api.service';
import { ModelService } from '../model/model.service';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {

  constructor(
    private commonUtilService:CommonFunctionService,
    private storageService:StorageService,
    private notificationService:NotificationService,
    private apiService:ApiService,
    private modelService:ModelService
  ) { }

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
  getSelectedFilenameForUpload(uploadData:any){
    if(!uploadData || uploadData.length==0){
        return " Choose File ";
    }else if(uploadData.length==1){
        return uploadData[0].fileName;
    }else {
        return uploadData.length + " Files" ;
    }
  }
  uploadFile(claim_form:any,uploadData:any) {
    let activeNode = claim_form.myPath;
    if(uploadData && uploadData.length>0){
        this.modelService.open("WAIT_MODEL",{});
        let newFolder:any={};
        newFolder.parentId = activeNode._id;
        newFolder.parentFolder = activeNode.rollName;
        newFolder.key = activeNode.key;
        newFolder.rollName = activeNode.rollName;
        newFolder.parenteTag = activeNode.eTag;
        newFolder.isFolder = false;
        newFolder.uploadData = uploadData;
        newFolder.notify=true;
        newFolder.uploadData.forEach((data:any) => {
          data.innerBucketPath = activeNode.key+ "/"+data.fileName;
        });
        if(!claim_form.formAttachments){
            claim_form.formAttachments={}
          }
        this.commonUtilService.setClientLog(newFolder);
        this.commonUtilService.setBaseEntity(newFolder);
        var mainCase = this.storageService.GetActiveCase();
        newFolder.caseId = mainCase._id
        newFolder.caseDescription = mainCase.caseName;
        let payload = {
          data : newFolder,
          path : this.commonUtilService.getProjectMode()
        }
        this.apiService.addFileToS3(payload);
    }else{
        this.notificationService.notify('bg-info',"Please select file to upload");
    }
  }
  removeDocument(){

  }


}
