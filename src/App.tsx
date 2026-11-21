import { useEffect, useMemo, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
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
import {
  CoupleMonogram,
  GaneshaCrest,
  MangalaKalasha,
  OrnamentalDivider,
  PatrikaCorners,
  TempleLampIcon,
  ToranaFrieze,
  ZariTempleBorder,
} from './components/MonogramAndMotifs';
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
        className={`w-full h-full bg-[#EDE0C8] flex flex-col items-center justify-center p-6 text-center ${className}`}
      >
        <CoupleMonogram className="w-10 h-10 opacity-70" />
        <p className="mt-3 font-editorial text-lg text-[#5B4333]">{title}</p>
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
    <MotionConfig reducedMotion="user">
      <div
        className={`min-h-screen bg-[#FBF6EC] text-[#241610] pb-14 md:pb-0 ${
          lang === 'kn' ? 'font-kannada' : ''
        }`}
      >
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FBF6EC]/95 backdrop-blur-sm border-b border-[#C9A65B]/55">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 md:h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-editorial text-lg sm:text-2xl font-semibold tracking-tight text-[#7A1C24] whitespace-nowrap shrink-0 truncate"
          >
            {COPY.brand[lang]}
          </a>

          {/* Zone 2: 4 concise single-line nav links (desktop) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5B4333]"
          >
            <a
              href="#invitation"
              className="hover:text-[#7A1C24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.invitation[lang]}
            </a>
            <a
              href="#ceremonies"
              className="hover:text-[#7A1C24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.ceremonies[lang]}
            </a>
            <a
              href="#gallery"
              className="hover:text-[#7A1C24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.gallery[lang]}
            </a>
            <a
              href="#venue"
              className="hover:text-[#7A1C24] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {COPY.nav.venue[lang]}
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => downloadWeddingIcs('all')}
              className="inline-flex items-center gap-1.5 sm:gap-2 min-h-[36px] md:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#7A1C24] text-[#FBF6EC] text-xs sm:text-sm font-medium border border-[#B0812C]/50 hover:bg-[#61141B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24] focus-visible:ring-offset-2"
            >
              <CalendarPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F3D58D] shrink-0" />
              <span>{COPY.nav.saveDate[lang]}</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Auspicious Mango-Leaf & Marigold Torana Frieze */}
        <ToranaFrieze className="bg-[#F4EBDA]/60" />

        {/* Hero Split Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-8 sm:py-10 lg:py-12">
          {/* Mobile Language & Sacred Invocation Utility Row */}
          <div className="flex lg:hidden items-center justify-between gap-3 pb-4 mb-5 border-b border-[#C9A65B]/50">
            <p className="text-[11px] leading-snug text-[#7A1C24] font-medium">
              || {COPY.invocations[lang][0]} ||
            </p>
            <div
              role="group"
              aria-label="Language selection mobile"
              className="inline-flex items-center p-0.5 bg-[#F2E7D2] rounded-lg border border-[#C9A65B]/60 shrink-0"
            >
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`min-h-[34px] px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'en'
                    ? 'bg-[#7A1C24] text-[#FBF6EC] shadow-xs'
                    : 'text-[#5B4333]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('kn')}
                className={`min-h-[34px] px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'kn'
                    ? 'bg-[#7A1C24] text-[#FBF6EC] shadow-xs'
                    : 'text-[#5B4333]'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
            {/* Couple Portrait in Traditional Temple Gopura Arch Frame */}
            <div className="order-1 lg:order-2 lg:col-span-5 flex flex-col">
              <div className="flex-1 p-2 sm:p-2.5 rounded-t-[180px] sm:rounded-t-[220px] rounded-b-2xl border-2 border-[#B0812C]/75 bg-[#F4EBDA] shadow-sm flex flex-col">
                <div className="relative flex-1 h-[360px] sm:h-[460px] lg:h-auto lg:min-h-[580px] rounded-t-[170px] sm:rounded-t-[210px] rounded-b-xl overflow-hidden border border-[#7A1C24]/25 bg-[#EDE0C8]">
                  <ResilientPhoto
                    src={heroPhoto.src}
                    alt={`${COPY.hero.groomName[lang]} & ${COPY.hero.brideName[lang]} — ${heroPhoto.title[lang]}`}
                    title={heroPhoto.title[lang]}
                    objectPosition={heroPhoto.objectPosition}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E0F0B]/85 via-[#1E0F0B]/35 to-transparent p-4 sm:p-5 text-center">
                    <p className="text-[11px] sm:text-xs text-[#F7E7C6] tracking-wide">
                      {COPY.hero.portraitCaption[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left Column (Desktop) / Below Portrait (Mobile): Traditional Patrika Typography */}
            <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Desktop Language Switcher + Invocations */}
                <div className="hidden lg:flex items-center justify-between gap-4 pb-5 border-b border-[#C9A65B]/55">
                  <p className="text-xs leading-relaxed text-[#7A1C24] font-medium">
                    {COPY.invocations[lang].map((line) => `|| ${line} ||`).join('  ')}
                  </p>

                  <div
                    role="group"
                    aria-label="Language selection"
                    className="inline-flex items-center p-1 bg-[#F2E7D2] rounded-lg border border-[#C9A65B]/60 shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        lang === 'en'
                          ? 'bg-[#7A1C24] text-[#FBF6EC] shadow-xs'
                          : 'text-[#5B4333] hover:text-[#241610]'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('kn')}
                      className={`min-h-[34px] px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        lang === 'kn'
                          ? 'bg-[#7A1C24] text-[#FBF6EC] shadow-xs'
                          : 'text-[#5B4333] hover:text-[#241610]'
                      }`}
                    >
                      ಕನ್ನಡ
                    </button>
                  </div>
                </div>

                {/* Ganesha Crest & Monogram Header */}
                <div className="mt-2 lg:mt-7 flex items-center gap-3.5 sm:gap-4">
                  <GaneshaCrest className="w-12 h-12 sm:w-14 sm:h-14 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-[#7A1C24]">
                      {lang === 'kn'
                        ? 'ಶುಭ ವಿವಾಹದ ಆತ್ಮೀಯ ಆಮಂತ್ರಣ'
                        : 'Shubha Vivaha · Auspicious Wedding Invitation'}
                    </p>
                    <p className="mt-0.5 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#8C611B]">
                      {COPY.hero.kicker[lang]}
                    </p>
                  </div>
                </div>

                {/* Couple Names */}
                <div className="mt-5 sm:mt-6">
                  <h1 className="font-editorial text-[clamp(1.9rem,7.2vw,3.85rem)] leading-[1.1] font-semibold text-[#241610] [text-wrap:balance]">
                    <span className="block text-sm sm:text-lg font-medium text-[#7A1C24] mb-0.5">
                      {COPY.hero.groomHonorific[lang]}
                    </span>
                    <span>{COPY.hero.groomName[lang]}</span>{' '}
                    <span className="text-base sm:text-2xl font-normal text-[#5B4333]">
                      {COPY.hero.groomDegree}
                    </span>
                  </h1>

                  <div className="my-2 flex items-center gap-3">
                    <span className="h-px w-8 bg-[#B0812C]/70" aria-hidden="true" />
                    <span className="font-editorial italic text-xl sm:text-2xl text-[#7A1C24]">
                      {lang === 'kn' ? 'ಹಾಗೂ' : '&'}
                    </span>
                    <span className="h-px w-8 bg-[#B0812C]/70" aria-hidden="true" />
                  </div>

                  <p className="font-editorial text-[clamp(1.9rem,7.2vw,3.85rem)] leading-[1.1] font-semibold text-[#241610] [text-wrap:balance]">
                    <span className="block text-sm sm:text-lg font-medium text-[#7A1C24] mb-0.5">
                      {COPY.hero.brideHonorific[lang]}
                    </span>
                    <span>{COPY.hero.brideName[lang]}</span>{' '}
                    <span className="text-base sm:text-2xl font-normal text-[#5B4333]">
                      {COPY.hero.brideDegree}
                    </span>
                  </p>
                </div>

                {/* Poetic Kannada Verse from the Card Cover */}
                <div className="mt-6 sm:mt-7 p-4 sm:p-5 rounded-xl bg-[#F4EBDA]/65 border border-[#C9A65B]/60">
                  <div className="font-kannada text-[15px] sm:text-lg leading-relaxed text-[#3A2218]">
                    {COPY.hero.verseKannada.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  {lang === 'en' && (
                    <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#5B4333] leading-relaxed max-w-2xl">
                      {COPY.hero.verseEnglish}
                    </p>
                  )}
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="mt-6 sm:mt-7 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3">
                <a
                  href="#ceremonies"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-lg bg-[#7A1C24] text-[#FBF6EC] text-sm font-medium border border-[#B0812C]/45 hover:bg-[#61141B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24] focus-visible:ring-offset-2"
                >
                  {COPY.hero.primaryCta[lang]}
                </a>

                <a
                  href="#gallery"
                  className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg border border-[#B0812C]/75 bg-[#F4EBDA]/80 text-[#241610] text-sm font-medium hover:border-[#7A1C24] hover:text-[#7A1C24] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0812C]"
                >
                  {COPY.nav.gallery[lang]}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width 4-Column Countdown & Operational Strip with Zari Temple Borders */}
        <CountdownStrip lang={lang} />

        {/* Section 1: The Families & Sacred Lagna Patrika */}
        <section
          id="invitation"
          className="scroll-mt-14 md:scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="p-2 rounded-2xl border border-[#C9A65B]/75 bg-[#F4EBDA]">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#EDE0C8] border border-[#7A1C24]/20">
                  <ResilientPhoto
                    src={verandaPhoto.src}
                    alt={verandaPhoto.title[lang]}
                    title={verandaPhoto.title[lang]}
                    objectPosition={verandaPhoto.objectPosition}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="mt-2.5 text-xs font-editorial italic text-[#5B4333] text-center lg:text-left">
                {verandaPhoto.caption[lang]}
              </p>
            </div>

            {/* Traditional Framed Lagna Patrika Leaf */}
            <div className="lg:col-span-7 relative rounded-2xl border-2 border-[#B0812C]/65 bg-[#FBF6EC] p-6 sm:p-10 shadow-xs">
              <PatrikaCorners />

              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <CoupleMonogram className="w-12 h-12" />
                </div>
                <p className="text-[11px] sm:text-xs text-[#7A1C24] font-medium">
                  {COPY.invocations[lang].map((line) => `|| ${line} ||`).join(' · ')}
                </p>
                <p className="mt-3 text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#8C611B] font-medium">
                  {COPY.invitationSection.eyebrow[lang]}
                </p>
                <h2 className="mt-2 font-editorial text-2xl sm:text-3xl font-semibold text-[#241610] leading-snug [text-wrap:balance]">
                  {COPY.invitationSection.heading[lang]}
                </h2>
              </div>

              <OrnamentalDivider className="my-6" />

              <div className="space-y-5 sm:space-y-6 text-[#3A2218]">
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#7A1C24] font-medium">
                    {COPY.invitationSection.hostsTitle[lang]}
                  </p>
                  <p className="mt-1 font-editorial text-2xl font-semibold text-[#241610]">
                    {COPY.invitationSection.hostsName[lang]}
                  </p>
                  <p className="mt-1 text-sm text-[#5B4333]">
                    {COPY.invitationSection.hostsAddress[lang]}
                  </p>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-[#3A2218] text-center max-w-xl mx-auto">
                  {COPY.invitationSection.solicitText[lang]}
                </p>

                <div className="pt-5 border-t border-[#C9A65B]/45 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#8C611B] font-medium">
                      {COPY.invitationSection.brideParentsLabel[lang]}
                    </p>
                    <p className="mt-1 font-editorial text-lg sm:text-xl font-semibold text-[#241610]">
                      {COPY.invitationSection.brideParentsName[lang]}
                    </p>
                    <p className="mt-1 text-sm text-[#5B4333] leading-relaxed">
                      {COPY.invitationSection.brideParentsAddress[lang]}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#8C611B] font-medium">
                      {COPY.invitationSection.awaitingTitle[lang]}
                    </p>
                    <ul className="mt-1.5 space-y-1 text-sm text-[#241610] font-medium">
                      {COPY.invitationSection.awaitingNames[lang].map((person) => (
                        <li key={person}>{person}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs text-[#7A1C24]">
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
          className="scroll-mt-14 md:scroll-mt-16 bg-[#F4EBDA]/65 py-12 sm:py-16 lg:py-24 border-t border-[#C9A65B]/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-3">
                <MangalaKalasha className="w-11 h-11" />
              </div>
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#7A1C24] font-medium">
                {COPY.ceremoniesSection.eyebrow[lang]}
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-4xl font-semibold text-[#241610] [text-wrap:balance]">
                {COPY.ceremoniesSection.heading[lang]}
              </h2>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#5B4333] leading-relaxed border-y border-[#C9A65B]/50 py-3">
                {COPY.ceremoniesSection.panchangaLine[lang]}
              </p>
            </div>

            <div className="mt-8 sm:mt-12 divide-y divide-[#C9A65B]/45 border-t border-b border-[#C9A65B]/60 bg-[#FBF6EC]/85 rounded-2xl px-5 sm:px-8">
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
                    className="py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start"
                  >
                    <div className="lg:col-span-4 flex items-start gap-3.5">
                      <div className="shrink-0 mt-0.5">
                        {event.index === '01' ? (
                          <TempleLampIcon className="w-9 h-9" />
                        ) : event.index === '02' ? (
                          <CoupleMonogram className="w-9 h-9" />
                        ) : (
                          <MangalaKalasha className="w-9 h-9" />
                        )}
                      </div>
                      <div>
                        <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#8C611B] font-medium tabular-nums">
                          {event.index} · {event.tithi[lang]}
                        </p>
                        <h3 className="mt-1 font-editorial text-2xl sm:text-3xl font-semibold text-[#241610]">
                          {event.name[lang]}
                        </h3>
                      </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-wrap lg:block items-baseline gap-x-3 gap-y-1 text-sm text-[#241610] lg:space-y-1 tabular-nums">
                      <p className="font-semibold">{event.date[lang]}</p>
                      <p className="text-[#7A1C24] font-semibold">{event.time[lang]}</p>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-[#241610]">
                          {event.location[lang]}
                        </p>
                        <p className="mt-1 text-sm text-[#5B4333] leading-relaxed">
                          {event.description[lang]}
                        </p>
                      </div>

                      {event.index !== '01' && (
                        <div>
                          <button
                            type="button"
                            onClick={() => downloadWeddingIcs(calendarTarget)}
                            className="inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-[40px] w-full sm:w-auto px-4 py-2 rounded-lg border border-[#B0812C]/70 bg-[#FBF6EC] text-xs font-medium text-[#7A1C24] hover:bg-[#7A1C24] hover:text-[#FBF6EC] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24]"
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
          </motion.div>
        </section>

        <ZariTempleBorder className="bg-[#FBF6EC]" />

        {/* Section 3: Pre-Wedding Visual Chronicle (All 7 Photoshoot Frames) */}
        <section
          id="gallery"
          className="scroll-mt-14 md:scroll-mt-16 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-7 sm:mb-10">
            <div>
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#7A1C24] font-medium">
                {COPY.gallerySection.eyebrow[lang]}
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-4xl font-semibold text-[#241610] [text-wrap:balance]">
                {COPY.gallerySection.heading[lang]}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#5B4333] max-w-sm">
              {COPY.gallerySection.subtext[lang]}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {PRE_WEDDING_PHOTOS.map((photo, index) => {
              const isMobileFull = index === 0 || index === 5 || index === 6;
              const isWideFeature = index === 5;
              return (
                <motion.figure
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
                    className={`group relative block w-full overflow-hidden rounded-xl sm:rounded-2xl border-2 border-[#C9A65B]/60 bg-[#EDE0C8] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24] ${
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
                    <div className="hidden sm:block absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1E0F0B]/85 via-[#1E0F0B]/35 to-transparent p-5 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
                      <p className="font-editorial text-xl font-medium text-[#FBF6EC]">
                        {photo.title[lang]}
                      </p>
                      <p className="mt-0.5 text-xs text-[#F2E2C4]">
                        {photo.caption[lang]}
                      </p>
                    </div>
                  </button>
                  <figcaption className="mt-2 flex items-center justify-between gap-2 text-[11px] sm:text-xs text-[#5B4333] px-0.5 sm:px-1">
                    <span className="font-medium text-[#241610] truncate">
                      {photo.title[lang]}
                    </span>
                    <span className="tabular-nums shrink-0 text-[#8C611B]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>
          </motion.div>
        </section>

        {/* Section 4: Venue & Directions */}
        <section
          id="venue"
          className="scroll-mt-14 md:scroll-mt-16 border-t border-[#C9A65B]/55 bg-[#F4EBDA]/65 py-12 sm:py-16 lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="max-w-2xl mb-7 sm:mb-10">
              <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#7A1C24] font-medium">
                {COPY.nav.venue[lang]}
              </p>
              <h2 className="mt-2 font-editorial text-2xl sm:text-4xl font-semibold text-[#241610] [text-wrap:balance]">
                {COPY.venueSection.heading[lang]}
              </h2>
            </div>

            <div className="relative bg-[#FBF6EC] border-2 border-[#B0812C]/65 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-start shadow-xs">
              <PatrikaCorners />

              <div className="lg:col-span-7">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#7A1C24] shrink-0 mt-1" />
                  <div>
                    <h3 className="font-editorial text-xl sm:text-3xl font-semibold text-[#241610]">
                      {VENUE_DETAILS.name[lang]}
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-[#5B4333] leading-relaxed">
                      {VENUE_DETAILS.address[lang]}
                    </p>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-3">
                  <a
                    href={VENUE_DETAILS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7A1C24] text-[#FBF6EC] text-sm font-medium border border-[#B0812C]/45 hover:bg-[#61141B] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24]"
                  >
                    <ExternalLink className="w-4 h-4 text-[#F3D58D]" />
                    <span>{COPY.venueSection.directionsCta[lang]}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-[#B0812C]/70 bg-[#FBF6EC] text-sm font-medium text-[#241610] hover:border-[#7A1C24] hover:text-[#7A1C24] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B0812C]"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-4 h-4 text-[#2F5233]" />
                        <span>{COPY.venueSection.copied[lang]}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8C611B]" />
                        <span>{COPY.venueSection.copyAddress[lang]}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#C9A65B]/45 lg:pl-10 space-y-5 sm:space-y-6">
                <div>
                  <p className="text-[11px] sm:text-xs tracking-[0.14em] uppercase text-[#8C611B] font-medium">
                    {COPY.venueSection.contactTitle[lang]}
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {VENUE_DETAILS.contacts.map((contact) => (
                      <a
                        key={contact.raw}
                        href={`tel:${contact.tel}`}
                        className="inline-flex items-center gap-2.5 min-h-[44px] text-base font-medium text-[#241610] hover:text-[#7A1C24] transition-colors tabular-nums"
                      >
                        <Phone className="w-4 h-4 text-[#7A1C24]" />
                        <span>{contact.display}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-[#C9A65B]/45">
                  <button
                    type="button"
                    onClick={() => downloadWeddingIcs('all')}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#241610] text-[#FBF6EC] text-sm font-medium hover:bg-[#3B261C] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#241610]"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#F3D58D]" />
                    <span>{COPY.nav.saveDate[lang]}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <ZariTempleBorder className="bg-[#FBF6EC]" />

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#FBF6EC] py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left text-xs text-[#5B4333]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <CoupleMonogram className="w-8 h-8 shrink-0" />
            <span>
              {COPY.brand[lang]} · 02–03 Dec 2026 · {VENUE_DETAILS.name[lang]}
            </span>
          </div>

          <p className="text-[#7A1C24] font-medium">
            {COPY.invitationSection.compliments[lang]}
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Thumb-Zone Navigation Bar */}
      <nav
        aria-label="Mobile section navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF6EC]/95 backdrop-blur-md border-t border-[#C9A65B]/60"
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
                  isActive ? 'text-[#7A1C24]' : 'text-[#5B4333]'
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
          className="fixed bottom-16 right-4 md:bottom-6 md:right-6 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#7A1C24] text-[#FBF6EC] border border-[#B0812C] shadow-md hover:bg-[#61141B] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24] focus-visible:ring-offset-2"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
    </MotionConfig>
  );
}
