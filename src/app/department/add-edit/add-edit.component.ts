import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  constructor(private sharedService: SharedService) { }

  @Input() dep: any;
  DepartmentId: string;
  DepartmentName: string;

  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName;
  }

  addDepartment() {
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.sharedService.addDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

  updateDepartment() {
    var val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName
    };
    this.sharedService.updateDepartment(val).subscribe(res => {
      alert(res.toString());
    });
  }

}
