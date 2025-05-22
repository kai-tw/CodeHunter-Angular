import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-timer",
  imports: [],
  templateUrl: "./timer.component.html",
  styleUrl: "./timer.component.sass",
})
export class TimerComponent {
  @Input() targetTime!: string;
  protected displayTime!: string;
  private isBrowser: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    if (
      this.targetTime.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/g)
    ) {
      this.refresh();
      if (this.isBrowser()) {
        setInterval(() => this.refresh(), 1000);
      }
    } else {
      this.displayTime = this.targetTime;
    }
  }

  refresh(): void {
    this.displayTime = this.getTimeLeftString(this.targetTime);
  }

  getTimeDiffString(a: string, b: string): string {
    let timeElapsed = new Date(a).getTime() - new Date(b).getTime();

    if (timeElapsed < 0) {
      return this.getTimeDiffString(b, a);
    } else if (timeElapsed === 0) {
      // Left time is 0.
      return "";
    }

    timeElapsed /= 1000;
    timeElapsed /= 60;
    const min = Math.floor(timeElapsed % 60);
    timeElapsed /= 60;
    const hour = Math.floor(timeElapsed % 24);
    timeElapsed /= 24;
    const day = Math.floor(timeElapsed);
    const d = [day, hour, min];
    const unit = [
      day > 1 ? $localize`:@@timer_days:days` : $localize`:@@timer_day:day`,
      hour > 1
        ? $localize`:@@timer_hours:hours`
        : $localize`:@@timer_hour:hour`,
      min > 1
        ? $localize`:@@timer_minutes:minutes`
        : $localize`:@@timer_minute:minute`,
    ];
    let timeLeftString = [];
    for (let i = 0, j = 0; j < 2 && i < d.length; i++) {
      if (d[i] === 0) {
        continue;
      }
      timeLeftString.push(d[i].toString());
      timeLeftString.push(unit[i]);
      j++;
    }
    return timeLeftString.length > 0
      ? timeLeftString.join(" ")
      : $localize`:@@timer_less_then_a_minute: Less than a minute.`;
  }

  getTimeLeftString(expireTime: string): string {
    const timeElapsed = new Date(expireTime).getTime() - new Date().getTime();

    if (timeElapsed <= 0) {
      return $localize`:@@timer_expired:Expired`;
    }

    const diffStr = this.getTimeDiffString(
      expireTime,
      new Date().toISOString()
    );

    return $localize`:@@timer_time_left:%s left`.replace("%s", diffStr);
  }
}
