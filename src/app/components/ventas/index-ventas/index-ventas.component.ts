import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-index-ventas',
  templateUrl: './index-ventas.component.html',
  styleUrls: ['./index-ventas.component.css']
})
export class IndexVentasComponent implements OnInit {

  public token:any = localStorage.getItem('token');
  public desde:any
  public hasta :any
  public ventas :Array<any> =[]
  public pageSize =10
  public page = 1;

  constructor(private _adminService:AdminService){}

  ngOnInit(): void {
    this._adminService.obtener_ventas_admin(this.desde,this.hasta,this.token).subscribe(response=>{
    this.ventas = response.data

    })
  }

  filtrar(){
    this._adminService.obtener_ventas_admin(this.desde,this.hasta,this.token).subscribe(response=>{
      this.ventas = response.data

    })
  }
}
