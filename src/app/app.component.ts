/**
 *
 * @author Antony George
 *
 */
 import { Component, OnInit, ViewChild, TemplateRef,  } from '@angular/core';
 // import { SwUpdate } from '@angular/service-worker';
 // import { VersionCheckService } from '../app/shared/version-check.service';
 import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
 import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
 import { Keepalive } from '@ng-idle/keepalive';
 import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
 import { Location } from '@angular/common'
 import { ApiService } from './core/api.service';
 import { Crypto } from './shared/crypto.service';

 @Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
 })
 
 export class AppComponent implements OnInit {
   @ViewChild('childModal', { static: true }) childModal: TemplateRef<any>;
   idleState = 'Not started.';
   timedOut = false;
   lastPing?: Date = null;
   closeResult: String = '';
   title = 'angular-idle-timeout';
   constructor(private idle: Idle, private keepalive: Keepalive,private router: Router,    private modalService: NgbModal,private location: Location,private apiService: ApiService,private crypto: Crypto) {
     idle.setIdle(900);
     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
     idle.setTimeout(20);
     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
 
     idle.onIdleEnd.subscribe(() => { 
       this.idleState = 'No longer idle.'
       this.modalService.dismissAll();
       console.log(this.idleState);
       this.reset();
     });
     
     idle.onTimeout.subscribe(() => {
       this.idleState = 'Timed out!';
       this.timedOut = true;
       console.log(this.idleState);
       this.modalService.dismissAll();
      this.router.navigate(['authentication/login']);
     });
     
     idle.onIdleStart.subscribe(() => {
         this.idleState = 'You\'ve gone idle!'
         console.log(this.idleState);
        // this.viewsamplepic(this.childModal)
        this.router.navigate(['authentication/login']);
     });
     
     idle.onTimeoutWarning.subscribe((countdown) => {
       this.idleState = 'Session will time out in ' + countdown + ' seconds!'
       console.log(this.idleState);
     });
 
     // sets the ping interval to 15 seconds
     keepalive.interval(15);
 
     keepalive.onPing.subscribe(() => this.lastPing = new Date());
 
     this.reset();
   }
 
   reset() {
     this.idle.watch();
     this.idleState = 'Started.';
     this.timedOut = false;
   }
     // this.updateClient();
   
   ngOnInit() {
     // console.log("********************initVersionCheck:: Start ***********************");
     // this.versionCheck.initVersionCheck('version.json');
     // console.log("********************initVersionCheck:: End *****************************");
   //   setInterval(() => {
   //     this.updateClient();
   // }, 10000);
   
   this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      const isUserNavigation = event.navigationTrigger === 'popstate'; // user trigger the navigation
      const isHashNavigation = event.navigationTrigger === 'hashchange'; // hash cache navigation
      const isSytemNavigation = event.navigationTrigger === 'imperative'; // system navigation
      const previousUrl = this.router.routerState.snapshot.url;
      if (isHashNavigation) {
        this.router.navigate([previousUrl]);
        // console.log('isHashNavigation');
        return;
      } else if (!isSytemNavigation) {
        if (confirm("The page that you're looking for used information that you entered. " +
        "Returning to that page might cause any action you look to be repeated. " +
        "Do you want to continue?")) {
        // this.router.navigate(['']);
        // this.logout();
        this.router.navigate(['authentication/login']);
        localStorage.clear();
      } else {
        // this.backCalled = false;        
        this.location.back();          
        // this.backCalled = true;
        this.router.navigate([previousUrl]);

        // console.log('previousUrl',previousUrl);
        
      }
      }
    }
  });
   }
   updateClient() {
     // if(!this.updates.isEnabled) {
     //   return;
     // }
     // this.updates.available.subscribe((event)=> {
     //       console.log(`current1`,event.current,`available1`,event.available);
     //       if(confirm('Update available for the Application Please Confirm')) {
     //             this.updates.activateUpdate().then(()=> {location.reload();});
     //       }
     // });
     // this.updates.activated.subscribe((event)=> {
     //       console.log(`current2`,event.previous,`available2`,event.current);
     // });
   }
   viewsamplepic(content){
     this.modalService.open(content, { size: 'sm' }).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return `with: ${reason}`;
     }
   }
 
  //  logout(){
  //    this.router.navigate(['authentication/login']);
  //  }
  logout() {
    const data = {
      t: window.localStorage.getItem('token'),
      userId: this.crypto.decryt(window.localStorage.getItem('userId'))
    };
    this.apiService.logOut(data).subscribe(data => {
      this.router.navigate(['authentication/login']);
      localStorage.clear();
    }, error => console.log(error));
  }
   stay(){
     this.modalService.dismissAll();
  //   keepalive.interval(15);
   }
 
   hideChildModal(){
     this.modalService.dismissAll();
   }
 }
 