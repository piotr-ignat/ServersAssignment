import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Server} from '../../models/server.model';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  faSearch = faSearch;

  servers: Server[];

  searchText = '';

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getServers().subscribe( servers => {
      this.servers = servers;
    });
  }

  onStatusTurn(server: Server): void {
    if (server.status === 'ONLINE') {
      this.appService.turnServer(server.id, 'off').subscribe(srv => this.servers[this.servers.indexOf(server)] = srv);
    } else {
      this.appService.turnServer(server.id, 'on').subscribe(srv => this.servers[this.servers.indexOf(server)] = srv);
    }
  }

  onReboot(server: Server): void {
    if (server.status === 'ONLINE') {
      const index = this.servers.indexOf(server);
      this.appService.rebootServer(server.id).subscribe( srv => {
          this.servers[index] = srv;
        },
        () => {},
        () => {
          this.getServer(server.id, index);
        });
    }
  }

  getServer(serverId: number, index: number) {
    this.appService.getServer(serverId).subscribe(srv => this.servers[index] = srv);
  }
}
