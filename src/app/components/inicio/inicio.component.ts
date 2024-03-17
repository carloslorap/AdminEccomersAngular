import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Chart  from 'chart.js/auto'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public token:any = localStorage.getItem('token');
  public total_ganancias:any
  public total_mes :any
  public count_ventas:any
  public total_mes_anterior :any

  constructor(private _adminService: AdminService) {


  }

  ngOnInit(): void {
    this.init_data()

  }

  init_data(){
    this._adminService.kpi_ganancias_mensuales_admin(this.token).subscribe(response=>{
      this.total_ganancias = response.total_ganancias
      this.total_mes = response.total_mes
      this.count_ventas = response.count_ventas
      this.total_mes_anterior = response.total_mes_anterior
      var canva = <HTMLCanvasElement> document.getElementById('myChart')
      const ctx:any = canva.getContext('2d')

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febreoro', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre'],
          datasets: [{
            label: 'Ganancia',
            data: [response.enero, response.febreoro, response.marzo, response.abril, response.mayo, response.junio,response.julio,response.agosto,response.septiembre,response.octubre,response.noviembre,response.diciembre],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
  }
}
