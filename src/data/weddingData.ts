export type Language = 'en' | 'kn';

export interface GalleryPhoto {
  id: string;
  src: string;
  title: Record<Language, string>;
  caption: Record<Language, string>;
  objectPosition?: string;
  featuredSpan?: 'tall' | 'wide' | 'standard';
}

export const VENUE_DETAILS = {
  name: {
    en: 'Sri Mookambika Convention Hall',
    kn: 'ಶ್ರೀ ಮೂಕಾಂಬಿಕ ಕನ್ವೆನ್ಷನ್ ಹಾಲ್',
  },
  address: {
    en: 'Madanayakanahalli, Tumkur Road, Bengaluru North – 562162',
    kn: 'ಮಾದನಾಯಕನಹಳ್ಳಿ, ತುಮಕೂರು ರಸ್ತೆ, ಬೆಂಗಳೂರು ಉತ್ತರ ತಾ|| 562162',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sri+Mookambika+Convention+Hall+Madanayakanahalli+Tumkur+Road+Bengaluru+562162',
  contacts: [
    { display: '+91 98869 04448', raw: '919886904448', tel: '+919886904448' },
    { display: '+91 95381 51082', raw: '919538151082', tel: '+919538151082' },
  ],
  muhurthamIso: '2026-12-03T08:20:00+05:30',
};

export const PRE_WEDDING_PHOTOS: GalleryPhoto[] = [
  {
    id: 'staircase-lotus',
    src: '/assets/aistudio/Screenshot_2026-11-21_at_11.03.56_PM_36242b68.png',
    title: {
      en: 'Brass Lamps & Lotus',
      kn: 'ದೀಪ ಬೆಳಕು ಮತ್ತು ಕಮಲ',
    },
    caption: {
      en: 'Framed by carved teakwood balusters and glowing brass nilavilakku lamps.',
      kn: 'ತೇಗದ ಮೆಟ್ಟಿಲುಗಳು ಮತ್ತು ಹಿತ್ತಾಳೆ ದೀಪಗಳ ಸನ್ನಿಧಿಯಲ್ಲಿ ಒಲವಿನ ಕ್ಷಣ.',
    },
    objectPosition: '50% 35%',
    featuredSpan: 'tall',
  },
  {
    id: 'veranda-book',
    src: '/assets/aistudio/Screenshot_2026-11-21_at_11.03.29_PM_bf706791.png',
    title: {
      en: 'Quiet Conversations',
      kn: 'ತೊಟ್ಟಿಯ ಜಗುಲಿಯ ಮಾತುಕತೆ',
    },
    caption: {
      en: 'Shared smiles along the traditional thotti mane veranda.',
      kn: 'ಸಾಂಪ್ರದಾಯಿಕ ತೊಟ್ಟಿ ಮನೆಯ ಕಂಬದ ಬಳಿ ಹಂಚಿಕೊಂಡ ನಗು.',
    },
    objectPosition: '50% 25%',
    featuredSpan: 'standard',
  },
  {
    id: 'golden-pillar',
    src: '/assets/aistudio/Screenshot_2026-11-21_at_11.03.47_PM_6f544277.png',
    title: {
      en: 'Afternoon Sunbeam',
      kn: 'ಹೊಂಬಿಸಿಲಿನ ಸವಿ',
    },
    caption: {
      en: 'Warm golden light across Mysore silk and champagne brocade.',
      kn: 'ರೇಷ್ಮೆ ಸೀರೆ ಮತ್ತು ಚಿನ್ನದ ಬಣ್ಣದ ಕುರ್ತಾದ ಮೇಲೆ ಬಿದ್ದ ಹೊಂಬಿಸಿಲು.',
    },
    objectPosition: '50% 25%',
    featuredSpan: 'standard',
  },
  {
    id: 'window-monochrome',
    src: '/assets/aistudio/Screenshot_2026-11-21_at_11.03.22_PM_7d86a11c.png',
    title: {
      en: 'Light Through Timber Shutters',
      kn: 'ಕಿಟಕಿಯ ನೆರಳು ಬೆಳಕು',
    },
    caption: {
      en: 'A serene monochrome study beneath arched wooden lattice shutters.',
      kn: 'ಕಮಾನು ಕಿಟಕಿಯ ಬೆಳಕು ನೆರಳಿನ ನಡುವೆ ಶಾಂತ ಸನ್ನಿವೇಶ.',
    },
    objectPosition: '50% 65%',
    featuredSpan: 'standard',
  },
  {
    id: 'courtyard-twirl-one',
    src: '/assets/aistudio/Screenshot_2026-11-21_at_11.03.14_PM_ec836e12.png',
    title: {
      en: 'Silk in Motion',
      kn: 'ರೇಷ್ಮೆ ಸೆರಗಿನ ನರ್ತನ',
    },
    caption: {
      en: 'Under terracotta Mangalore tiles, rose petals and woven zari.',
      kn: 'ಮಂಗಳೂರು ಹಂಚಿನ ಚಾವಣಿಯಡಿ ಗುಲಾಬಿ ದಳಗಳ ನಡುವೆ ಸೀರೆಯ ಚೆಲುವು.',
    },
    objectPosition: '50% 35%',
    featuredSpan: 'tall',
  },
  {
    id: 'courtyard-seated',
    src: '/assets/aistudio/Screenshot_2026-11-21_at_11.03.06_PM_b102796a.png',
    title: {
      en: 'Sacred Courtyard Calm',
      kn: 'ಅಂಗಳದ ಪ್ರಶಾಂತತೆ',
    },
    caption: {
      en: 'Beside lotus vessels, brass deepas, and scattered rose petals.',
      kn: 'ಕಮಲದ ಹೂವು, ಹಿತ್ತಾಳೆ ದೀಪ ಮತ್ತು ಗುಲಾಬಿ ದಳಗಳ ನಡುವೆ.',
    },
    objectPosition: '50% 45%',
    featuredSpan: 'standard',
  },
  {
    id: 'courtyard-twirl-two',
    src: '/assets/aistudio/Screenshot_2026-11-21_at_11.03.39_PM_ccab19c1.png',
    title: {
      en: 'Celebration in the Thotti',
      kn: 'ತೊಟ್ಟಿಯಂಗಳದ ಸಂಭ್ರಮ',
    },
    caption: {
      en: 'Looking ahead toward December mornings and lifelong vows.',
      kn: 'ಡಿಸೆಂಬರ್ ಶುಭ ಮುಹೂರ್ತದತ್ತ ಸಂಭ್ರಮದ ಹೆಜ್ಜೆ.',
    },
    objectPosition: '50% 40%',
    featuredSpan: 'standard',
  },
];

export const COPY = {
  brand: {
    en: 'Chethan & Harshitha',
    kn: 'ಚೇತನ್ · ಹರ್ಷಿತ',
  },
  nav: {
    invitation: { en: 'Invitation', kn: 'ಆಮಂತ್ರಣ' },
    ceremonies: { en: 'Ceremonies', kn: 'ಕಾರ್ಯಕ್ರಮಗಳು' },
    gallery: { en: 'Gallery', kn: 'ಛಾಯಾಚಿತ್ರಗಳು' },
    venue: { en: 'Venue', kn: 'ಸ್ಥಳ' },
    saveDate: { en: 'Save the Date', kn: 'ದಿನಾಂಕ ಉಳಿಸಿ' },
  },
  invocations: {
    en: [
      'Sri Kalabyraveshwara Swamy Prasanna',
      'Sri Bylanjaneya Swamy Prasanna',
      'Sri Lakshmidevi Krupe',
    ],
    kn: [
      'ಶ್ರೀ ಕಾಲಭೈರವೇಶ್ವರ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ',
      'ಶ್ರೀ ಬೈಲಾಂಜನೇಯ ಸ್ವಾಮಿ ಪ್ರಸನ್ನ',
      'ಶ್ರೀ ಲಕ್ಷ್ಮೀದೇವಿ ಕೃಪೆ',
    ],
  },
  hero: {
    kicker: {
      en: 'Shubha Vivaha · 02 & 03 December 2026 · Bengaluru',
      kn: 'ಶುಭ ವಿವಾಹ ಮಹೋತ್ಸವ · ಡಿಸೆಂಬರ್ 02 ಮತ್ತು 03, 2026 · ಬೆಂಗಳೂರು',
    },
    groomHonorific: { en: 'Chi. Ry.', kn: 'ಚಿ|| ರಾ||' },
    groomName: { en: 'Dr. Chethan. S', kn: 'ಡಾ. ಚೇತನ್. ಎಸ್' },
    groomDegree: 'MS, Ph.D.',
    brideHonorific: { en: 'Chi. Sou.', kn: 'ಚಿ|| ಸೌ||' },
    brideName: { en: 'Harshitha. P', kn: 'ಹರ್ಷಿತ. ಪಿ' },
    brideDegree: 'B.E.',
    verseKannada: [
      'ಅಕ್ಕರೆಯ ಅರಿಶಿನ ಹಚ್ಚಿ, ಅಂಗೈಯಲ್ಲಿ ಹಾಲನ್ನೆರೆದು,',
      'ಮುಂಗೈಯಲ್ಲಿ ಕಂಕಣ ಕಟ್ಟಿಸಿ, ನೆತ್ತಿಯ ಮೇಲೆ',
      'ಅಕ್ಷತೆ ಹಾಕಿ ಅನುರಾಗದಿಂದ ಹಾರೈಸಲು',
      'ಬನ್ನಿ ಆತ್ಮೀಯ ಬಂಧು-ಮಿತ್ರರೇ....',
    ],
    verseEnglish:
      'With affectionate turmeric, sacred milk poured upon the palms, the auspicious kankana tied at the wrist, and akshathe showered in love — come join us, dear family and friends, to bless the bride and groom.',
    primaryCta: {
      en: 'View Ceremonies & Venue',
      kn: 'ಮುಹೂರ್ತ ಮತ್ತು ಸ್ಥಳ ನೋಡಿ',
    },
    portraitCaption: {
      en: 'Pre-wedding portrait · Traditional courtyard series',
      kn: 'ಪ್ರೀ-ವೆಡ್ಡಿಂಗ್ ಛಾಯಾಚಿತ್ರ · ಸಾಂಪ್ರದಾಯಿಕ ಅಂಗಳದ ಸರಣಿ',
    },
  },
  countdown: {
    muhurthamLabel: { en: 'Countdown to Muhurtham', kn: 'ಮುಹೂರ್ತಕ್ಕೆ ಉಳಿದ ಸಮಯ' },
    days: { en: 'Days', kn: 'ದಿನ' },
    hours: { en: 'Hours', kn: 'ಗಂಟೆ' },
    mins: { en: 'Mins', kn: 'ನಿಮಿಷ' },
    secs: { en: 'Secs', kn: 'ಸೆಕೆಂಡ್' },
    celebrating: { en: 'Shubha Vivaha Celebration', kn: 'ಶುಭ ವಿವಾಹ ಸಂಭ್ರಮ' },
    receptionLabel: { en: 'Reception · Aarathakshathe', kn: 'ಆರತಕ್ಷತೆ' },
    receptionValue: { en: 'Wed, 02 Dec · 6:30 PM onwards', kn: '02-12-2026 ಬುಧವಾರ · ಸಂಜೆ 6:30 ರಿಂದ' },
    muhurthamDateLabel: { en: 'Shubha Muhurtham', kn: 'ಶುಭ ಮುಹೂರ್ತ' },
    muhurthamDateValue: { en: 'Thu, 03 Dec · 8:20 – 9:20 AM', kn: '03-12-2026 ಗುರುವಾರ · ಬೆ. 8:20 – 9:20' },
    lagnaLabel: { en: 'Lagna & Venue', kn: 'ಲಗ್ನ ಮತ್ತು ಸ್ಥಳ' },
    lagnaValue: {
      en: 'Dhanassu · Tumkur Rd, Bengaluru',
      kn: 'ಧನಸ್ಸು ಲಗ್ನ · ತುಮಕೂರು ರಸ್ತೆ, ಬೆಂಗಳೂರು',
    },
  },
  invitationSection: {
    eyebrow: { en: 'The Families & Invitation', kn: 'ಕುಟುಂಬದ ಆತ್ಮೀಯ ಆಹ್ವಾನ' },
    heading: {
      en: 'With the blessings of elders, we invite you to celebrate with us',
      kn: 'ಗುರು-ಹಿರಿಯರ ಆಶೀರ್ವಾದದೊಂದಿಗೆ ತಮ್ಮ ಸಕುಟುಂಬ ಪರಿವಾರದ ಆಗಮನವನ್ನು ಬಯಸುತ್ತೇವೆ',
    },
    hostsTitle: { en: 'Hosted By', kn: 'ವಿಜ್ಞಾಪನೆಗಳು' },
    hostsName: {
      en: 'Smt. Late Gowramma & Sri Siddappa',
      kn: 'ಶ್ರೀಮತಿ ಲೇಟ್ ಗೌರಮ್ಮ ಮತ್ತು ಶ್ರೀ ಸಿದ್ದಪ್ಪ',
    },
    hostsAddress: {
      en: 'Adakamaranahalli, Dasanapura Hobli, Bengaluru North Taluk',
      kn: 'ಅಡಕಮಾರನಹಳ್ಳಿ, ದಾಸನಪುರ ಹೋ||, ಬೆಂಗಳೂರು ಉತ್ತರ ತಾ||',
    },
    solicitText: {
      en: 'We solicit your gracious presence with family & friends on the auspicious occasion of the Marriage of our son',
      kn: 'ಇವರ ಸುಪುತ್ರನಾದ ಚಿ|| ರಾ|| ಡಾ. ಚೇತನ್. ಎಸ್ ಮತ್ತು ಚಿ|| ಸೌ|| ಹರ್ಷಿತ. ಪಿ ಇವರ ಶುಭವಿವಾಹ ಮಹೋತ್ಸವವನ್ನು ನೆರವೇರಿಸಲು ಗುರು-ಹಿರಿಯರು ನಿಶ್ಚಯಿಸಿರುವುದರಿಂದ ತಾವುಗಳು ಸಕುಟುಂಬ ಪರಿವಾರ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ ವಧು-ವರರನ್ನು ಆಶೀರ್ವದಿಸಬೇಕಾಗಿ ವಿನಂತಿ.',
    },
    brideParentsLabel: { en: 'Eldest Daughter of', kn: 'ವಧುವಿನ ಪೋಷಕರು' },
    brideParentsName: {
      en: 'Smt. Shantha D & Sri Paramesh Gowda M',
      kn: 'ಶ್ರೀಮತಿ ಶಾಂತ ಡಿ ಮತ್ತು ಶ್ರೀ ಪರಮೇಶ್ ಗೌಡ. ಎಂ',
    },
    brideParentsAddress: {
      en: 'No. 1866, 8th Block, Vishweshwaraiah Layout, Annapoorneshwari Nagar, Bengaluru – 560091',
      kn: 'ನಂ. 1866, 8ನೇ ಬ್ಲಾಕ್, ವಿಶ್ವೇಶ್ವರಯ್ಯ ಲೇಔಟ್, ಅನ್ನಪೂರ್ಣೇಶ್ವರಿ ನಗರ, ಬೆಂಗಳೂರು – 560091',
    },
    awaitingTitle: { en: 'Awaiting Your Presence', kn: 'ತಮ್ಮ ಆಗಮನಾಭಿಲಾಷಿಗಳು' },
    awaitingNames: {
      en: [
        'Smt. Bindu. S & Sri Manjunath. B (ABB)',
        'Smt. Sandhya. S & Sri Dilu. V.R',
        'Grishma, Dhuvin & Shreyank Raghav',
      ],
      kn: [
        'ಶ್ರೀಮತಿ ಬಿಂದು. ಎಸ್ ಮತ್ತು ಶ್ರೀ ಮಂಜುನಾಥ್. ಬಿ (ABB)',
        'ಶ್ರೀಮತಿ ಸಂಧ್ಯಾ. ಎಸ್ ಮತ್ತು ಶ್ರೀ ದಿಲು ವಿ.ಆರ್',
        'ಕು|| ಗ್ರೀಷ್ಮ, ಚಿ|| ಧುವಿನ್ ಮತ್ತು ಚಿ|| ಶ್ರೇಯಾಂಕ್ ರಾಘವ್',
      ],
    },
    compliments: {
      en: 'With Best Compliments from : Relatives and Friends',
      kn: 'ಬಂಧು-ಮಿತ್ರರ ಶುಭಾಶಯಗಳೊಂದಿಗೆ',
    },
  },
  ceremoniesSection: {
    eyebrow: { en: 'Panchanga & Schedule', kn: 'ಪಂಚಾಂಗ ಮತ್ತು ಕಾರ್ಯಕ್ರಮ ವಿವರ' },
    heading: {
      en: 'Auspicious Timings & Rituals',
      kn: 'ಶುಭ ಮುಹೂರ್ತ ಮತ್ತು ವಿವಾಹ ಕಾರ್ಯಕ್ರಮಗಳು',
    },
    panchangaLine: {
      en: 'Swasthi Sri Vijayabhyudaya Shalivahana Shaka 1948 · Sri Parabhava Nama Samvatsara · Dakshinayana · Sharad Ruthu · Karthika Masa · Krishna Paksha',
      kn: 'ಸ್ವಸ್ತಿಶ್ರೀ ವಿಜಯಾಭ್ಯುದಯ ಶಾಲಿವಾಹನ ಶಕ ವರ್ಷ 1948ನೇ · ಶ್ರೀ ಪರಾಭವನಾಮ ಸಂವತ್ಸರದ ದಕ್ಷಿಣಾಯನೆ · ಶರದ್‌ಋತು · ಕಾರ್ತಿಕ ಮಾಸ · ಕೃಷ್ಣ ಪಕ್ಷ',
    },
    events: [
      {
        index: '01',
        name: { en: 'Prathama Shastra & Devatha Karya', kn: 'ಪ್ರಥಮಶಾಸ್ತ್ರ ಹಾಗೂ ದೇವತಾಕಾರ್ಯ' },
        tithi: { en: 'Navami', kn: 'ನವಮಿ' },
        date: { en: 'Wednesday, 02 December 2026', kn: '02-12-2026, ಬುಧವಾರ' },
        time: { en: 'Morning Rituals', kn: 'ಬೆಳಗಿನ ಶಾಸ್ತ್ರಗಳು' },
        location: {
          en: 'Adakamaranahalli Residence, Bengaluru North',
          kn: 'ಅಡಕಮಾರನಹಳ್ಳಿ ನಿವಾಸ, ಬೆಂಗಳೂರು ಉತ್ತರ',
        },
        description: {
          en: 'Traditional pre-wedding invocations, turmeric blessings, and ancestral worship welcoming the auspicious marriage festivities.',
          kn: 'ಮದುವೆಯ ಪೂರ್ವಭಾವಿ ಶುಭ ಶಾಸ್ತ್ರಗಳು, ಅರಿಶಿನ ಶಾಸ್ತ್ರ ಮತ್ತು ಕುಲದೇವತಾ ಪೂಜೆ.',
        },
      },
      {
        index: '02',
        name: { en: 'Reception (Aarathakshathe)', kn: 'ಆರತಕ್ಷತೆ' },
        tithi: { en: 'Navami Evening', kn: 'ನವಮಿ ಸಂಜೆ' },
        date: { en: 'Wednesday, 02 December 2026', kn: '02-12-2026, ಬುಧವಾರ' },
        time: { en: '6:30 PM onwards', kn: 'ಸಂಜೆ 6:30 ರಿಂದ' },
        location: {
          en: 'Sri Mookambika Convention Hall, Tumkur Road',
          kn: 'ಶ್ರೀ ಮೂಕಾಂಬಿಕ ಕನ್ವೆನ್ಷನ್ ಹಾಲ್, ತುಮಕೂರು ರಸ್ತೆ',
        },
        description: {
          en: 'An evening of warm welcomes, greetings, blessings, and celebratory dinner with extended family and friends.',
          kn: 'ಬಂಧು-ಮಿತ್ರರ ಆತ್ಮೀಯ ಭೇಟಿ, ವಧು-ವರರಿಗೆ ಶುಭ ಹಾರೈಕೆ ಹಾಗೂ ಭೋಜನ ಕೂಟ.',
        },
      },
      {
        index: '03',
        name: { en: 'Shubha Muhurtham', kn: 'ಶುಭ ಮುಹೂರ್ತ' },
        tithi: { en: 'Dashami · Dhanassu Lagna', kn: 'ದಶಮಿ · ಧನಸ್ಸು ಲಗ್ನ' },
        date: { en: 'Thursday, 03 December 2026', kn: '03-12-2026, ಗುರುವಾರ' },
        time: { en: '8:20 AM to 9:20 AM', kn: 'ಬೆಳಿಗ್ಗೆ 8:20 ರಿಂದ 9:20 ರೊಳಗೆ' },
        location: {
          en: 'Sri Mookambika Convention Hall, Tumkur Road',
          kn: 'ಶ್ರೀ ಮೂಕಾಂಬಿಕ ಕನ್ವೆನ್ಷನ್ ಹಾಲ್, ತುಮಕೂರು ರಸ್ತೆ',
        },
        description: {
          en: 'The sacred Vedic marriage ceremony in Dhanassu Lagna — tying the Mangalsutra and showering Akshathe in blessing.',
          kn: 'ಶುಭ ಧನಸ್ಸು ಲಗ್ನದಲ್ಲಿ ಮಾಂಗಲ್ಯ ಧಾರಣೆ ಹಾಗೂ ಸಕಲ ಬಂಧು-ಮಿತ್ರರಿಂದ ಅಕ್ಷತಾರೋಪಣೆ.',
        },
      },
    ],
    addCalendar: { en: 'Add to Calendar', kn: 'ಕ್ಯಾಲೆಂಡರ್‌ಗೆ ಸೇರಿಸಿ' },
  },
  gallerySection: {
    eyebrow: { en: 'Pre-Wedding Chronicle', kn: 'ಪ್ರೀ-ವೆಡ್ಡಿಂಗ್ ಛಾಯಾಚಿತ್ರ ಸಂಪುಟ' },
    heading: {
      en: 'Moments in Silk, Teak & Sunlight',
      kn: 'ರೇಷ್ಮೆ, ತೇಗ ಮತ್ತು ಬೆಳಕಿನ ಸುಂದರ ಕ್ಷಣಗಳು',
    },
    subtext: {
      en: 'Select any photograph to view full-resolution frames from the courtyard photoshoot.',
      kn: 'ಸಂಪೂರ್ಣ ಚಿತ್ರವನ್ನು ನೋಡಲು ಯಾವುದೇ ಛಾಯಾಚಿತ್ರದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    },
  },
  venueSection: {
    heading: {
      en: 'Join Us at Sri Mookambika Convention Hall',
      kn: 'ಶ್ರೀ ಮೂಕಾಂಬಿಕ ಕನ್ವೆನ್ಷನ್ ಹಾಲ್‌ನಲ್ಲಿ ತಮಗೆ ಸ್ವಾಗತ',
    },
    directionsCta: { en: 'Open in Google Maps', kn: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ ತೆರೆಯಿರಿ' },
    copyAddress: { en: 'Copy Address', kn: 'ವಿಳಾಸ ನಕಲಿಸಿ' },
    copied: { en: 'Address Copied', kn: 'ವಿಳಾಸ ನಕಲಿಸಲಾಗಿದೆ' },
    contactTitle: { en: 'Family Contact Numbers', kn: 'ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳು' },
  },
};

export function downloadWeddingIcs(eventType: 'all' | 'reception' | 'muhurtham' = 'all') {
  const events: string[] = [];

  if (eventType === 'all' || eventType === 'reception') {
    events.push(
      [
        'BEGIN:VEVENT',
        'UID:chethan-harshitha-reception-2026@shubhavivaha',
        'DTSTAMP:20261121T090000Z',
        'DTSTART:20261202T130000Z',
        'DTEND:20261202T163000Z',
        'SUMMARY:Chethan & Harshitha Wedding Reception (Aarathakshathe)',
        'LOCATION:Sri Mookambika Convention Hall, Madanayakanahalli, Tumkur Road, Bengaluru North 562162',
        'DESCRIPTION:Wedding Reception of Chi. Ry. Dr. Chethan S and Chi. Sou. Harshitha P. 6:30 PM IST onwards.',
        'END:VEVENT',
      ].join('\r\n')
    );
  }

  if (eventType === 'all' || eventType === 'muhurtham') {
    events.push(
      [
        'BEGIN:VEVENT',
        'UID:chethan-harshitha-muhurtham-2026@shubhavivaha',
        'DTSTAMP:20261121T090000Z',
        'DTSTART:20261203T025000Z',
        'DTEND:20261203T040000Z',
        'SUMMARY:Chethan & Harshitha Shubha Muhurtham (Dhanassu Lagna)',
        'LOCATION:Sri Mookambika Convention Hall, Madanayakanahalli, Tumkur Road, Bengaluru North 562162',
        'DESCRIPTION:Shubha Muhurtham of Chi. Ry. Dr. Chethan S & Chi. Sou. Harshitha P (8:20 AM - 9:20 AM IST, Dhanassu Lagna). Hosted by Smt. Late Gowramma & Sri Siddappa.',
        'END:VEVENT',
      ].join('\r\n')
    );
  }

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chethan & Harshitha//Shubha Vivaha//EN',
    'CALSCALE:GREGORIAN',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download =
    eventType === 'reception'
      ? 'Chethan-Harshitha-Reception.ics'
      : eventType === 'muhurtham'
      ? 'Chethan-Harshitha-Muhurtham.ics'
      : 'Chethan-Harshitha-Wedding-2026.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
