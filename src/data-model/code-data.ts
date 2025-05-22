import { GameType } from "./game-type";

export class CodeData {
  static readonly eternalTime: string = "-";
  public game: GameType;
  public code: string = "";
  public expireTime: string = "";
  public addTime: string = "";
  public note: string = "";

  constructor(json: any) {
    this.game = json.game;
    this.code = json.code;
    this.expireTime = json.expireTime;
    this.addTime = json.addTime;
    this.note = json.note;
  }

  static compare(a: CodeData, b: CodeData): number {
    const expireTimeCompare = CodeData.compareTime(a.expireTime, b.expireTime);
    if (expireTimeCompare !== 0) {
      return expireTimeCompare;
    }

    const addTimeCompare = CodeData.compareTime(a.addTime, b.addTime);
    if (addTimeCompare !== 0) {
      return -addTimeCompare;
    }

    return a.code.localeCompare(b.code, "en", { sensitivity: "base" });
  }

  private static compareTime(a: string, b: string): number {
    const aStr = a === CodeData.eternalTime ? 8.64e15 : a ?? 8.64e15 - 1;
    const bStr = b === CodeData.eternalTime ? 8.64e15 : b ?? 8.64e15 - 1;
    return new Date(aStr).getTime() - new Date(bStr).getTime();
  }

  isValid(): boolean {
    const time = this.expireTime;

    // Time is null or undefined
    if (!time || time === CodeData.eternalTime) {
      return true;
    }

    // Time is matched with the pattern and is later than now
    return !!(
      time.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/g) &&
      new Date(time).getTime() > Date.now()
    );
  }

  isRecentlyAdded(): boolean {
    if (this.addTime && this.addTime !== "-") {
      const dateTime = new Date(this.addTime);
      const nowTime = new Date();

      // Within 7 days
      return nowTime.getTime() - dateTime.getTime() < 7 * 24 * 60 * 60 * 1000;
    }
    return false;
  }
}
