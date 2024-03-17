import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css'],
})
export class IndexCuponComponent implements OnInit {
  public token = localStorage.getItem('token');
  public cupones: Array<any> = [];
  public load_data = true;
  public pageSize = 5;
  public page = 1;
  public filtro = '';

  constructor(private _cuponService: CuponService) {}

  ngOnInit(): void {
    this.load_data = true;
    this._cuponService
      .listar_cupones_admin(this.filtro, this.token)
      .subscribe((response) => {
        this.cupones = response.data
        this.load_data = false;
      });
  }

  filtrar(){
    this._cuponService
    .listar_cupones_admin(this.filtro, this.token)
    .subscribe((response) => {
      this.cupones = response.data
      this.load_data = false;
    });
  }

  eliminar(id:any){
    this._cuponService.eliminar_cupon_admin(id,this.token).subscribe((response) => {
      iziToast.show({
        title:'SUCCESS',
        titleColor: '#05B481',
        class:'text-danger',
        position:'topRight',
        message:'Se elimino el cupon'
       })
       $('#delete-'+id).modal('hide')
       $('.modal-backdrop').removeClass('show')
       this._cuponService
       .listar_cupones_admin(this.filtro, this.token)
       .subscribe((response) => {
         this.cupones = response.data
         this.load_data = false;
       });
    })
  }

}
