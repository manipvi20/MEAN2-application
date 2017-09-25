import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        return items.reverse();
    }
}