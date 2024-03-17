import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.css']
})
export class CreateDescuentoComponent implements OnInit {

  public token: any = localStorage.getItem('token');
  public descuento: any = {
    categoria: '',
  };
  public file: File | any = undefined;
  public imgSelect: any = 'assets/img/01.jpg';
  public config_global: any = {

  };

  constructor(private _descuentoService: DescuentoService,
    private _adminervice: AdminService){}

  ngOnInit(): void {
    this._adminervice.obtener_config_publico().subscribe((response) => {
      this.config_global = response.data;

    });
  }

  registro(){
    if (!this.descuento.titulo) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese el titulo del descuento',
      });
    } else if (!this.descuento.descuento) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese el descuento',
      });
    } else if (!this.descuento.fecha_inicio) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese la fecha de inicio',
      });
    } else if (!this.descuento.fecha_fin) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese la fecha de fin',
      });
    }else if (!this.descuento.categoria) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese la categoria',
      });
    }else{
      this._descuentoService.registro_descuento_admin(this.descuento,this.token).subscribe(
        response=>{
          this.descuento = {};
          this.file = undefined;
          this.imgSelect = 'assets/img/01.jpg';

          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#05B481',
            class: 'text-danger',
            position: 'topRight',
            message: 'Se creo el descuento',
          });

        }
      )
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
