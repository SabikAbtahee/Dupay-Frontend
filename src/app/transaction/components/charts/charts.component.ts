import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
// import { Color } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  public dates = [];
  public months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  public amounts = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartType = 'line';
  public barChartLegend = false;

  public barChartLabels;
  public barChartData = [
    {
      data: [],
      borderColor: "black",
      backgroundColor: "rgba(255, 255, 255, 0.0)",
      hoverBackgroundColor: "rgba(255, 255, 255, 0.0)",
      pointBackgroundColor: "black",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "black",
      type: "line"
    },
    {
      data: [],
      backgroundColor: "rgba(144, 164, 174, 0.7)",
      hoverBackgroundColor: "rgba(144, 164, 174, 0.9)",
      type: "bar"
    },
  ];

  ngOnInit() {
    this.viewDailyTransaction();
  }

  viewDailyTransaction() {

    this.dates = [];

    this.chartService.getChartData().subscribe(data => {

      this.amounts = Array(data.content.length).fill(0);

      this.dates[0] = data.content[0].payDate.substring(0, 10);
      this.amounts[0] = data.content[0].payAmount;

      for (let i = 0, j = 0; i < data.content.length; i++) {
        if(j>=10) break;
        if (this.dates[j] === data.content[i].payDate.substring(0, 10)) {
          this.dates[j] = data.content[i].payDate.substring(0, 10);
          this.amounts[j] += data.content[i].payAmount;
        }
        else {
          j++;
          this.dates[j] = data.content[i].payDate.substring(0, 10);
          this.amounts[j] += data.content[i].payAmount;
        }
      }



      this.amounts = this.amounts.slice(0, this.dates.length);

      this.barChartLabels = this.dates;
      this.barChartData[0].data = this.amounts;
      this.barChartData[1].data = this.amounts;

      console.log(this.amounts);
      console.log(this.dates);
    })
  }


  viewMonthlyTransaction() {

    this.dates = [];

    this.chartService.getChartData().subscribe(data => {

      this.amounts = Array(data.content.length).fill(0);

      this.dates[0] = this.months[(data.content[0].payDate.substring(5,7))-1];
      this.amounts[0] = data.content[0].payAmount;

      for (let i = 0, j = 0; i < data.content.length; i++) {
        if (this.dates[j] === this.months[(data.content[i].payDate.substring(5,7))-1]) {
          this.dates[j] = this.months[(data.content[i].payDate.substring(5,7))-1];
          this.amounts[j] += data.content[i].payAmount;
        }
        else {
          j++;
          this.dates[j] = this.months[(data.content[i].payDate.substring(5,7))-1];
          this.amounts[j] += data.content[i].payAmount;
        }
      }

      this.amounts = this.amounts.slice(0, this.dates.length);

      this.barChartLabels = this.dates;
      this.barChartData[0].data = this.amounts;
      this.barChartData[1].data = this.amounts;

      console.log(this.amounts);
      console.log(this.dates);
    })
  }

  viewYearlyTransaction() {

    this.chartService.getChartData().subscribe(data => {

      this.amounts = Array(data.content.length).fill(0);

      this.dates[0] = data.content[0].payDate.substring(0, 4);
      this.amounts[0] = data.content[0].payAmount;

      for (let i = 0, j = 0; i < data.content.length; i++) {
        if (this.dates[j] === data.content[i].payDate.substring(0, 4)) {
          this.dates[j] = data.content[i].payDate.substring(0, 4);
          this.amounts[j] += data.content[i].payAmount;
        }
        else {
          j++;
          this.dates[j] = data.content[i].payDate.substring(0, 4);
          this.amounts[j] += data.content[i].payAmount;
        }
      }

      this.amounts = this.amounts.slice(0, this.dates.length);

      this.barChartLabels = this.dates;
      this.barChartData[0].data = this.amounts;
      this.barChartData[1].data = this.amounts;

      console.log(this.amounts);
      console.log(this.dates);
    })
  }
}
