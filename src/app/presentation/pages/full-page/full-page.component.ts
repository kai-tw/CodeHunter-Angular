import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matCloseRound } from "@ng-icons/material-icons/round";

@Component({
  selector: "app-full-page",
  imports: [NgIconComponent],
  templateUrl: "./full-page.component.html",
  styleUrl: "./full-page.component.sass",
  viewProviders: [provideIcons({ matCloseRound })],
})
export class FullPageComponent {
  @Input("themes") themes: string = "";
  @ViewChild("pageWrapper") dom!: ElementRef;

  constructor() {}

  public open(): void {
    this.dom.nativeElement.classList.add("show");
  }

  public close(): void {
    this.dom.nativeElement.classList.remove("show");
  }
}
