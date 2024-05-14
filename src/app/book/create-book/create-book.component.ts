import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Book } from 'src/models/models';
import { BookService } from 'src/service/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {
  @Output() onCreated = new EventEmitter<boolean>();
  @Input() bookToEdit: Book | null = null;
  code !: string;

  bookForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    publicationDate: new FormControl('', Validators.required),
    availableCopies: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private bookService: BookService,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    if (this.bookToEdit) {
      this.bookForm.patchValue(this.bookToEdit);
    }
  } 
  ngOnChanges(changes: SimpleChanges): void {

    const codeControl = this.bookForm.get('code');
    if(this.bookToEdit){
    this.bookForm.patchValue(this.bookToEdit);
    this.code = this.bookToEdit.code;  

      if(codeControl){
        codeControl.disable();
        return;
      }
    }
    codeControl?.enable();

  }
  create(book:Book){
    this.bookService.createBook(book).subscribe({
      next: data => {
       this.onCreated.emit(true);
       this.bookForm.reset(); 
       this.messageService.add({severity:'success',summary:'success',detail:"Libro almacenado correctamente"});
      },error: e => {
        
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
      }
    })
  }

  edit(book:Book){
    this.bookService.updateBook(this.code,book).subscribe({
      next: data => {
       this.onCreated.emit(true);
       this.bookForm.reset(); 
       this.messageService.add({severity:'success',summary:'success',detail:"Libro actualizado correctamente"});
      },error: e => {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
      }
    })
  }
  onSubmit() {
    let book = new Book();
    book.author = this.bookForm.value.author;
    book.availableCopies = this.bookForm.value.availableCopies;
    book.code = this.bookForm.value.code;
    book.publicationDate = this.bookForm.value.publicationDate;
    book.publisher = this.bookForm.value.publisher
    book.title = this.bookForm.value.title;

    if(this.bookToEdit){
      this.edit(book);
      return;
    }
    this.create(book)
  }


  resetForm() {
    this.bookForm.reset({
      availableCopies: 0
    });
  }
}
