import { Component, ViewChild } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  heroGlobeAsiaAustralia,
  heroBars3BottomRight,
} from "@ng-icons/heroicons/outline";
import { NavMorePageComponent } from "../../pages/nav-more-page/nav-more-page.component";
import { LocalePageComponent } from "../../pages/locale-page/locale-page.component";

@Component({
  selector: "app-nav",
  imports: [NgIconComponent, LocalePageComponent, NavMorePageComponent],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.sass",
  viewProviders: [
    provideIcons({ heroGlobeAsiaAustralia, heroBars3BottomRight }),
  ],
})
export class NavComponent {
  @ViewChild("localePage") localePage!: LocalePageComponent;
  @ViewChild("morePage") morePage!: NavMorePageComponent;
}
