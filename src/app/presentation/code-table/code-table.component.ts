import { Component, Input, LOCALE_ID, Inject } from "@angular/core";
import { formatDate, NgForOf } from "@angular/common";
import { CodeData } from "../../../data-model/code-data";
import { TimerComponent } from "../timer/timer.component";
import { GameType } from "../../../data-model/game-type";

@Component({
  selector: "app-code-table",
  imports: [NgForOf, TimerComponent],
  templateUrl: "./code-table.component.html",
  styleUrl: "./code-table.component.sass",
})
export class CodeTableComponent {
  protected _codeList: CodeData[] = [];

  @Input() tableType: GameType = GameType.NONE;
  @Input("codeList")
  set codeList(codeList: CodeData[]) {
    this._codeList = codeList.filter(
      (data: CodeData) => data.game === this.tableType
    );
  }

  constructor(@Inject(LOCALE_ID) protected locale: string) {}

  getUrl(code: string): string {
    switch (this.tableType) {
      case GameType.GENSHIN:
        return `https://genshin.hoyoverse.com/gift?code=${code}`;
      case GameType.HSR:
        return `https://hsr.hoyoverse.com/gift?code=${code}`;
      case GameType.ZZZ:
        return `https://zenless.hoyoverse.com/redemption?code=${code}`;
      default:
        return "";
    }
  }

  displayExpireTime(codeData: CodeData): string {
    return codeData.expireTime === "-"
      ? $localize`:@@forever_valid:Valid forever`
      : codeData.expireTime
      ? codeData.expireTime
      : $localize`:@@unknown:Unknown`;
  }

  displayAddTime(codeData: CodeData): string {
    if (codeData.addTime && codeData.addTime !== "-") {
      const dateTime = new Date(codeData.addTime);
      const currentYear = new Date().getFullYear();
      const year = dateTime.getFullYear();

      // This code was added within this year.
      if (year === currentYear) {
        return formatDate(
          codeData.addTime,
          $localize`:@@add_time_format:MMM d`,
          this.locale
        );
      } else {
        return formatDate(
          codeData.addTime,
          $localize`:@@add_time_with_year_format:MMM d, yyyy`,
          this.locale
        );
      }
    }
    return "";
  }
}
