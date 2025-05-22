import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  imports: [],
  templateUrl: "./footer.component.html",
  styleUrl: "./footer.component.sass",
})
export class FooterComponent {
  protected thisYear: number;

  constructor() {
    this.thisYear = new Date().getFullYear();
  }
}
