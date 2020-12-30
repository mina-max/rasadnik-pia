import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProdavnicaService } from 'src/app/prodavnica.service';


@Component({
  selector: 'app-poslovanje',
  templateUrl: './poslovanje.component.html',
  styleUrls: ['./poslovanje.component.css']
})
export class PoslovanjeComponent implements OnInit {

  constructor(private servis: ProdavnicaService) { }

  ngOnInit(): void {
    this.mapa = new Map();
    
    var getDaysArray = function (start, end) {
      for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
      }
      return arr;
    };

    this.daylist = new Array();
    this.values = new Array();
    this.keys = new Array();


    var today = new Date();
    var priorDate = new Date().setDate(today.getDate()-30);
    var before = new Date(priorDate);


    this.daylist = getDaysArray(before, today);
    this.daylist.forEach(datum => {
      this.keys.push(datum.toDateString());
    });

    console.log(this.keys);
    console.log(this.daylist)

    for(var i = 0; i < this.daylist.length; i++){
      this.mapa.set(this.daylist[i].toDateString(), 0);
    }
  console.log(this.mapa)
    
    this.Narudzbine = JSON.parse(localStorage.getItem('artikli'));

    for (var i = 0; i < this.Narudzbine.length; i++) {
      console.log(this.Narudzbine[i].datum)
      if (this.Narudzbine[i].status == "Isporučena") {
        var datum = new Date(this.Narudzbine[i].datum);
        var str = datum.toDateString();
        if (this.mapa.has(str)) {
          var num = this.mapa.get(str);
          this.mapa.set(str, num + 1);
        }
      }
    }

   

    for(let entry of this.mapa.entries()){
      this.values.push(entry[1]);
    }

    console.log(this.values)
    this.showChart();



  }




  chart: Chart;
  days: Array<string>;
  data: any;
  keys: any;
  values: any;
  daylist: any;

  Narudzbine: any;

  mapa: Map<String, number>;

  showChart() {
    this.chart = new Chart('lineCharts', {
      type: 'line',
      data: {
        labels: this.keys, // your labels array
        datasets: [
          {
            label: '# broj narudžbina',
            data: this.values, // your data array
            fill: true,
            lineTension: 0.4,
            borderWidth: 3,
          }
        ] 
      },
      options: {
        responsive: true,
        title: {
          text: "Pregled poslovanja u prethodnih 30 dana",
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  odjava() {
    localStorage.clear();
  }

}
