import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user:any ={}
  public usuario :any={}
  public token :any = ''

  constructor(private _adminServices:AdminService,private _router:Router){
    this.token = this._adminServices.getToken()
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/'])
    }else{
      
    }
  }

  login(){
    if (!this.user.email) {
      iziToast.show({
        title:'ERROR',
        titleColor: '#FF0000',
        class:'text-danger',
        position:'topRight',
        message:'Ingrese la contraseña correctamente'
       })
    }else if(!this.user.password){
     iziToast.show({
      title:'ERROR',
      titleColor: '#FF0000',
      class:'text-danger',
      position:'topRight',
      message:'Ingrese la contraseña correctamente'
     })
    }else{
      let data={
        email:this.user.email,
        password:this.user.password
      }
      this._adminServices.login_admin(data).subscribe(response=>{
        if (response.data == undefined) {
          iziToast.show({
            title:'ERROR',
            titleColor: '#FF0000',
            class:'text-danger',
            position:'topRight',
            message: response.message
           })
        } else {
          iziToast.show({
            title:'SUCCESS',
            titleColor: '#05B481',
            class:'text-danger',
            position:'topRight',
            message:'Bienvenido al dashboard'
           })
          this.usuario = response.data
          localStorage.setItem('token',response.token)
          localStorage.setItem('_id',response.data._id)
          this._router.navigate(['/'])
        }
        
      })
      
      
    }
    
  }

}
