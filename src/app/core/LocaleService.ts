import LocalStorageKeys from "./LocalStorageKeys";

export default class LocaleService {
  static defaultLocale: string = "zh-Hant";
  static localeList: Array<{ locale: string; label: string }> = [
    { locale: "zh-Hant", label: "繁體中文" },
    { locale: "en-US", label: "English (United State)" },
    { locale: "ja", label: "日本語" },
  ];

  static navigateTo(locale: string): void {
    const localeUrl =
      locale === LocaleService.defaultLocale ? "" : `${locale}/`;
    window.location.href = `/${localeUrl}`;
  }

  static saveRecord(locale: string): void {
    localStorage.setItem(LocalStorageKeys.appLocale, locale);
  }

  static getRecord(): string | null {
    return localStorage.getItem(LocalStorageKeys.appLocale);
  }

  static getFromBrowser(): string {
    const localeMap = new Map<string, string>();

    LocaleService.localeList
      .map((item) => item.locale)
      .forEach((item) => {
        item
          .split("-")
          .map((el, i, arr) => (i === 0 ? el : arr[i - 1] + "-" + el))
          .forEach((el) => {
            if (!localeMap.has(el)) {
              localeMap.set(el, item);
            }
          });
      });

    for (const lang of navigator.languages) {
      if (localeMap.has(lang)) {
        return localeMap.get(lang) as string;
      }
    }

    return LocaleService.defaultLocale;
  }
}
