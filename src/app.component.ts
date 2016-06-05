import { Component } from "@angular/core";
import { RouteConfig, ROUTER_DIRECTIVES } from "@angular/router-deprecated";
import { Page1Component } from "./pages/page1/page1.component";
// import { Observable } from "rxjs/Rx";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  directives: [Page1Component]
})
@RouteConfig([{
    path: "/",
    name: "Page1",
    component: Page1Component,
    useAsDefault: true,
}])
export class AppComponent {
  constructor() {
    // new Observable();
  }
}
