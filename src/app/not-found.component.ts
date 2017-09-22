import { Component } from "@angular/core";

@Component({
    selector: 'not-found',
    template: `
    <div class="container">
        <h1>Sorry! This page is not found.</h1>
    </div>`
})

export class NotFoundComponent {
    constructor(){}
}