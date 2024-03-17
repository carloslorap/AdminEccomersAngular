import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {

  public producto:any ={}
  public token :any = localStorage.getItem('token');
  public id :any
  public load_data = true
  public nueva_variedad = ''
  public url:any;

  constructor(private _route:ActivatedRoute,private _productoService:ProductoService) {
    this._route.params.subscribe(params=>{
      this.id = params['id'];
      this._productoService.obtener_producto_admin(this.id,this.token).subscribe(response=>{
          this.producto = response.data

        console.log(this.producto);

      })

    })
  }

  ngOnInit(): void {
    this.url = GLOBAL.url
  }

  agregar_variedad(){
  if (this.nueva_variedad) {
    this.producto.variedades.push({titulo:this.nueva_variedad})
    this.nueva_variedad = ''
  } else {
    iziToast.show({
      title: 'ERROR',
      titleColor: '#FF0000',
      class: 'text-danger',
      position: 'topRight',
      message: 'Complete el campo de variedad',
    });
  }
  }

  eliminar_variedad(idx:any){
    this.producto.variedades.splice(idx,1)
  }

  actualizar(){
    if (this.producto.titulo_variedad) {

      if (this.producto.variedades.length >= 1) {
        //actualizar
        this._productoService.actualizar_producto_variedades_admin(this.id,{
          titulo_variedad:this.producto.titulo_variedad,
          variedades:this.producto.variedades
        },this.token).subscribe(response=>{
          console.log(response);

        })
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se debe agregar al menos una variedad',
        });
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete el campo del titulo de la variedad',
      });
    }
  }

}
