import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


declare var bKash:any;
@Component({
  selector: 'app-payment-bkash',
  templateUrl: './payment-bkash.component.html',
  styleUrls: ['./payment-bkash.component.scss']
})
export class PaymentBkashComponent implements OnInit {

   invoice = "6f590e13-4f23-480e-9f45-4b0b52fe2c2d";
  //  baseUrl = "http://103.221.253.163:8080";
  //  paymentUrl = "http://103.221.253.163:4200/payment";
   paymentID = null;
   baseUrl=environment.baseurl;
   paymentRequest = { amount: 10.00, intent: 'sale', currency: 'BDT', merchantInvoiceNumber: this.invoice };
  //  bKash:any;
  
  constructor() { 
    var paymentID = null;
      var paymentRequest = { amount: 10.00, intent: 'sale', currency: 'BDT', merchantInvoiceNumber: this.invoice };
      console.log("Before bkash");
      bKash.init({
          // alert(""),
          paymentMode: 'checkout',
          paymentRequest: paymentRequest,
          createRequest: function (request) {
  
              $.ajax({
                  url: `${this.baseUrl}` + "/api/external/bkash/payment",
                  type: 'POST',
                  contentType: 'application/json',
                  dataType: "json",
                  data: JSON.stringify({
                      "amount": 10,
                      "currency": "BDT",
                      "intent": "sale",
                      "merchantInvoiceNumber": this.invoice,
                      "invoiceId": this.invoice
                  }),
                  beforeSend: function () {
                      $("#bKash_button").hide();
                  },
                  success: function (obj) {
                      console.log(JSON.stringify(obj));
  
                      if (obj && obj.paymentID != null) {
                          var paymentID = obj.paymentID;
                          bKash.create().onSuccess(obj);
                      }
                      else {
                          
                          console.log(JSON.stringify(obj));
  
                          bKash.execute().onError();
                      }
                  },
                  error: function () {
                      bKash.create().onError();
                  }
              });
          },
  
          executeRequestOnAuthorization: function () {
  
              $.ajax({
                  url: `${this.baseUrl}` + "/api/external/bkash/payment/" + paymentID + "/execute",
                  type: 'GET',
                  contentType: 'application/json',
                  dataType: "json",
                  beforeSend: function () {
                      
                  },
                  success: function (obj) {
                      if (obj.status == "success") {
                          
                          console.log(JSON.stringify(obj));
  
                          window.location.replace(obj.redirectUrl);
                      } else {
                          console.log(JSON.stringify(obj));
                         
                          bKash.execute().onError();
                      }
                  },
                  error: function () {
                      // bKash.execute().onError();
                  }
              });
          },
          onClose: function () {
              
              window.location.replace(this.paymentUrl + "?invoice=" + this.invoice );
          }
      });
  
      setTimeout(function () {
          this.clickPayButton();
      }, 10);
  }

  ngOnInit() {
    // bKash= new bKash();
    // $(document).ready(function () {

      // var invoice = "6f590e13-4f23-480e-9f45-4b0b52fe2c2d";
      // var baseUrl = "http://103.221.253.163:8080";
      // var paymentUrl = "http://103.221.253.163:4200/payment"
      
  
  
  
  // });
  }

  

  

callReconfigure(val) {
    bKash.reconfigure(val);
}

clickPayButton() {
    $("#bKash_button").trigger('click');
}




}
