import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit{

  public producto:any ={}
  public token :any = localStorage.getItem('token');
  public id :any
  public load_data = true
  public nueva_variedad = ''
  public url:any;
  public file: File | any = undefined;
  public load_btn :any

  constructor(private _route:ActivatedRoute,private _productoService:ProductoService) {
    this._route.params.subscribe(params=>{
      this.id = params['id'];
      this.init_data()

    })
  }

  ngOnInit(): void {
    this.url = GLOBAL.url
    this.init_data()
  }

  init_data(){
    this._productoService.obtener_producto_admin(this.id,this.token).subscribe(response=>{
      this.producto = response.data

    console.log(this.producto);

  })
  }


  fileChangeEvent(event: any): void {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      console.log(file);

      if (file.size <= 8000000) {
        if (
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/webp' ||
          file.type === 'image/jpg'
        ) {
          this.file = file;
          this.producto.imagen = this.file;

          this.file = file;
        } else {
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe ser una imagen',
          });

        }

      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no puede superar los 4MB',
        });

      }

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen',
      });
    }

    console.log(this.file);
  }

  subir_imagen(){
    if (this.file != undefined) {
      let data ={
        imagen: this.file,
        _id:uuidv4()
      }
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id,data,this.token).subscribe(response=>{
        this.init_data()
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#05B481',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se agrego la imagen a la galeria',
        });
      })


    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe seleccionar una imagen para subir',
      });
    }
  }

  eliminar(id:any){
    this._productoService.eliminar_imagen_galeria_admin(this.id,{_id:id},this.token).subscribe((response) => {
      console.log(response);

      iziToast.show({
        title:'SUCCESS',
        titleColor: '#05B481',
        class:'text-danger',
        position:'topRight',
        message:'Se elimino la imagen'
       })
       $('#delete-'+id).modal('hide')
       $('.modal-backdrop').removeClass('show')
       this.init_data()

    })
  }
}
