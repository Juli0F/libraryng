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
 nombre !: string;
 status !: boolean;
 career !: Career;
 loans !: Loan[];
 reservations !: Reservation[]
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
export class Reservation{
  id !: number;
  reservationDate !: Date;
  status !: string;
}

