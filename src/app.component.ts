import { Component } from "@angular/core";
import { PageComponent } from "./pages/page/page.component";

@Component({
  selector: "my-app",
  templateUrl: './app.component.html',
  directives: [PageComponent]
})
export class AppComponent {
}
