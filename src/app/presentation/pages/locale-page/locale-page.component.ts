import { Component, Inject, LOCALE_ID, ViewChild } from "@angular/core";
import { FullPageComponent } from "../full-page/full-page.component";
import LocaleService from "../../../core/LocaleService";

@Component({
  selector: "app-locale-page",
  templateUrl: "./locale-page.component.html",
  styleUrl: "./locale-page.component.sass",
  imports: [FullPageComponent],
})
export class LocalePageComponent {
  protected localeList = LocaleService.localeList;
  @ViewChild("fullPage") fullPage!: FullPageComponent;

  constructor(@Inject(LOCALE_ID) protected locale: string) {}

  setLocale(locale: string) {
    LocaleService.saveRecord(locale);
    LocaleService.navigateTo(locale);
  }
}
