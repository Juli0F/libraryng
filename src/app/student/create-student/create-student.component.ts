import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student, Career, StudentDto } from 'src/models/models';
import { StudentService } from 'src/service/student.service';
import { CareerService } from 'src/service/career.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  @Output() onCreated = new EventEmitter<boolean>();
  @Input() studentToEdit: Student | null = null;
  carnet!: string;

  studentForm: FormGroup;
  careers: Career[] = []; 

  constructor(private studentService: StudentService, 
    private careerService: CareerService,
    private messageService:MessageService
  ) {
    this.studentForm = new FormGroup({
      carnet: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      career: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      status: new FormControl(true) 
    });
  }

  
  ngOnInit(): void {
    this.loadCareers();
    if (this.studentToEdit) {
      this.studentForm.patchValue(this.studentToEdit);
     // this.studentForm.get('career').setValue(this.studentToEdit.career.code); 
    }
  }

  ngOnChanges(changes:SimpleChange){
    if(this.studentToEdit){
      this.studentForm.patchValue(this.studentToEdit);
      this.carnet = this.studentToEdit.carnet;
      const carnetControl = this.studentForm.get('carnet');
      if(carnetControl){
        carnetControl.disable();
      }
      return;
    }
    const carnetControl = this.studentForm.get('carnet');
      if(carnetControl){
        carnetControl.enable();
      }
  }

  loadCareers() {
    this.careerService.getAllCareer().subscribe(data => {
      this.careers = data;
      console.log("data",this.careers)
    });
  }

  onSubmit() {
    let studentDto = new StudentDto();
    //studentDto.career = this.ca
    studentDto.carnet = this.studentForm.value.carnet;
    studentDto.name = this.studentForm.value.name;
    studentDto.birthDate = this.studentForm.value.birthDate;
    studentDto.status = this.studentForm.value.status;
    studentDto.career = this.studentForm.value.career.code
    
    if(this.studentToEdit){
      this.edit(studentDto);
      return;
    }
    this.create(studentDto)
  }
  create(student:StudentDto){
    this.studentService.createStudent(student).subscribe({
      next: data => {
        console.log(data);
        this.onCreated.emit(true);
        this.studentForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Estudiante almacenado correctamente"});
      }, error : e => {
        console.log("error", e)
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
      }
    })
  }

  edit(student:StudentDto){
    this.studentService.updateStudent(this.carnet,student).subscribe({
      next: data => {
        console.log(data);
        this.onCreated.emit(true);
        this.studentForm.reset();
      }, error : e => {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
      }
    })
  }
  
}
