import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from "..//..//core/api.service";
import { Constant } from "..//..//core/constant";
import {breadcrumbMessage} from '..//..//shared/breadcrumb-message.service'
import { environment } from '../../../environments/environment';
import { subMinutes } from 'date-fns';

@Component({
  selector: 'app-creation-invoice',
  templateUrl: './creation-invoice.component.html',
  styleUrls: ['./creation-invoice.component.css']
})
export class CreationInvoiceComponent implements OnInit {
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    sourcingPartner: new FormControl('', [Validators.required]),
    retailerId: new FormControl('',[Validators.required]),
    programId: new FormControl('',[Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
    

  constructor(private http: HttpClient, private apiService: ApiService,private router: Router, private set : breadcrumbMessage) { }

  ngOnInit() {

  }

}
