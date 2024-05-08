import { Component, OnInit } from '@angular/core';
import { Student } from 'src/models/models';
import { StudentService } from 'src/service/student.service';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  students: Student[] = [];
  displayModal = false;
  editStudent: Student | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  showDialog(student?: Student) {
    this.editStudent = student || null;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
    this.loadStudents();
  }

  deleteStudent(student: Student) {
    this.studentService.deleteStudent(student.carnet).subscribe(() => {
      this.loadStudents();
    });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.students = this.students.filter(s => s.name.toLowerCase().includes(value.toLowerCase()));
  }
}
