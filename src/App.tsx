import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUp,
  Calendar,
  CalendarPlus,
  Check,
  Copy,
  ExternalLink,
  Images,
  MapPin,
  Phone,
  ScrollText,
} from 'lucide-react';
import {
  COPY,
  Language,
  PRE_WEDDING_PHOTOS,
  VENUE_DETAILS,
  downloadWeddingIcs,
} from './data/weddingData';
import { CoupleMonogram, OrnamentalDivider } from './components/MonogramAndMotifs';
import { CountdownStrip } from './components/CountdownStrip';
import { GalleryLightbox, LightboxSlide } from './components/GalleryLightbox';

interface ResilientPhotoProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  objectPosition?: string;
}

function ResilientPhoto({
  src,
  alt,
  title,
  className = '',
  objectPosition = '50% 35%',
}: ResilientPhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`w-full h-full bg-[#EAE2D3] flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <CoupleMonogram className="w-10 h-10 opacity-60" />
        <p className="mt-3 font-editorial text-lg text-[#4A3F37]">{title}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{ objectPosition }}
      className={className}
    />
  );
}

type SectionId = 'invitation' | 'ceremonies' | 'gallery' | 'venue';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('invitation');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections: SectionId[] = ['venue', 'gallery', 'ceremonies', 'invitation'];
      const offset = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('invitation');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gallerySlides: LightboxSlide[] = useMemo(
    () =>
      PRE_WEDDING_PHOTOS.map((photo) => ({
        id: photo.id,
        src: photo.src,
        title: photo.title[lang],
        subtitle: photo.caption[lang],
      })),
    [lang]
  );

  const openGalleryLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleCopyAddress = async () => {
    const fullAddress = `${VENUE_DETAILS.name[lang]}, ${VENUE_DETAILS.address[lang]}`;
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2400);
    } catch {
      setCopiedAddress(false);
    }
  };

  const heroPhoto = PRE_WEDDING_PHOTOS[0];
  const verandaPhoto = PRE_WEDDING_PHOTOS[1];

  const mobileTabs: { id: SectionId; label: string; icon: typeof ScrollText }[] = [
    { id: 'invitation', label: COPY.nav.invitation[lang], icon: ScrollText },
    { id: 'ceremonies', label: COPY.nav.ceremonies[lang], icon: Calendar },
    { id: 'gallery', label: COPY.nav.gallery[lang], icon: Images },
    { id: 'venue', label: COPY.nav.venue[lang], icon: MapPin },
  ];

  return (
    <div
      className={`min-h-screen bg-[#FAF7F2] text-[#1C1714] pb-14 md:pb-0 ${
        lang === 'kn' ? 'font-kannada' : ''
      }`}
    >
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#DFD5C5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 md:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-editorial text-lg sm:text-2xl font-semibold tracking-tight text-[#1C1714] whitespace-nowrap shrink-0 truncate"
          >
            {COPY.brand[lang]}
          </a>

          {/* Zone 2: 4 concise single-line nav links (desktop) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#574A41]"
          >
            <a
              href="#invitation"
              className="hover:text-[#9F2B42] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.invitation[lang]}
            </a>
            <a
              href="#ceremonies"
              className="hover:text-[#9F2B42] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.ceremonies[lang]}
            </a>
            <a
              href="#gallery"
              className="hover:text-[#9F2B42] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.gallery[lang]}
            </a>
            <a
              href="#venue"
              className="hover:text-[#9F2B42] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.venue[lang]}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => downloadWeddingIcs('all')}
              className="inline-flex items-center gap-1.5 sm:gap-2 min-h-[36px] md:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#9F2B42] text-[#FAF7F2] text-xs sm:text-sm font-medium hover:bg-[#842235] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F2B42] focus-visible:ring-offset-2"
            >
              <CalendarPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{COPY.nav.saveDate[lang]}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Split Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-8 sm:py-10 lg:py-14">
          {/* Mobile Language & Sacred Invocation Utility Row */}
          <div className="flex lg:hidden items-center justify-between gap-3 pb-4 mb-5 border-b border-[#DFD5C5]">
            <p className="text-[11px] leading-snug text-[#6E6056]">
              {COPY.invocations[lang][0]}
            </p>
            <div
              role="group"
              aria-label="Language selection mobile"
              className="inline-flex items-center p-0.5 bg-[#EFE8DA] rounded-lg border border-[#DFD5C5] shrink-0"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`min-h-[34px] px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'en'
                    ? 'bg-[#FAF7F2] text-[#1C1714] shadow-xs'
                    : 'text-[#574A41]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('kn')}
                className={`min-h-[34px] px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'kn'
                    ? 'bg-[#FAF7F2] text-[#1C1714] shadow-xs'
                    : 'text-[#574A41]'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
            {/* Couple Portrait: Appears first on mobile so guests immediately see the couple */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col">
              <div className="relative flex-1 h-[360px] sm:h-[460px] lg:h-auto lg:min-h-[600px] rounded-2xl overflow-hidden bg-[#EAE2D3] border border-[#DFD5C5]">
                <ResilientPhoto
                  src={heroPhoto.src}
                  alt={`${COPY.hero.groomName[lang]} & ${COPY.hero.brideName[lang]} — ${heroPhoto.title[lang]}`}
                  title={heroPhoto.title[lang]}
                  objectPosition={heroPhoto.objectPosition}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 sm:p-5">
                  <p className="text-[11px] sm:text-xs text-[#F5EFE6]/90 tracking-wide">
                    {COPY.hero.portraitCaption[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Left Column (Desktop) / Below Portrait (Mobile): Editorial Typographic Invitation */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Desktop Language Switcher + Invocations */}
                <div className="hidden lg:flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#DFD5C5]">
                  <p className="text-xs leading-relaxed text-[#6E6056]">
                    {COPY.invocations[lang].join(' · ')}
                  </p>

                  <div
                    role="group"
                    aria-label="Language selection"
                    className="inline-flex items-center p-1 bg-[#EFE8DA] rounded-lg border border-[#DFD5C5] shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        lang === 'en'
                          ? 'bg-[#FAF7F2] text-[#1C1714] shadow-xs'
                          : 'text-[#574A41] hover:text-[#1C1714]'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('kn')}
                      className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        lang === 'kn'
                          ? 'bg-[#FAF7F2] text-[#1C1714] shadow-xs'
                          : 'text-[#574A41] hover:text-[#1C1714]'
                      }`}
                    >
                      ಕನ್ನಡ
                    </button>
                  </div>
                </div>

                {/* Monogram & Kicker */}
                <div className="mt-1 lg:mt-8 flex items-center gap-3.5 sm:gap-4">
                  <CoupleMonogram className="w-11 h-11 sm:w-14 sm:h-14 shrink-0" />
                  <p className="text-[11px] sm:text-sm tracking-[0.12em] sm:tracking-[0.14em] uppercase text-[#8C6629] font-medium leading-snug">
                    {COPY.hero.kicker[lang]}
                  </p>
                </div>

                {/* Couple Names */}
                <div className="mt-5 sm:mt-6">
                  <h1 className="font-editorial text-[clamp(1.9rem,7.2vw,3.9rem)] leading-[1.1] font-medium text-[#1C1714] [text-wrap:balance]">
                    <span className="block text-sm sm:text-xl font-normal text-[#6E6056] mb-0.5 sm:mb-1">
                      {COPY.hero.groomHonorific[lang]}
                    </span>
                    <span>{COPY.hero.groomName[lang]}</span>{' '}
                    <span className="text-base sm:text-2xl font-normal text-[#6E6056]">
                      {COPY.hero.groomDegree}
                    </span>
                  </h1>

                  <p className="my-1.5 sm:my-2 font-editorial italic text-xl sm:text-2xl text-[#9F2B42]">
                    &amp;
                  </p>

                  <p className="font-editorial text-[clamp(1.9rem,7.2vw,3.9rem)] leading-[1.1] font-medium text-[#1C1714] [text-wrap:balance]">
                    <span className="block text-sm sm:text-xl font-normal text-[#6E6056] mb-0.5 sm:mb-1">
                      {COPY.hero.brideHonorific[lang]}
                    </span>
                    <span>{COPY.hero.brideName[lang]}</span>{' '}
                    <span className="text-base sm:text-2xl font-normal text-[#6E6056]">
                      {COPY.hero.brideDegree}
                    </span>
                  </p>
                </div>

                {/* Poetic Kannada Verse from the Card Cover */}
                <div className="mt-6 sm:mt-7 py-4 sm:py-5 border-y border-[#DFD5C5]">
                  <div className="font-kannada text-[15px] sm:text-lg leading-relaxed text-[#3A2F28]">
                    {COPY.hero.verseKannada.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  {lang === 'en' && (
                    <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#6E6056] leading-relaxed max-w-2xl">
                      {COPY.hero.verseEnglish}
                    </p>
                  )}
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3">
                <a
                  href="#ceremonies"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg bg-[#1C1714] text-[#FAF7F2] text-sm font-medium hover:bg-[#332A24] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1714] focus-visible:ring-offset-2"
                >
                  {COPY.hero.primaryCta[lang]}
                </a>

                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg border border-[#C8B9A3] bg-[#F2ECE1]/70 text-[#1C1714] text-sm font-medium hover:border-[#8C6629] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6629]"
                >
                  {COPY.nav.gallery[lang]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width 4-Column Countdown & Operational Strip */}
        <CountdownStrip lang={lang} />

        {/* Section 1: The Families & Sacred Invitation */}
        <section
          id="invitation"
          className="scroll-mt-14 md:scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#EAE2D3] border border-[#DFD5C5]">
                <ResilientPhoto
                  src={verandaPhoto.src}
                  alt={verandaPhoto.title[lang]}
                  title={verandaPhoto.title[lang]}
                  objectPosition={verandaPhoto.objectPosition}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2.5 text-xs font-editorial italic text-[#6E6056]">
                {verandaPhoto.caption[lang]}
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#8C6629] font-medium">
                {COPY.invitationSection.eyebrow[lang]}
              </p>
              <h2 className="mt-2.5 sm:mt-3 font-editorial text-2xl sm:text-4xl font-medium text-[#1C1714] leading-tight [text-wrap:balance]">
                {COPY.invitationSection.heading[lang]}
              </h2>

              <OrnamentalDivider className="my-6 sm:my-7" />

              <div className="space-y-5 sm:space-y-6 text-[#3A2F28]">
                <div>
                  <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
                    {COPY.invitationSection.hostsTitle[lang]}
                  </p>
                  <p className="mt-1 font-editorial text-xl sm:text-2xl font-medium text-[#1C1714]">
                    {COPY.invitationSection.hostsName[lang]}
                  </p>
                  <p className="mt-1 text-sm text-[#574A41]">
                    {COPY.invitationSection.hostsAddress[lang]}
                  </p>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-[#4A3F37] max-w-2xl">
                  {COPY.invitationSection.solicitText[lang]}
                </p>

                <div className="pt-4 border-t border-[#DFD5C5] grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
                      {COPY.invitationSection.brideParentsLabel[lang]}
                    </p>
                    <p className="mt-1 font-editorial text-lg sm:text-xl font-medium text-[#1C1714]">
                      {COPY.invitationSection.brideParentsName[lang]}
                    </p>
                    <p className="mt-1 text-sm text-[#574A41] leading-relaxed">
                      {COPY.invitationSection.brideParentsAddress[lang]}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
                      {COPY.invitationSection.awaitingTitle[lang]}
                    </p>
                    <ul className="mt-1.5 space-y-1 text-sm text-[#1C1714] font-medium">
                      {COPY.invitationSection.awaitingNames[lang].map((person) => (
                        <li key={person}>{person}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-[#6E6056]">
                      {COPY.invitationSection.compliments[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Wedding Ceremonies & Panchanga */}
        <section
          id="ceremonies"
          className="scroll-mt-14 md:scroll-mt-16 border-y border-[#DFD5C5] bg-[#F2ECE1]/55 py-12 sm:py-16 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#8C6629] font-medium">
                {COPY.ceremoniesSection.eyebrow[lang]}
              </p>
              <h2 className="mt-2.5 sm:mt-3 font-editorial text-2xl sm:text-4xl font-medium text-[#1C1714] [text-wrap:balance]">
                {COPY.ceremoniesSection.heading[lang]}
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#574A41] leading-relaxed">
                {COPY.ceremoniesSection.panchangaLine[lang]}
              </p>
            </div>

            <div className="mt-8 sm:mt-12 divide-y divide-[#DFD5C5] border-t border-b border-[#DFD5C5]">
              {COPY.ceremoniesSection.events.map((event) => {
                const calendarTarget =
                  event.index === '02'
                    ? 'reception'
                    : event.index === '03'
                    ? 'muhurtham'
                    : 'all';
                return (
                  <div
                    key={event.index}
                    className="py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-8 items-start"
                  >
                    <div className="lg:col-span-4">
                      <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056] tabular-nums">
                        {event.index} · {event.tithi[lang]}
                      </p>
                      <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-medium text-[#1C1714]">
                        {event.name[lang]}
                      </h3>
                    </div>

                    <div className="lg:col-span-3 flex flex-wrap lg:block items-baseline gap-x-3 gap-y-1 text-sm text-[#1C1714] lg:space-y-1 tabular-nums">
                      <p className="font-semibold">{event.date[lang]}</p>
                      <p className="text-[#9F2B42] font-medium">{event.time[lang]}</p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-[#1C1714]">
                          {event.location[lang]}
                        </p>
                        <p className="mt-1 text-sm text-[#574A41] leading-relaxed">
                          {event.description[lang]}
                        </p>
                      </div>

                      {event.index !== '01' && (
                        <div>
                          <button
                            type="button"
                            onClick={() => downloadWeddingIcs(calendarTarget)}
                            className="inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[40px] w-full sm:w-auto px-4 py-2 rounded-lg border border-[#C8B9A3] bg-[#FAF7F2] text-xs font-medium text-[#1C1714] hover:border-[#9F2B42] hover:text-[#9F2B42] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F2B42]"
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                            <span>{COPY.ceremoniesSection.addCalendar[lang]}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Pre-Wedding Visual Chronicle (All 7 Photoshoot Frames) */}
        <section
          id="gallery"
          className="scroll-mt-14 md:scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-7 sm:mb-10">
            <div>
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#8C6629] font-medium">
                {COPY.gallerySection.eyebrow[lang]}
              </p>
              <h2 className="mt-2.5 sm:mt-3 font-editorial text-2xl sm:text-4xl font-medium text-[#1C1714] [text-wrap:balance]">
                {COPY.gallerySection.heading[lang]}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#574A41] max-w-sm">
              {COPY.gallerySection.subtext[lang]}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {PRE_WEDDING_PHOTOS.map((photo, index) => {
              const isMobileFull = index === 0 || index === 5 || index === 6;
              const isWideFeature = index === 5;
              return (
                <figure
                  key={photo.id}
                  className={
                    isWideFeature
                      ? 'col-span-2 lg:col-span-2'
                      : isMobileFull
                      ? 'col-span-2 lg:col-span-1'
                      : 'col-span-1'
                  }
                >
                  <button
                    type="button"
                    onClick={() => openGalleryLightbox(index)}
                    className={`group relative block w-full overflow-hidden rounded-xl sm:rounded-2xl border border-[#DFD5C5] bg-[#EAE2D3] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F2B42] ${
                      isWideFeature ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[4/5]'
                    }`}
                  >
                    <ResilientPhoto
                      src={photo.src}
                      alt={photo.title[lang]}
                      title={photo.title[lang]}
                      objectPosition={photo.objectPosition}
                      className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="hidden sm:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
                      <p className="font-editorial text-xl font-medium text-[#FAF7F2]">
                        {photo.title[lang]}
                      </p>
                      <p className="mt-0.5 text-xs text-[#E4DAD0]">
                        {photo.caption[lang]}
                      </p>
                    </div>
                  </button>
                  <figcaption className="mt-2 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-[#6E6056] px-0.5 sm:px-1">
                    <span className="font-medium text-[#3A2F28] truncate">
                      {photo.title[lang]}
                    </span>
                    <span className="tabular-nums shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* Section 4: Venue & Directions */}
        <section
          id="venue"
          className="scroll-mt-14 md:scroll-mt-16 border-t border-[#DFD5C5] bg-[#F2ECE1]/45 py-12 sm:py-16 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-7 sm:mb-10">
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#8C6629] font-medium">
                {COPY.nav.venue[lang]}
              </p>
              <h2 className="mt-2.5 sm:mt-3 font-editorial text-2xl sm:text-4xl font-medium text-[#1C1714] [text-wrap:balance]">
                {COPY.venueSection.heading[lang]}
              </h2>
            </div>

            <div className="bg-[#FAF7F2] border border-[#DFD5C5] rounded-2xl p-5 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#9F2B42] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-editorial text-xl sm:text-3xl font-medium text-[#1C1714]">
                      {VENUE_DETAILS.name[lang]}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#574A41] leading-relaxed">
                      {VENUE_DETAILS.address[lang]}
                    </p>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3">
                  <a
                    href={VENUE_DETAILS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#1C1714] text-[#FAF7F2] text-sm font-medium hover:bg-[#332A24] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1714]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{COPY.venueSection.directionsCta[lang]}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-[#C8B9A3] bg-[#FAF7F2] text-sm font-medium text-[#1C1714] hover:border-[#8C6629] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6629]"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-4 h-4 text-[#2F5233]" />
                        <span>{COPY.venueSection.copied[lang]}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{COPY.venueSection.copyAddress[lang]}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#DFD5C5] lg:pl-10 space-y-5 sm:space-y-6">
                <div>
                  <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#6E6056]">
                    {COPY.venueSection.contactTitle[lang]}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {VENUE_DETAILS.contacts.map((contact) => (
                      <a
                        key={contact.raw}
                        href={`tel:${contact.tel}`}
                        className="inline-flex items-center gap-2.5 min-h-[44px] text-base font-medium text-[#1C1714] hover:text-[#9F2B42] transition-colors tabular-nums"
                      >
                        <Phone className="w-4 h-4 text-[#8C6629]" />
                        <span>{contact.display}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#DFD5C5]">
                  <button
                    type="button"
                    onClick={() => downloadWeddingIcs('all')}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#9F2B42] text-[#FAF7F2] text-sm font-medium hover:bg-[#842235] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F2B42]"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>{COPY.nav.saveDate[lang]}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-[#DFD5C5] bg-[#FAF7F2] py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-xs text-[#6E6056]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <CoupleMonogram className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
            <span>
              {COPY.brand[lang]} · 02–03 Dec 2026 · {VENUE_DETAILS.name[lang]}
            </span>
          </div>

          <p>{COPY.invitationSection.compliments[lang]}</p>
        </div>
      </footer>

      {/* Mobile Bottom Thumb-Zone Navigation Bar */}
      <nav
        aria-label="Mobile section navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#DFD5C5]"
      >
        <div className="grid grid-cols-4 h-[52px] items-center">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={() => setActiveSection(tab.id)}
                className={`flex flex-col items-center justify-center h-full px-1 transition-colors ${
                  isActive ? 'text-[#9F2B42]' : 'text-[#574A41]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="mt-0.5 text-[10px] font-medium tracking-tight whitespace-nowrap truncate max-w-full">
                  {tab.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>

      <GalleryLightbox
        slides={gallerySlides}
        activeIndex={lightboxIndex}
        onClose={closeLightbox}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />

      {showScrollTop && lightboxIndex === null && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={lang === 'kn' ? 'ಮೇಲಕ್ಕೆ ಹೋಗಿ' : 'Back to top'}
          className="fixed bottom-16 right-4 md:bottom-6 md:right-6 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#1C1714] text-[#FAF7F2] border border-[#8C6629]/45 shadow-md hover:bg-[#9F2B42] hover:border-[#9F2B42] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F2B42] focus-visible:ring-offset-2"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
