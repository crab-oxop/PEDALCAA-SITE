// Central place for business info placeholders.
// TODO: Replace every value below with the real, finalized business details
// before launch (legal business name, insurance info, real phone/email, etc).
// Everything on the site should read from here so a rename is a one-file edit.

export const siteConfig = {
  businessName: "PedalCAA", // TODO: [PLACEHOLDER] finalize real business name
  legalName: "PedalCAA Inc.", // TODO: [PLACEHOLDER] confirm legal entity name once incorporated
  tagline: "Your bike breaks down, we come to you.",
  shortDescription:
    "On-demand mobile bike repair for the Greater Toronto Area. A mechanic comes to you — no hauling your bike across town.",

  phoneDisplay: "(XXX) XXX-XXXX", // TODO: [PLACEHOLDER] real phone number
  phoneHref: "tel:+1XXXXXXXXXX", // TODO: [PLACEHOLDER] real phone number in tel: format
  email: "hello@pedalcaa.com", // TODO: [PLACEHOLDER] real support inbox

  serviceArea: {
    region: "Greater Toronto Area",
    primaryCities: ["Toronto", "Richmond Hill"],
    expandingSoon: ["Markham", "Vaughan", "North York", "Mississauga"], // TODO: [PLACEHOLDER] confirm expansion order
  },

  hours: {
    weekday: "7:00 AM – 8:00 PM",
    weekend: "8:00 AM – 6:00 PM",
    note: "Emergency roadside dispatch available during service hours, 7 days a week.",
  },

  responseTime: {
    emergencyMinutes: "30–60 min", // TODO: [PLACEHOLDER] confirm realistic response time once mechanic capacity is known
    scheduledWindow: "2-hour arrival window",
  },

  social: {
    instagram: "https://instagram.com/pedalcaa", // TODO: [PLACEHOLDER]
    facebook: "https://facebook.com/pedalcaa", // TODO: [PLACEHOLDER]
  },

  legal: {
    // TODO: replace with real insurance/liability language from legal counsel before launch
    insuranceNote: "Every mechanic is insured and background-checked.",
    // TODO: legal to draft real waiver copy before launch
    liabilityNote:
      "A standard liability waiver is reviewed and signed at first booking.",
  },
} as const;

export type SiteConfig = typeof siteConfig;
