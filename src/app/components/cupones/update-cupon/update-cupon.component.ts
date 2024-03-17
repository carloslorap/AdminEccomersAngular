import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
declare var iziToast:any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public token:any = localStorage.getItem('token');
  public load_btn = false
  public load_data = true
  public cupon :any ={
    tipo: ''
  }
  public id:any

  constructor(private _router:ActivatedRoute,private _cuponService:CuponService,private _route:Router){}



  ngOnInit(): void {
    this._router.params.subscribe(params=>{
      this.id= params['id'];

      this.load_data = true
      this._cuponService.obtener_cupon_admin(this.id,this.token).subscribe(response=>{
        if (response.data == undefined) {
          this.cupon = undefined
          this.load_data = false
        } else {
          this.cupon = response.data
          this.load_data = false
        }

      })
    })
  }

  actualizar(){
    this.load_btn = true
    this._cuponService.actualizar_cupon_admin(this.id,this.cupon,this.token).subscribe(response=>{
      console.log(response);
      iziToast.show({
        title:'SUCCESS',
        titleColor: '#05B481',
        class:'text-danger',
        position:'topRight',
        message:'Se actualizo el cupon'
       })
       this.load_btn = false
       this._route.navigate(['/cupones'])
    })
  }

}
