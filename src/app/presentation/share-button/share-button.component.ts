import { Component } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matShareRound, matCloseRound } from "@ng-icons/material-icons/round";
import { jamFacebook, jamLine } from "@ng-icons/jam-icons";

declare const gtag: Function;

@Component({
    selector: "app-share-button",
    imports: [NgIconComponent],
    templateUrl: "./share-button.component.html",
    styleUrl: "./share-button.component.sass",
    viewProviders: [
        provideIcons({ matShareRound, matCloseRound, jamFacebook, jamLine }),
    ]
})
export class ShareButtonComponent {
  protected isExpanded: Boolean = false;

  protected toggle() {
    this.isExpanded = !this.isExpanded;
    gtag("event", "Share Button Toggle Click Event", {
      isExpanded: this.isExpanded,
    });
  }

  protected navigateTo(type: string, url: string) {
    gtag("event", "Share Button Click Event", {
      type: type,
      url: url,
    });
    window.open(url, "_blank");
  }
}
