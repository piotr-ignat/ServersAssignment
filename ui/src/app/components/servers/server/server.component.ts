import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faEllipsisH, faCircle, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Server} from '../../../models/server.model';

@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {
  faEllipsisH = faEllipsisH;
  faCircle = faCircle;
  faTimes = faTimes;

  @Input() server: Server;
  @Output() statusTurn = new EventEmitter<Server>();
  @Output() serverReboot = new EventEmitter<Server>();

  onTurn(select: HTMLDivElement): void {
    if (this.server.status !== 'REBOOTING') {
      this.statusTurn.emit(this.server);
      select.style.visibility = 'hidden';
    }
  }

  onReboot(select: HTMLDivElement): void {
    if (this.server.status === 'ONLINE') {
      this.serverReboot.emit(this.server);
      select.style.visibility = 'hidden';
    }
  }

}
