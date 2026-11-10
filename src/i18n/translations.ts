export * from "./types";
import { SupportedLanguage, TranslationDictionary } from "./types";
import { en } from "./translations/en";
import { bn } from "./translations/bn";
import { de } from "./translations/de";
import { fr } from "./translations/fr";
import { es } from "./translations/es";
import { it } from "./translations/it";
import { zh } from "./translations/zh";
import { ar } from "./translations/ar";
import { ja } from "./translations/ja";
import { ko } from "./translations/ko";
import { tr } from "./translations/tr";

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  bn,
  de,
  fr,
  es,
  it,
  zh,
  ar,
  ja,
  ko,
  tr,
};
