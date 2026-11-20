export interface LeatherOptionGroup {
  groupLabelEn: string;
  groupLabelBn: string;
  options: {
    value: string;
    labelEn: string;
    labelBn: string;
  }[];
}

export const LEATHER_FORM_OPTION_GROUPS: LeatherOptionGroup[] = [
  {
    groupLabelEn: "Wet Blue & Wet White (Cow, Goat & Buffalo)",
    groupLabelBn: "ওয়েট ব্লু ও ওয়েট হোয়াইট (গরু, ছাগল ও মহিষ)",
    options: [
      {
        value: "Wet Blue Chrome Tanned Cow Hides (Full / Top Grain)",
        labelEn: "Wet Blue Chrome Tanned Cow Hides (Full / Top Grain)",
        labelBn: "ওয়েট ব্লু ক্রোম ট্যানড কাউ হাইড (ফুল / টপ গ্রেইন)",
      },
      {
        value: "Wet Blue Chrome Tanned Goat Skins",
        labelEn: "Wet Blue Chrome Tanned Goat Skins",
        labelBn: "ওয়েট ব্লু ক্রোম ট্যানড গোট স্কিন (ছাগল)",
      },
      {
        value: "Wet Blue Chrome Tanned Buffalo Hides",
        labelEn: "Wet Blue Chrome Tanned Buffalo Hides",
        labelBn: "ওয়েট ব্লু ক্রোম ট্যানড বাফেলো হাইড (মহিষ)",
      },
      {
        value: "Wet Blue Chrome Tanned Cow & Buffalo Split",
        labelEn: "Wet Blue Chrome Tanned Cow & Buffalo Split",
        labelBn: "ওয়েট ব্লু ক্রোম ট্যানড কাউ ও বাফেলো স্প্লিট",
      },
      {
        value: "Wet White Chrome-Free Leather (Cow & Goat)",
        labelEn: "Wet White Chrome-Free Leather (Cow & Goat)",
        labelBn: "ওয়েট হোয়াইট ক্রোম-ফ্রি লেদার (গরু ও ছাগল)",
      },
    ],
  },
  {
    groupLabelEn: "Crust Leather (Cow & Goat — All Tannages)",
    groupLabelBn: "ক্রাস্ট লেদার (গরু ও ছাগল — সব ট্যানিং)",
    options: [
      {
        value: "Crust Chrome Tanned Cow & Goat Leather (Full / Top / Corrected)",
        labelEn: "Crust Chrome Tanned Cow & Goat Leather (Full / Top / Corrected)",
        labelBn: "ক্রাস্ট ক্রোম ট্যানড গরু ও ছাগলের চামড়া",
      },
      {
        value: "Crust Vegetable Tanned Cow & Goat Leather",
        labelEn: "Crust Vegetable Tanned Cow & Goat Leather",
        labelBn: "ক্রাস্ট ভেজিটেবল ট্যানড গরু ও ছাগলের চামড়া",
      },
      {
        value: "Crust Semi-Chrome & Semi-Veg Cow & Goat Leather",
        labelEn: "Crust Semi-Chrome & Semi-Veg Cow & Goat Leather",
        labelBn: "ক্রাস্ট সেমি-ক্রোম ও সেমি-ভেজ গরু ও ছাগলের চামড়া",
      },
      {
        value: "Crust Combination & Synthetic Tanned Cow & Goat Leather",
        labelEn: "Crust Combination & Synthetic Tanned Cow & Goat Leather",
        labelBn: "ক্রাস্ট কম্বিনেশন ও সিনথেটিক গরু ও ছাগলের চামড়া",
      },
      {
        value: "Crust Chrome-Free & Oil-Tanned Leather (Cow & Goat)",
        labelEn: "Crust Chrome-Free & Oil-Tanned Leather (Cow & Goat)",
        labelBn: "ক্রাস্ট ক্রোম-ফ্রি ও অয়েল-ট্যানড (গরু ও ছাগল)",
      },
      {
        value: "Crust Nubuck & Suede Chrome Crust (Cow & Goat)",
        labelEn: "Crust Nubuck & Suede Chrome Crust (Cow & Goat)",
        labelBn: "ক্রাস্ট নুবাক ও সুয়েড ক্রাস্ট (গরু ও ছাগল)",
      },
    ],
  },
  {
    groupLabelEn: "Finished Leather (Cow & Goat — All Finishes)",
    groupLabelBn: "ফিনিশড লেদার (গরু ও ছাগল — সব ফিনিশ)",
    options: [
      {
        value: "Finished Chrome Tanned Cow Leather (Aniline / Semi-Aniline / Nappa)",
        labelEn: "Finished Chrome Tanned Cow Leather (Aniline / Semi-Aniline / Nappa)",
        labelBn: "ফিনিশড ক্রোম কাউ লেদার (অ্যানিলিন / সেমি-অ্যানিলিন / নাপ্পা)",
      },
      {
        value: "Finished Chrome Tanned Goat Leather (Aniline / Glazed Kid / Nappa)",
        labelEn: "Finished Chrome Tanned Goat Leather (Aniline / Glazed Kid / Nappa)",
        labelBn: "ফিনিশড ক্রোম গোট লেদার (অ্যানিলিন / গ্লেজড কিড / নাপ্পা)",
      },
      {
        value: "Finished Full Grain Pull-Up / Crazy Horse / Oily-Waxy (Cow & Goat)",
        labelEn: "Finished Full Grain Pull-Up / Crazy Horse / Oily-Waxy (Cow & Goat)",
        labelBn: "ফিনিশড ফুল গ্রেইন পুল-আপ / ক্রেজি হর্স / অয়েলি-ওয়াক্সি",
      },
      {
        value: "Finished Pigmented & Corrected Grain Embossed (Saffiano / Pebble / Box)",
        labelEn: "Finished Pigmented & Corrected Grain Embossed (Saffiano / Pebble / Box)",
        labelBn: "ফিনিশড পিগমেন্টেড ও এমবসড (সাফিয়ানো / পেবল / বক্স)",
      },
      {
        value: "Finished Vegetable Tanned Cow & Goat Leather",
        labelEn: "Finished Vegetable Tanned Cow & Goat Leather",
        labelBn: "ফিনিশড ভেজিটেবল ট্যানড গরু ও ছাগলের চামড়া",
      },
      {
        value: "Finished Semi-Chrome & Semi-Veg Leather (Cow & Goat)",
        labelEn: "Finished Semi-Chrome & Semi-Veg Leather (Cow & Goat)",
        labelBn: "ফিনিশড সেমি-ক্রোম ও সেমি-ভেজ (গরু ও ছাগল)",
      },
      {
        value: "Finished Combination, Oil-Tanned & Chrome-Free (Cow & Goat)",
        labelEn: "Finished Combination, Oil-Tanned & Chrome-Free (Cow & Goat)",
        labelBn: "ফিনিশড কম্বিনেশন, অয়েল-ট্যানড ও ক্রোম-ফ্রি",
      },
    ],
  },
  {
    groupLabelEn: "Split, Suede & Shoe Lining Leather",
    groupLabelBn: "স্প্লিট, সুয়েড ও শু লাইনিং লেদার",
    options: [
      {
        value: "Cow Split Suede & Work Glove / Safety Split Leather",
        labelEn: "Cow Split Suede & Work Glove / Safety Split Leather",
        labelBn: "কাউ স্প্লিট সুয়েড ও ওয়ার্ক গ্লাভস স্প্লিট লেদার",
      },
      {
        value: "Laminated & Bicast Split Leather (Cow)",
        labelEn: "Laminated & Bicast Split Leather (Cow)",
        labelBn: "ল্যামিনেটেড ও বাইকাস্ট স্প্লিট লেদার (গরু)",
      },
      {
        value: "Goat Shoe & Bag Lining Leather (Aniline / Glazed)",
        labelEn: "Goat Shoe & Bag Lining Leather (Aniline / Glazed)",
        labelBn: "গোট শু ও ব্যাগ লাইনিং লেদার (অ্যানিলিন / গ্লেজড)",
      },
      {
        value: "Cow Shoe & Bag Lining Leather (Softee / Synthetic)",
        labelEn: "Cow Shoe & Bag Lining Leather (Softee / Synthetic)",
        labelBn: "কাউ শু ও ব্যাগ লাইনিং লেদার (সফটি / সিনথেটিক)",
      },
    ],
  },
  {
    groupLabelEn: "Custom Specification",
    groupLabelBn: "কাস্টম স্পেসিফিকেশন",
    options: [
      {
        value: "Custom Leather Development (Match Physical Swatch / Tech Pack)",
        labelEn: "Custom Leather Development (Match Physical Swatch / Tech Pack)",
        labelBn: "কাস্টম লেদার ডেভেলপমেন্ট (স্যাম্পল বা টেক প্যাক অনুযায়ী)",
      },
    ],
  },
];

export const ALL_LEATHER_FORM_VALUES: string[] = LEATHER_FORM_OPTION_GROUPS.flatMap((g) =>
  g.options.map((o) => o.value)
);
