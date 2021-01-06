import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private sharedService: SharedService, private modalService: NgbModal) { }

  EmployeeList : any = [];
  ModalTitle : string;
  ActivateAddEditEmpComp : boolean = false;
  emp : any;
  EmployeeIdFilter:string="";
  EmployeeNameFilter:string="";
  EmployeeDepartmentFilter:string="";
  EmployeeDateFilter:string="";
  EmployeeListWithoutFilter:any=[];

  ngOnInit(): void {
    this.refreshEmpList();
  }

  closeClick(){
    this.modalService.dismissAll();
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.sharedService.getEmpList().subscribe(data =>{
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter = data;
    });
  }

  edit(content, item){
    this.modalService.open(content, { size: 'lg', centered: true })
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', centered: true })
    
    this.emp = {
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"default.jpg"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item){
    if(confirm("Are you sure?")){
      this.sharedService.deleteEmployee(item.EmployeeId).subscribe(data=>{
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  filterFn(){
    var EmployeeIdFilter = this.EmployeeIdFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var EmployeeDepartmentFilter = this.EmployeeDepartmentFilter;
    var EmployeeDateFilter = this.EmployeeDateFilter;

    this.EmployeeList = this.EmployeeListWithoutFilter.filter((el) =>{
      return el.EmployeeId.toString().toLowerCase().includes(
        EmployeeIdFilter.toString().trim().toLowerCase()
      ) && 
      el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      ) && 
      el.Department.toString().toLowerCase().includes(
        EmployeeDepartmentFilter.toString().trim().toLowerCase()
      ) && 
      el.DateOfJoining.toString().toLowerCase().includes(
        EmployeeDateFilter.toString().trim().toLowerCase()
      )
    })
  }

  sortResult(property, filter){
    this.EmployeeList = this.EmployeeListWithoutFilter.sort((a,b) => {
      if(filter){
        return (a[property]>b[property])?1 : ((a[property]<b[property]) ?-1:0);
      } else {
        return (b[property]>a[property])?1 : ((b[property]<a[property]) ?-1 :0);
      }
    })
    
  }

}
