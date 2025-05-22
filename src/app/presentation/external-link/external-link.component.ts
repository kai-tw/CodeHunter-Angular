import { Component, Input } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { heroArrowTopRightOnSquare } from "@ng-icons/heroicons/outline";

@Component({
  selector: "app-external-link",
  imports: [NgIconComponent],
  templateUrl: "./external-link.component.html",
  styleUrl: "./external-link.component.sass",
  viewProviders: [provideIcons({ heroArrowTopRightOnSquare })],
})
export class ExternalLinkComponent {
  @Input("href") href: string = "";
}
