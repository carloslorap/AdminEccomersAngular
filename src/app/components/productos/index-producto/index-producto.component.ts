import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast:any;
declare var jQuery: any;
declare var $: any;
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public token:any = localStorage.getItem('token')
  public load_data = true
  public filtro = ''
  public productos :Array<any> = []
  public arr_productos :Array<any> = []
  public pageSize =10
  public page = 1;
  public url:any;

  constructor(private _productoService:ProductoService){
    this.url = GLOBAL.url
  }

  ngOnInit(): void {
    this.init_data()
  }


  init_data(){
    this.load_data = false;
    this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(response=>{

      this.productos = response.data
      this.productos.forEach(element=>{
        this.arr_productos.push({
          titulo:element.titulo,
          stock:element.stock,
          precio:element.precio,
          categoria:element.categoria,
          nventas:element.nventas
        })
      })
    })
  }

  filtrar(){
    if (this.filtro) {

      this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(response=>{

        this.productos = response.data
        this.load_data = false
      })

    } else {
      this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(response=>{

        this.productos = response.data
        this.load_data = false
      })
    }
  }


  eliminar(id:any){
    this._productoService.eliminar_producto_admin(id,this.token).subscribe((response) => {
      iziToast.show({
        title:'SUCCESS',
        titleColor: '#05B481',
        class:'text-danger',
        position:'topRight',
        message:'Se elimino el producto'
       })
       $('#delete-'+id).modal('hide')
       $('.modal-backdrop').removeClass('show')
       this.init_data()

    })
  }

  donwload_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");

    worksheet.addRow(undefined);
    for (let x1 of this.arr_productos){
      let x2=Object.keys(x1);

      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }

    let fname='REP01- ';

    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 50},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}
