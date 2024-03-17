import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { DescuentoService } from 'src/app/services/descuento.service';
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-index-descuento',
  templateUrl: './index-descuento.component.html',
  styleUrls: ['./index-descuento.component.css'],
})
export class IndexDescuentoComponent implements OnInit {
  public token: any = localStorage.getItem('token');
  public load_data = true;
  public filtro = '';
  public descuentos: Array<any> = [];

  public pageSize = 10;
  public page = 1;
  public url: any;

  constructor(private _descuentoService: DescuentoService) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this.load_data = false;
    this._descuentoService
      .listar_descuentos_admin(this.filtro, this.token)
      .subscribe((response) => {
        this.descuentos = response.data;
        this.descuentos.forEach((element) => {
          var tt_inicio = Date.parse(element.fecha_inicio + 'T00:00:00') / 1000;
          var tt_fin = Date.parse(element.fecha_fin + 'T00:00:00') / 1000;

          var today = Date.parse(new Date().toString()) / 1000;

          if (today > tt_inicio) {
            element.estado = 'Expirado';
          }
          if (today < tt_fin) {
            element.estado = 'Proximamente';
          }
          if (today >= tt_inicio && today <= tt_fin) {
            element.estado = 'En progreso';
          }
        });
      });
  }

  filtrar() {
    if (this.filtro) {
      this._descuentoService
        .listar_descuentos_admin(this.filtro, this.token)
        .subscribe((response) => {
          this.descuentos = response.data;
          this.load_data = false;
        });
    } else {
      this._descuentoService
        .listar_descuentos_admin(this.filtro, this.token)
        .subscribe((response) => {
          this.descuentos = response.data;
          this.load_data = false;
        });
    }
  }

  eliminar(id: any) {
    this._descuentoService
      .eliminar_descuento_admin(id, this.token)
      .subscribe((response) => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#05B481',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se elimino el producto',
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.init_data();
      });
  }
}
