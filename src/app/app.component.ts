import { Component, Inject, LOCALE_ID } from "@angular/core";
import { CodeTableComponent } from "./presentation/code-table/code-table.component";
import { TabsComponent } from "./presentation/tabs/tabs.component";
import { TabComponent } from "./presentation/tab/tab.component";
import { CodeData } from "../data-model/code-data";
import { FooterComponent } from "./presentation/footer/footer.component";
import { HttpClient } from "@angular/common/http";
import { LoadingStatus } from "../data-model/loading-status";
import { GameType } from "../data-model/game-type";
import { LoadingSpinnerComponent } from "./presentation/loading-spinner/loading-spinner.component";
import { ShareButtonComponent } from "./presentation/share-button/share-button.component";
import { AdNodeComponent } from "./presentation/ad-node/ad-node.component";
import { NavComponent } from "./presentation/nav/nav.component";
import { ExternalLinkComponent } from "./presentation/external-link/external-link.component";

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
    this.http
      .get(`https://codehunter-api.kai-wu.net/${this.locale}/`)
      .subscribe((data) => {
        this.codeList = (data as Array<Object>)
          .map((e: any) => new CodeData(e))
          .filter((e: CodeData) => e.isValid())
          .sort(CodeData.compare);
        this.status = LoadingStatus.LOADED;
      });
  }

  protected novelGlideClick(): void {
    gtag("event", "NovelGlide Promotion Click Event");
  }
}
