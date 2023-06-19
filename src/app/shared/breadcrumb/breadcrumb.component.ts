import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {breadcrumbMessage} from '../breadcrumb-message.service';
// import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles :[
  `
      .bc { position: -webkit-sticky; /* Safari & IE */ position: sticky; top: 0; }
      .danger{
        font-family: "Times New Roman", Times, serif;
        font-weight: bold;
        font-size: 25px;
        color: red;
      }  
      .success{
        font-family: "Times New Roman", Times, serif;
        color: #196F3D;
        font-weight: bold;
        font-size: 25px;
      }  

  `]
})

@Injectable({
  providedIn: 'root',
})

export class BreadcrumbComponent implements OnInit {
  
  message : any;
  flag : any;
  clear : any;
  // private notifier: NotifierService;
  // @param {NotifierService} notifier
  @Input() layout;
  pageInfo;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private set : breadcrumbMessage,
    // notifier: NotifierService
  ) {
    // this.notifier = notifier;
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });
      
  }
  /**
	 * Show a notification
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
  /**
	 * Hide oldest notification
	 */
	public hideOldestNotification(): void {
		// this.notifier.hideOldest();
	}

	/**
	 * Hide newest notification
	 */
	public hideNewestNotification(): void {
		// this.notifier.hideNewest();
	}

	/**
	 * Hide all notifications at once
	 */
	public hideAllNotifications(): void {
		// this.notifier.hideAll();
	}

	/**
	 * Show a specific notification (with a custom notification ID)
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 * @param {string} id      Notification ID
	 */
	public showSpecificNotification( type: string, message: string, id: string ): void {
		// this.notifier.show( {
		// 	id,
		// 	message,
		// 	type
		// } );
	}

	/**
	 * Hide a specific notification (by a given notification ID)
	 *
	 * @param {string} id Notification ID
	 */
	public hideSpecificNotification( id: string ): void {
		// this.notifier.hide( id );
	}
  public showNotification( type: string, message: string ): void {
		// this.notifier.notify( type, message );
	}

  change() {
    const data = this.set.getOption();
    this.message = data[0];
    this.flag = data[1];
    // if(this.flag==false){
    //   this.showNotification('success',this.message);
    // }
    // console.log("msg2::"+this.message);
  
  }
  clearMsg(){
    this.message='';
    this.set.setOption('',false);
    // console.log("msg1::"+this.message);
    
  }
  
  ngOnInit() {
    this.change();
    let timer = Observable.timer(500, 500);
    timer.subscribe(() => this.change());
    
  }
   
  
 
}
