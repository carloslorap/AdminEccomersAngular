import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
declare var iziToast:any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit{
  public token:any = localStorage.getItem('token');
  public load_btn = false
  public cupon :any ={
    tipo: ''
  }
  constructor(private _cuponService:CuponService,private _router:Router){}


  ngOnInit(): void {

  }

  registro(){
    if (!this.cupon.codigo) {
      iziToast.show({
        title:'ERROR',
        titleColor: '#FF0000',
        class:'text-danger',
        position:'topRight',
        message:'Ingrese el codigo'
       })
    }else if(!this.cupon.valor){
     iziToast.show({
      title:'ERROR',
      titleColor: '#FF0000',
      class:'text-danger',
      position:'topRight',
      message:'Ingrese el valor'
     })
    }else if(!this.cupon.tipo){
      iziToast.show({
       title:'ERROR',
       titleColor: '#FF0000',
       class:'text-danger',
       position:'topRight',
       message:'Ingrese el tipo'
      })
    }else if(!this.cupon.limite){
      iziToast.show({
       title:'ERROR',
       titleColor: '#FF0000',
       class:'text-danger',
       position:'topRight',
       message:'Ingrese el limite'
      })
    }else{
      this._cuponService.registro_cupon_admin(this.cupon,this.token).subscribe(response=>{

        iziToast.show({
          title:'SUCCESS',
          titleColor: '#05B481',
          class:'text-danger',
          position:'topRight',
          message:'Se registro el cupon'
         })
         this.cupon={
          codigo: '',
          limite: '',
          tipo: '',
          valor: ''
         }
         this._router.navigate(['/cupones'])
      })

    }
  }
}
