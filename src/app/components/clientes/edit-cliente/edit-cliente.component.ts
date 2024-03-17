import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  public token = localStorage.getItem('token');
  public cliente:any={
    genero: ''
  }
  public id:any
  public load_btn = false
  public load_data = true


  constructor(private _router:ActivatedRoute,private _clienteService:ClienteService,){}

  ngOnInit(): void {
    this._router.params.subscribe(params=>{
      this.id= params['id'];

      this.load_data = true
      this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(response=>{
        if (response.data == undefined) {
          this.cliente = undefined
          this.load_data = false
        } else {
          this.cliente = response.data
          this.load_data = false
        }

      })
    })
  }


  actualizar(){
    this.load_btn = true
    this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(response=>{
      console.log(response);
      iziToast.show({
        title:'SUCCESS',
        titleColor: '#05B481',
        class:'text-danger',
        position:'topRight',
        message:'Se actualizo el cliente'
       })
       this.load_btn = false

    })
  }
}
