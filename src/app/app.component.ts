import { Component, Inject, LOCALE_ID } from "@angular/core";
import { CodeTableComponent } from "./presentation/sections/code-table/code-table.component";
import { TabsComponent } from "./presentation/components/tabs/tabs.component";
import { TabComponent } from "./presentation/components/tab/tab.component";
import { CodeData } from "../data-model/code-data";
import { FooterComponent } from "./presentation/sections/footer/footer.component";
import { HttpClient } from "@angular/common/http";
import { LoadingStatus } from "../data-model/loading-status";
import { GameType } from "../data-model/game-type";
import { LoadingSpinnerComponent } from "./presentation/components/loading-spinner/loading-spinner.component";
import { ShareButtonComponent } from "./presentation/components/share-button/share-button.component";
import { AdNodeComponent } from "./presentation/components/ad-node/ad-node.component";
import { NavComponent } from "./presentation/sections/nav/nav.component";
import { ExternalLinkComponent } from "./presentation/components/external-link/external-link.component";
import LocaleService from "./core/LocaleService";
import { LoadingErrorComponent } from "./presentation/components/loading-error/loading-error.component";

declare const gtag: Function;

@Component({
  selector: "app-root",
  imports: [
    AdNodeComponent,
    NavComponent,
    CodeTableComponent,
    TabsComponent,
    TabComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    ShareButtonComponent,
    ExternalLinkComponent,
    LoadingErrorComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.sass",
})
export class AppComponent {
  protected status: LoadingStatus = LoadingStatus.LOADING;
  protected codeList: CodeData[] = [];
  protected GameTypeEnum = GameType;
  protected LoadingStatusEnum = LoadingStatus;

  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) protected locale: string
  ) {}

  ngAfterContentInit() {
    // Get the locale from browser
    const browserLocale: string =
      LocaleService.getRecord() ??
      LocaleService.getFromBrowser() ??
      LocaleService.defaultLocale;

    if (LocaleService.detectionEnabled && this.locale !== browserLocale) {
      // Change Locale
      LocaleService.navigateTo(browserLocale);
    } else {
      // Boot up.
      this.boot();
    }
  }

  private boot() {
    gtag("js", new Date());

    gtag("config", "G-WDM58W0SH1");

    this.http
      .get(`https://codehunter-api.kai-wu.net/${this.locale}/`)
      .subscribe({
        next: (data) => {
          this.codeList = (data as Array<Object>)
            .map((e: any) => new CodeData(e))
            .filter((e: CodeData) => e.isValid())
            .sort(CodeData.compare);
          this.status = LoadingStatus.LOADED;
        },
        error: (_) => {
          this.status = LoadingStatus.ERROR;
        },
      });
  }

  protected getDoShowBadge(gameType: GameType): boolean {
    return this.codeList
      .some((e: CodeData) => e.game === gameType && e.isRecentlyAdded());
  }

  protected novelGlideClick(): void {
    gtag("event", "NovelGlide Promotion Click Event");
  }
}
