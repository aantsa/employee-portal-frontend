import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private sharedService: SharedService, private modalService: NgbModal) { }

  DepartmentList : any = [];
  ModalTitle : string;
  ActivateAddEditDepComp : boolean = false;
  dep : any;
  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmnentListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  closeClick(){
    this.modalService.dismissAll();
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  refreshDepList(){
    this.sharedService.getDepList().subscribe(data =>{
      this.DepartmentList = data;
      this.DepartmnentListWithoutFilter = data;
    });
  }

  edit(content, item){
    this.modalService.open(content, { size: 'lg', centered: true })
    this.dep = item;
    this.ModalTitle = "Edit Department";
    this.ActivateAddEditDepComp = true;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', centered: true })
    
    this.dep = {
      DepartmentId:0,
      DepartmentName:""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item){
    if(confirm("Are you sure?")){
      this.sharedService.deleteDepartment(item.DepartmentId).subscribe(data=>{
        alert(data.toString());
        this.refreshDepList();
      })
    }
  }

  filterFn(){
    var DepartmentIdFilter = this.DepartmentIdFilter;
    var DepartmentNameFilter = this.DepartmentNameFilter;

    this.DepartmentList = this.DepartmnentListWithoutFilter.filter((el) =>{
      return el.DepartmentId.toString().toLowerCase().includes(
        DepartmentIdFilter.toString().trim().toLowerCase()
      ) && 
      el.DepartmentName.toString().toLowerCase().includes(
        DepartmentNameFilter.toString().trim().toLowerCase()
      )
    })
  }

  sortResult(property, filter){
    this.DepartmentList = this.DepartmnentListWithoutFilter.sort((a,b) => {
      if(filter){
        return (a[property]>b[property])?1 : ((a[property]<b[property]) ?-1:0);
      } else {
        return (b[property]>a[property])?1 : ((b[property]<a[property]) ?-1 :0);
      }
    })
    
  }

}
