import { Component } from "@angular/core";
import { Page1Component } from "./pages/page1/page1.component";

@Component({
  selector: "my-app",
  templateUrl: './app.component.html',
  directives: [Page1Component]
})
export class AppComponent {
}
