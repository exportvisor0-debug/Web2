export type SupportedLanguage =
  | "en"
  | "bn"
  | "de"
  | "fr"
  | "es"
  | "it"
  | "zh"
  | "ar"
  | "ja"
  | "ko"
  | "tr";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
];

export interface TranslationDictionary {
  nav: {
    about: string;
    leather: string;
    terms: string;
    knowledge: string;
    process: string;
    quality: string;
    contact: string;
    companyProfile: string;
    requestQuote: string;
    whatsApp: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    requestQuote: string;
    exploreCatalogue: string;
    pricingBasis: string;
    pricingValue: string;
    pricingNote: string;
    volumeBasis: string;
    volumeValue: string;
    volumeNote: string;
    leadTimeBasis: string;
    leadTimeValue: string;
    leadTimeNote: string;
    paymentBasis: string;
    paymentValue: string;
    paymentNote: string;
  };
  about: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    point1Title: string;
    point1Desc: string;
    point2Title: string;
    point2Desc: string;
    point3Title: string;
    point3Desc: string;
    point4Title: string;
    point4Desc: string;
    btnProfile: string;
    btnQuote: string;
  };
  catalogue: {
    kicker: string;
    title: string;
    subtitle: string;
    sourcingNoteTitle: string;
    sourcingNote: string;
    searchPlaceholder: string;
    viewSpecs: string;
    requestQuote: string;
    customPromptTitle: string;
    customPromptDesc: string;
    customPromptCta: string;
    filterAll: string;
    filterFinished: string;
    filterCrust: string;
    filterWetBlue: string;
  };
  commercial: {
    kicker: string;
    title: string;
    subtitle: string;
    moqTitle: string;
    moqDesc: string;
    pricingTitle: string;
    pricingDesc: string;
    leadTimeTitle: string;
    leadTimeDesc: string;
    paymentTitle: string;
    paymentDesc: string;
    notice: string;
  };
  process: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    stage1Title: string;
    stage1Desc: string;
    stage2Title: string;
    stage2Desc: string;
    stage3Title: string;
    stage3Desc: string;
    stage4Title: string;
    stage4Desc: string;
    stage5Title: string;
    stage5Desc: string;
    stage6Title: string;
    stage6Desc: string;
    stage7Title: string;
    stage7Desc: string;
    stage8Title: string;
    stage8Desc: string;
    stage9Title: string;
    stage9Desc: string;
    stage10Title: string;
    stage10Desc: string;
    cta: string;
  };
  quality: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
    standardsTitle: string;
    standardsDesc: string;
  };
  knowledgeHub: {
    kicker: string;
    title: string;
    subtitle: string;
    consultationCta: string;
    allTips: string;
    wetBlue: string;
    crust: string;
    finished: string;
    receiving: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerCta: string;
  };
  marketInsights: {
    kicker: string;
    title: string;
    subtitle: string;
    badge: string;
    readMore: string;
  };
  bangladesh: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
    benefit4Title: string;
    benefit4Desc: string;
  };
  shipping: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    port1Title: string;
    port1Desc: string;
    port2Title: string;
    port2Desc: string;
    docTitle: string;
    docDesc: string;
  };
  globalTrade: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  whyUs: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    reason1Title: string;
    reason1Desc: string;
    reason2Title: string;
    reason2Desc: string;
    reason3Title: string;
    reason3Desc: string;
    reason4Title: string;
    reason4Desc: string;
  };
  inquiry: {
    kicker: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    leatherTypeLabel: string;
    leatherTypePlaceholder: string;
    quantityLabel: string;
    quantityPlaceholder: string;
    portLabel: string;
    portPlaceholder: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successDesc: string;
    officeTitle: string;
    openMaps: string;
    sendInquiry: string;
  };
  faq: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };
  footer: {
    tagline: string;
    desc: string;
    registeredHub: string;
    quickLinks: string;
    categories: string;
    directDesk: string;
    allRightsReserved: string;
    openInMaps: string;
    companyProfilePdf: string;
  };
  common: {
    shareSection: string;
    linkCopied: string;
  };
}
