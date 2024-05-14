import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Career } from 'src/models/models';
import { CareerService } from 'src/service/career.service';

@Component({
  selector: 'app-create-career',
  templateUrl: './create-career.component.html',
  styleUrls: ['./create-career.component.css']
})
export class CreateCareerComponent implements OnInit  {

  @Output() onCreated = new EventEmitter<boolean>();
  @Input() careerToEdit!: Career | null;
  editCode!: string;

  careerForm = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    status: new FormControl(true)
  });

  constructor(private careerService: CareerService,
    private messageService: MessageService
  ){}
  
  ngOnInit(): void {
    this.careerForm.setValue({
      code: '',
      name: '',
      status: false
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ( this.careerToEdit) {
      this.careerForm.patchValue(this.careerToEdit);
      this.editCode = this.careerToEdit.code;
      const codeControl = this.careerForm.get('code');
      if (codeControl) {
        codeControl.disable();
      }
      return;
    }
    const codeControl = this.careerForm.get('code');
      if (codeControl) {
        codeControl.enable();
      }
  }
  onSubmit() {
    let career = new Career();
    career.code = this.careerForm.value.code?this.careerForm.value.code:"";
    career.name = this.careerForm.value.name?this.careerForm.value.name:"";
    if(this.careerToEdit) {
      this.edit(career);
      return;
    }
    this.create(career);

  }
  create(career:Career) {
    this.careerService.createCareer(career).subscribe({
      next: (data) => {
        this.onCreated.emit(true);
        this.careerForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Carrera almacenada correctamente"});
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }

    });
  }
  edit(career:Career) {
    this.careerService.updateCareer(this.editCode,career).subscribe({
      next: (data) => {
        this.onCreated.emit(true);
        this.careerForm.reset();
        this.messageService.add({severity:'success',summary:'success',detail:"Carrera almacenada correctamente"});
      },
      error: (err) => {
        this.messageService.add({severity:'error',summary:'Error',detail:err.error});
      }
    })
  }
}
