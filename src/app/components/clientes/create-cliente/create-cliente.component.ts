import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast:any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit{

  public token = localStorage.getItem('token')
  public cliente:any={
    genero: ''
  }
  public load_btn = false

  constructor(private _clienteService: ClienteService) {

  }

  ngOnInit(): void {

  }


  registro(){
    if (!this.cliente.nombres) {
      iziToast.show({
        title:'ERROR',
        titleColor: '#FF0000',
        class:'text-danger',
        position:'topRight',
        message:'Ingrese el nombre'
       })
    }else if(!this.cliente.apellidos){
     iziToast.show({
      title:'ERROR',
      titleColor: '#FF0000',
      class:'text-danger',
      position:'topRight',
      message:'Ingrese el apellido'
     })
    }else if(!this.cliente.email){
      iziToast.show({
       title:'ERROR',
       titleColor: '#FF0000',
       class:'text-danger',
       position:'topRight',
       message:'Ingrese el email'
      })
    }else if(!this.cliente.telefono){
      iziToast.show({
       title:'ERROR',
       titleColor: '#FF0000',
       class:'text-danger',
       position:'topRight',
       message:'Ingrese el telefono'
      })
    }else if(!this.cliente.dni){
      iziToast.show({
       title:'ERROR',
       titleColor: '#FF0000',
       class:'text-danger',
       position:'topRight',
       message:'Ingrese el dni'
      })
    }else if(!this.cliente.genero){
      iziToast.show({
       title:'ERROR',
       titleColor: '#FF0000',
       class:'text-danger',
       position:'topRight',
       message:'Ingrese el genero'
      })
     }else{
      let cliente={
        nombres:this.cliente.nombres,
        apellidos:this.cliente.apellidos,
        email:this.cliente.email,
        telefono:this.cliente.telefono,
        f_nacimiento:this.cliente.f_nacimiento,
        dni:this.cliente.dni,
        genero:this.cliente.genero,

      }
      this.load_btn = true
      this._clienteService.registro_cliente_admin(cliente,this.token).subscribe(response=>{
        console.log(response.data);
        if (response.data == undefined) {
          iziToast.show({
            title:'ERROR',
            titleColor: '#FF0000',
            class:'text-danger',
            position:'topRight',
            message: response.message
           })
        } else {
          iziToast.show({
            title:'SUCCESS',
            titleColor: '#05B481',
            class:'text-danger',
            position:'topRight',
            message:'Se registro el cliente'
           })
          }
          this.load_btn = false
           this.cliente={
            nombres: '',
            apellidos: '',
            email: '',
            f_nacimiento: '',
            telefono: '',
            genero: '',
            dni: ''
           }
      })


     }

  }
}
