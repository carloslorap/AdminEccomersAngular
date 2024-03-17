import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast:any;
declare var jQuery: any;
declare var $: any;
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';



@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public token :any = localStorage.getItem('token');
  public id :any
  public _iduser:any = localStorage.getItem('_id')
  public producto :any = {}
  public inventarios :Array<any> = []
  public arr_inventarios :Array<any> = []
  public inventario :any = {}
  public load_data = true
  public pageSize =4
  public page = 1;

  constructor(private _route:ActivatedRoute,private _productoService:ProductoService) {

  }

  ngOnInit(): void {
    this.load_data = true;
    this._route.params.subscribe(params=>{
      this.id = params['id'];
      this._productoService.obtener_producto_admin(this.id,this.token).subscribe(response=>{
          this.producto = response.data

          this._productoService.listar_inventario_admin(this.producto._id,this.token).subscribe(response=>{

            this.inventarios = response.data
            this.inventarios.forEach(element=>{
              this.arr_inventarios.push({
                admin:element.admin.nombres + ' ' + element.admin.apellidos,
                cantidad:element.cantidad,
                proveedor:element.proveedor,

              })
            })
          })
          this.load_data = false;

      })

    })
  }


  eliminar(id:any){
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe((response) => {
      iziToast.show({
        title:'SUCCESS',
        titleColor: '#05B481',
        class:'text-danger',
        position:'topRight',
        message:'Se elimino el producto'
       })
       $('#delete-'+id).modal('hide')
       $('.modal-backdrop').removeClass('show')
       this._productoService.listar_inventario_admin(this.producto._id,this.token).subscribe(response=>{
        console.log(response);
        this.load_data = false;
        this.inventarios = response.data

      })

    })
  }


  registro_inventario(){
    if (!this.inventario.cantidad) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese la cantidad',
      });
    } else if (!this.inventario.proveedor) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese el proveedor',
      });
    }else{
      let data ={
        producto:this.producto._id,
        cantidad:this.inventario.cantidad,
        admin:this._iduser,
        proveedor:this.inventario.proveedor
      }

      this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#05B481',
          class: 'text-danger',
          position: 'topRight',
          message: 'Se agrego el nuevo stock al producto',
        });
        this._productoService.listar_inventario_admin(this.producto._id,this.token).subscribe(response=>{
          console.log(response);
          this.load_data = false;
          this.inventarios = response.data
        })

      })

    }
  }



  donwload_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_inventarios){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Proveedor', key: 'col3', width: 15},

    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }


}
