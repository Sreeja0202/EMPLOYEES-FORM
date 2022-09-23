import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms'
import { FormBuilder, Validators } from '@angular/forms'
import { Employee } from '../employee.model';
import { EmployeeserviceService } from '../employeeservice.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;

  employees: Employee[];

  constructor(private fb: FormBuilder, private empService: EmployeeserviceService ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id:'',
      ename: ['',[Validators.required, Validators.pattern("^[A-Za-z]+[. ]?[A-Za-z .]*")]],
      eposition: ['',[Validators.required]],
      elocation: ['',[Validators.required]],
      esalary: ['',[Validators.required, Validators.pattern("^[1-9][0-9]+")]]
    })
  }

  getEmployees()
  {
    this.empService.getEmployeeList().subscribe((res: Employee[])=>
    {
      console.log(res);
      this.employees = res;
    })
  }

  onEditEmployee(emp: Employee)
  {
    this.editMode = true;
    this.showModal = true;
    this.empForm.patchValue(emp);
  }

  onEmpSubmit()
  {
    if(this.empForm.valid)
    {
    if(this.editMode){
      this.empService.updateEmployee(this.empForm.value).subscribe(
        res=>
        {
          this.getEmployees();
          this.onCloseModal();
          alert("Employee Details successfully added!!!");
        },
        err =>{
          console.log(err);
        })
    }
    else
    {
      this.empService.addEmployee(this.empForm.value).subscribe(
        res=>
        {
          this.getEmployees();
          this.onCloseModal();
          alert("Employee Details successfully added!!!");
        },
        err =>{
          console.log(err);
        })
    }

    }
  }

  onAddEmployee()
  {
    this.showModal = true;
  }

  onCloseModal()
  {
    this.showModal = false;
  }

  onDeleteEmployee(id: any)
  {
    if(confirm("Are you sure you want to delete this employee?")){
      this.empService.deleteEmployee(id).subscribe(
        res=>
        {
          console.log(res);
          this.getEmployees();
        },
        err=>
        {
          console.log(err);
        }
      )
    }
  }


}
