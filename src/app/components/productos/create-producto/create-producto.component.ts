import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css'],
})
export class CreateProductoComponent implements OnInit {
  public token: any = localStorage.getItem('token');
  public producto: any = {
    categoria: '',
  };
  public file: File | any = undefined;
  public imgSelect: any = 'assets/img/01.jpg';
  public config: any = {};
  public config_global: any = {};

  constructor(
    private _productoService: ProductoService,
    private _adminervice: AdminService
  ) {
    this.config = {
      height: 500,
    };
    this._adminervice.obtener_config_publico().subscribe((response) => {
      this.config_global = response.data;

    });
  }

  ngOnInit(): void {}

  registro() {
    if (!this.producto.titulo) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese el titulo',
      });
    } else if (!this.producto.stock) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese el stock',
      });
    } else if (!this.producto.precio) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese el precio',
      });
    } else if (!this.producto.categoria) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese la categoria',
      });
    } else if (!this.producto.descripcion) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese la descripcion',
      });
    } else {
      this._productoService
        .registro_producto_admin(this.producto, this.token)
        .subscribe((response) => {
          console.log(response);
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              class: 'text-danger',
              position: 'topRight',
              message: response.message,
            });
          } else {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#05B481',
              class: 'text-danger',
              position: 'topRight',
              message: 'Se creo el producto',
            });
          }
          this.producto = {
            categoria: '',
          };
          this.file = undefined;
          this.imgSelect = 'assets/img/01.jpg';
        });
    }
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
