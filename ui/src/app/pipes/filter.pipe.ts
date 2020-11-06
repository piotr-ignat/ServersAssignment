import { Pipe, PipeTransform } from '@angular/core';
import {Server} from '../models/server.model';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: Server[], searchText: string): Server[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText) || it.status.toLocaleLowerCase().includes(searchText);
    });
  }

}
