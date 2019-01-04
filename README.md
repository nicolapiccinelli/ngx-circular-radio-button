# ngx-circular-radio-button

This is an angular module which provides a simple circular radio button component. Is inspired by [https://stackblitz.com/edit/ngx-ui-radio-buttons](https://stackblitz.com/edit/ngx-ui-radio-buttons) with an improved rendering and solving the circual dependecies in the previous version.

## Usage
The usage is similar as the material radio button:

```
<ngx-radiobutton-group class="col-md-12" [(ngModel)]="pie.type">
  <p class="pl-2 pr-2">Favourite pie</p>
  
  <div *ngFor="let type of pieTypes">
    <ngx-radiobutton class="pl-2 pr-2" value="{{type}}" required>{{ type }}</ngx-radiobutton>
  </div>
</ngx-radiobutton-group>
```