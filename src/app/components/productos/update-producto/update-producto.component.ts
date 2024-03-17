import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css'],
})
export class UpdateProductoComponent implements OnInit {
  public token: any = localStorage.getItem('token');
  public producto: any = {};
  public config: any = {};
  public imgSelect: any | ArrayBuffer = '';
  public id: any;
  public url: any;
  public file: File | any = undefined;
  public config_global: any = {};

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
    private _adminervice: AdminService
  ) {
    this.config = {
      height: 500,
    };
    this.url = GLOBAL.url;
    this._adminervice.obtener_config_publico().subscribe((response) => {
      this.config_global = response.data;
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._productoService
        .obtener_producto_admin(this.id, this.token)
        .subscribe((response) => {
          this.producto = response.data;
          this.imgSelect =
            this.url + 'obtener_portada/' + this.producto.portada;
        });
    });
  }

  actualizar() {
    let data: any = {};
    if (this.file != undefined) {
      data.portada = this.file;
    }
    data.titulo = this.producto.titulo;
    data.stock = this.producto.stock;
    data.precio = this.producto.precio;
    data.categoria = this.producto.categoria;
    data.descripcion = this.producto.descripcion;
    data.contenido = this.producto.contenido;

    this._productoService
      .actualizar_producto_admin(this.id, data, this.token)
      .subscribe((response) => {
        console.log(response);

        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#05B481',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se actualizo el producto',
        });
      });
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
          this.producto.portada = this.file;
          const reader = new FileReader();
          reader.onload = (e) => (this.imgSelect = reader.result);
          reader.readAsDataURL(file);
          $('#input-portada').text(file.name);
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
}
