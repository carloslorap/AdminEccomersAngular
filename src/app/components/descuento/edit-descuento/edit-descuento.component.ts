import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css']
})
export class EditDescuentoComponent implements OnInit {

  public token: any = localStorage.getItem('token');
  public descuento: any = {};
  public file: File | any = undefined;
  public config: any = {};
  public id :any
  public config_global: any = {};
  public imgSelect: any | ArrayBuffer = '';
  public url: any;

  constructor(
    private _route: ActivatedRoute,
    private _descuentoService: DescuentoService,
    private _adminervice: AdminService
  ) {
    this.url = GLOBAL.url;
    this.config = {
      height: 500,
    }
  }


  ngOnInit(): void {

    this._adminervice.obtener_config_publico().subscribe((response) => {
      this.config_global = response.data;

    });


    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this._descuentoService
        .obtener_descuento_admin(this.id, this.token)
        .subscribe((response) => {
          this.descuento = response.data;
          this.imgSelect =
            this.url + 'obtener_banner_descuento/' + this.descuento.banner;
        });
    });
  }

  actualizar() {
    let data: any = {};
    if (this.file != undefined) {
      data.banner = this.file;
    }
    data.titulo = this.descuento.titulo;
    data.descuento = this.descuento.descuento;
    data.fecha_inicio = this.descuento.fecha_inicio;
    data.categoria = this.descuento.categoria;
    data.fecha_fin = this.descuento.fecha_fin;


    this._descuentoService
      .actualizar_descuento_admin(this.id, data, this.token)
      .subscribe((response) => {
        console.log(response);

        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#05B481',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se actualizo el descuento',
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
          this.descuento.banner = this.file;
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
