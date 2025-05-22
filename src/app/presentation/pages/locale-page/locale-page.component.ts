import { Component, Inject, LOCALE_ID, ViewChild } from "@angular/core";
import { FullPageComponent } from "../full-page/full-page.component";

@Component({
  selector: "app-locale-page",
  templateUrl: "./locale-page.component.html",
  styleUrl: "./locale-page.component.sass",
  imports: [FullPageComponent],
})
export class LocalePageComponent {
  protected defaultLocale: string = "zh-Hant";
  protected localeList: Array<{ locale: string; label: string }> = [
    { locale: "zh-Hant", label: "繁體中文" },
    { locale: "en-US", label: "English (United State)" },
    { locale: "ja", label: "日本語" },
  ];
  @ViewChild("fullPage") fullPage!: FullPageComponent;

  constructor(@Inject(LOCALE_ID) protected locale: string) {}
}
