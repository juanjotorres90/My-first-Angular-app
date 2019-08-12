import { Component, OnInit } from '@angular/core';

@Component({
  // selector: '[app-servers]', '.app-servers'
  selector: 'app-servers',
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Testserver';
  username = '';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];
  visibleP = false;
  log = [];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement> event.target).value;
  }

  resetInput() {
    this.username = '';
  }

onToggleDetails() {
  this.visibleP = !this.visibleP;
  // this.log.push(this.log.length + 1);
  this.log.push(new Date());

}

}
