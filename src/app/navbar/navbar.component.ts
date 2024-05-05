import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  items: MenuItem[] | undefined ;


  ngOnInit(): void {
    this.items = this.MenuItemFactory;
  }

  MenuItemFactory = [
    {
      label: 'Usuarios',
      icon: 'pi pi-fw pi-user',
    },
    {
      label: 'Estudiantes',
      icon: 'pi pi-user',
      routerLink:'student'
    },
    {
      label: 'career',
      icon: 'pi pi-fw pi-pencil',
      routerLink:'career'
    },
    {
      label: 'Libros',
      icon: 'pi pi-fw pi-file',
      //routerLink: 'start-sale',
      items:[
        {
          label: 'Gestion de libros',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['book'],
        },
        {
          label: 'Gestion de precios',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['price'],
        },
        {
          label: 'Gestion de prestamos',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['loan'],
        },
        {
          label: 'Gestion de devoluciones',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['return'],
        },
      ]
    },
    {
      label: 'Reporte',
      icon: 'pi pi-fw pi-file',
      items: [
        { // reporte 1
          label: 'Devoluciones para hoy',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'report-return-today',
        },
        {// reporte 2
          label: 'Prestamos con mora',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'report-defaulters',
        },
        {// reporte 3
          label: 'Recaudacion',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'report-collection',
        },
        {// reporte 4
          label: 'Prestamos por carrera',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'report-loan-career',
        },
        {// reporte 5
          label: 'Moras por estudiante',
          icon: 'pi pi-fw pi-plus',

          routerLink: 'report-defaulters-student',
        },
        { // reporte 6
          label: 'Prestamos por estudiante',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'report-loan-by-student',
        },
        {// reporte 7
          label: 'Prestamos actuales por estudiante',
          icon: 'pi pi-fw pi-plus',
          routerLink: 'report-loan-current-by-student',
        },
        {// reporte 8
          label: 'Libros agotados',
          icon: 'pi pi-fw pi-cash',
          routerLink: 'report-unavailable',
        },
        {// reporte 9
          label: 'Libros nunca prestados',
          icon: 'pi pi-fw pi-cash',
          routerLink: 'report-books-never-loans',
        },
        {// reporte 10
          label: 'Estudiantes sancionados',
          icon: 'pi pi-fw pi-cash',
          routerLink: 'report-sanctioned-students',
        }
      ]
    },
    {
      label: 'Salir',
      icon: 'pi pi-fw pi-power-off',
      routerLink: '/logout',
    },
  ];
}
