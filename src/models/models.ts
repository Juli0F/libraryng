export class Book{
  code !: string;
  title !: string;
  author !: string;
  publisher !: string;
  publicationDate !: Date;
  availableCopies !: number;
  loans !: Loan[];
  reservations !: Reservation[];
}
export class Student{
 carnet !: string;
 name !: string;
 status !: boolean;
 career !: Career;
 loans !: Loan[];
 reservations !: Reservation[]
}
export class StudentDto{
  carnet !: string;
  name !: string;
  birthDate !: Date;
  status !: boolean;
  career !: string;
}
export class Career {
  code !: string;
  name !: string;
  status !: boolean;
}
export class Loan {
  id !: number;
  loanDate !: Date;
  returnDate !: Date;
  status !: string;
  totalDue !: number;
}
export class LoanResponseDto{
  id !: number;
  carnet !: string;
  loanDate !: Date;
  returnDate !: Date;
  status !: string;
  totalDue !: number;
  bookCode !: string;
}
export class Reservation{
  id !: number;
  reservationDate !: Date;
  status !: string;
}

export class LoanRequest {
  id !: number;
  loanDate !: Date;
  returnDate !: Date;
  status !: string;
  totalDue !: number;
  carnet !: String;
  bookCode !: String;
}
