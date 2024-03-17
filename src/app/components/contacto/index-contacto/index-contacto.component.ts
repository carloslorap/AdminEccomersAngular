import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent implements OnInit {

  public token = localStorage.getItem('token');
  public mensajes: Array<any> = [];
  public load_data = true;
  public pageSize = 5;
  public page = 1;
  public filtro = '';

  constructor(private _adminService: AdminService) {}


  ngOnInit(): void {
    this._adminService.obtener_mesajes_admin(this.token).subscribe(response=>{
      this.mensajes = response.data

    })
  }

}
