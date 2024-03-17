import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css'],
})
export class IndexClienteComponent implements OnInit {
  public token = localStorage.getItem('token')
  public clientes: Array<any> = [];
  public filtro_apellido = '';
  public filtro_correo = '';

  public pageSize =5
  public page = 1;
  public load_data = true

  constructor(private _clienteService: ClienteService) {}

  ngOnInit(): void {
    this.init_data()
  }

  init_data(){

    this._clienteService
    .listar_clientes_filtro_admin(null, null,this.token)
    .subscribe((response) => {
      this.clientes = response.data;
      this.load_data = false;
    });
  }

  filtro(tipo: any) {
    var filtro;

    if (tipo == 'apellidos') {
      filtro = this.filtro_apellido;

    } else if (tipo == 'correo') {
      filtro = this.filtro_correo;

    }
    this.load_data = true;
    this._clienteService
      .listar_clientes_filtro_admin(tipo, filtro,this.token)
      .subscribe((response) => {
        this.clientes = response.data;
        this.load_data = false;
      });
  }



  eliminar(id:any){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe((response) => {
      iziToast.show({
        title:'SUCCESS',
        titleColor: '#05B481',
        class:'text-danger',
        position:'topRight',
        message:'Se elimino el cliente'
       })
       $('#delete-'+id).modal('hide')
       $('.modal-backdrop').removeClass('show')
       this.init_data()

    })
  }







}
