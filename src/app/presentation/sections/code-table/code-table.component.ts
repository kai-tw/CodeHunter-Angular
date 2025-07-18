import { Component, Input, LOCALE_ID, Inject } from "@angular/core";
import { formatDate, NgForOf } from "@angular/common";
import { CodeData } from "../../../../data-model/code-data";
import { GameType } from "../../../../data-model/game-type";
import { TimerComponent } from "../../components/timer/timer.component";
import { BadgeComponent } from "../../components/badge/badge.component";

@Component({
  selector: "app-code-table",
  imports: [NgForOf, TimerComponent, BadgeComponent],
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

  clickHandler(code: string): void {
    switch (this.tableType) {
      case GameType.GENSHIN:
        window.open(`https://genshin.hoyoverse.com/gift?code=${code}`, "_blank");
        break;
      case GameType.HSR:
        window.open(`https://hsr.hoyoverse.com/gift?code=${code}`, "_blank");
        break;
      case GameType.ZZZ:
        window.open(`https://zenless.hoyoverse.com/redemption?code=${code}`, "_blank");
        break;
      case GameType.WUTHERING_WAVES:
        this.copyCode(code).then(() => {
          window.alert($localize`:@@copied_to_clipboard:Copy To Clipboard!`);
        });
        break;
      default:
    }
  }

  private async copyCode(val: string){
    // Create temporary textarea for copying.
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);

    // Select all contents in the textarea
    selBox.focus();
    selBox.select();
    selBox.setSelectionRange(0, 99999); // For mobile devices
    await navigator.clipboard.writeText(selBox.value);

    // Copying is done. Remove the temporary textarea
    document.body.removeChild(selBox);
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
