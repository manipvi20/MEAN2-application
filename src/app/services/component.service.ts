import {Injectable} from '@angular/core';

@Injectable()
export class ComponentService {
    dataArray: string[] = [];

    loggedUser(data: any){
        this.dataArray.unshift(data);
    }
}