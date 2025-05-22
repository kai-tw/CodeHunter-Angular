import { Component, ViewChild } from "@angular/core";
import { FullPageComponent } from "../full-page/full-page.component";
import { ExternalLinkComponent } from "../../external-link/external-link.component";

@Component({
  selector: "app-nav-more-page",
  imports: [FullPageComponent, ExternalLinkComponent],
  templateUrl: "./nav-more-page.component.html",
  styleUrl: "./nav-more-page.component.sass",
})
export class NavMorePageComponent {
  @ViewChild("fullPage") fullPage!: FullPageComponent;
}
