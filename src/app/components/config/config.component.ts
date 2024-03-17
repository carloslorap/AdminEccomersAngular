import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { v4 as uuidv4 } from 'uuid';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  public token: any = localStorage.getItem('token');
  public config: any = {};
  public titulo_cat = '';
  public icono_cat = '';
  public url :any
  public file: File | any = undefined;
  public imgSelect: any = 'assets/img/01.jpg';

  constructor(private _adminService: AdminService) {
    this._adminService
      .obtener_config_admin(this.token)
      .subscribe((response) => {
        this.config = response.data;
        this.imgSelect =this.url+'obtener_logo/'+this.config.logo
      });
     this.url = GLOBAL.url
  }

  ngOnInit(): void {}

  agregar_cat() {
    if (this.titulo_cat && this.icono_cat) {
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4(),
      });
      this.icono_cat = '';
      this.titulo_cat = '';
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un titulo e icono',
      });
    }
  }

  actualizar() {
    let data: any = {};
    if (this.file != undefined) {
      data.logo = this.file;
    }
    (data.titulo = this.config.titulo),
    (data.serie = this.config.serie),
    (data.correlativo = this.config.correlativo),
    (data.categorias = this.config.categorias),



    this._adminService
      .actualizar_config_admin('65da7b77c80482a92bfdbe4d', data, this.token)
      .subscribe((response) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#05B481',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se actualizo la configuración',
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
          this.config.logo = this.file;
          const reader = new FileReader();
          reader.onload = (e) => (this.imgSelect = reader.result);
          reader.readAsDataURL(file);
          $('#file-input').text(file.name);
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
  }


  eliminar_categoria(idx:any){
    this.config.categorias.splice(idx,1)
  }


}
