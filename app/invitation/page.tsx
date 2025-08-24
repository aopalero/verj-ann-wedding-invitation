"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

// Constants
const WEDDING_DATE = "2025-08-15T15:00:00";
const RSVP_DEADLINE = "July 25, 2025";
const WEDDING_TITLE = "Verj & Ann's Wedding";

const IMAGES = {
  hero: "/images/JSH02285.jpg",
  gallery: [
    "/images/JSH02375.jpg",
    "/images/JSH01496.jpg",
    "/images/C.jpg",
    "/images/JSH00460.jpg",
    "/images/JSH02020.jpg",
    "/images/JSH00721.jpg",
  ],
  couple: "/images/JSH02085.jpg",
  couple2: "/images/JSH02105.jpg",
  qrCode: "/images/qrcode.png",
  attire: "/images/Attire.png",
  scripture: "/images/JSH02261.jpg",
  preWedding: "/images/JSH02006.jpg",
  final: "/images/JSH02307.jpg",
} as const;

const VENUES = {
  ceremony: {
    name: "God's Grace Believers Bible Baptist Church",
    address: "Bypass Rd, Brgy. Guyong, Santa Maria, Bulacan",
    mapUrl: "https://maps.app.goo.gl/SqzGvwDnXonZyU1H6",
  },
  reception: {
    name: "Uncle's Events Place",
    address: "E Celestino St, Santa Maria, Bulacan",
    mapUrl: "https://maps.app.goo.gl/xVN4dzniUteyYkyc7",
  },
} as const;

const TIMELINE = [
  { time: "2:30 PM", event: "Ceremony" },
  { time: "3:30 PM", event: "Cocktail" },
  { time: "5:00 PM", event: "Dinner" },
] as const;

const ATTIRE_COLORS = [
  { hex: "#0D4C5F", name: "Dark Teal" },
  { hex: "#4B7D8B", name: "Medium Teal" },
  { hex: "#F2E7A2", name: "Light Yellow" },
  { hex: "#F2D46E", name: "Gold" },
] as const;

/**
 * Countdown component displaying time until the wedding
 */
function Countdown() {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = new Date(WEDDING_DATE).getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(WEDDING_TITLE);
    const details = encodeURIComponent(
      `Join us for the wedding of Verj & Ann!\n\nCeremony: ${VENUES.ceremony.name}, ${VENUES.ceremony.address}\nReception: ${VENUES.reception.name}, ${VENUES.reception.address}`
    );
    const location = encodeURIComponent(`${VENUES.ceremony.name}, ${VENUES.ceremony.address}`);
    const start = "20250815T150000";
    const end = "20250815T180000";
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="w-full bg-[var(--color-dark-teal)] py-8 flex flex-col items-center gap-8 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-serif italic mb-2 text-white">Countdown to Forever</h2>
      <div className="flex p-2 gap-4 md:gap-6 text-center items-end">
        <CountdownItem value={days} label="Days" />
        <div className="text-4xl md:text-5xl font-bold text-white">:</div>
        <CountdownItem value={hours} label="Hours" />
        <div className="text-4xl md:text-5xl font-bold text-white">:</div>
        <CountdownItem value={minutes} label="Minutes" />
        <div className="text-4xl md:text-5xl font-bold text-white">:</div>
        <CountdownItem value={seconds} label="Seconds" isHighlighted />
      </div>
      <button
        className="mt-4 px-6 py-2 rounded font-bold cursor-pointer text-accent-yellow bg-transparent border-none text-lg tracking-wide focus:outline-none hover:opacity-80 transition-opacity"
        onClick={handleAddToCalendar}
      >
        ADD TO CALENDAR
      </button>
    </div>
  );
}

/**
 * Individual countdown item component
 */
function CountdownItem({ value, label, isHighlighted = false }: { value: number; label: string; isHighlighted?: boolean }) {
  const displayValue = isHighlighted ? value.toString().padStart(2, '0') : value;
  const textColor = isHighlighted ? "text-accent-yellow" : "text-white";
  
  return (
    <div>
      <div className={`text-3xl md:text-6xl font-bold ${textColor}`}>{displayValue}</div>
      <div className="text-xs md:text-sm font-semibold uppercase tracking-widest mt-1 text-white">{label}</div>
    </div>
  );
}

/**
 * Back to top button component
 */
function BackToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-opacity duration-300 bg-[var(--color-gold)] hover:bg-[var(--color-dark-teal)] text-white focus:outline-none ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}

/**
 * Hero section component
 */
function HeroSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
      <Image src={IMAGES.hero} alt="Romantic couple silhouette" fill className="object-cover object-bottom brightness-75" priority />
      <div className="absolute inset-0 flex flex-col items-center top-30 md:top-20 text-center px-4">
        <h1 className="cursive text-8xl md:text-9xl drop-shadow-lg mb-2 text-gold">Verj & Ann</h1>
        <h2 className="font-serif text-3xl md:text-4xl text-gold mb-4">08.15.2025</h2>
      </div>
    </section>
  );
}

/**
 * Love story section component
 */
function LoveStorySection() {
  return (
    <motion.section
      className="w-full max-w-3xl py-16 px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <h2 className="font-serif text-4xl md:text-5xl text-dark-teal mb-4 text-center">Our Love Story</h2>
      <h3 className="font-serif text-xl text-gold mb-6 text-center">— a little peek into how forever began —</h3>
      
      <p className="font-serif text-lg text-center mb-6">
        Ten years ago, we had no idea what God was preparing in us, and for us. Every step, every delay, every moment of waiting—He was weaving our hearts together in His perfect time, far better than we could imagine. This isn&apos;t just our journey, it&apos;s His masterpiece.
      </p>
      
      <StoryMilestone title="The First Date" content="We kept planning, kept canceling—life and distance got in the way. But one random day, Greenhills became the place where we finally showed up for each other." />
      <StoryMilestone title="The Day I Said Yes" content="Not over dinner, not under the stars in Baguio. But somewhere along the highway home — August 15,2022 He asked, in the most unexpected way. &quot;Can we change our Facebook status?&quot; And even though I waited for it. It still felt like a perfect surprise." />
      <StoryMilestone title="The Proposal" content="So here&apos;s the thing, Again in Baguio—Verj is the shy type who hates being the center of attention. We visited so many romantic places, but the moment he proposed wasn&apos;t in any of them. It happened in the car. He wasn&apos;t sure how to give me the ring, so on the way back he said, &quot;Let&apos;s change your ring. Will you marry me?&quot; Even when you expect it, the moment still takes your breath away. And of course, I said yes!" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {IMAGES.gallery.map((src, i) => (
          <motion.div
            key={i}
            className="aspect-square overflow-hidden rounded-lg shadow-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <Image src={src} alt="Love story gallery" width={400} height={400} className="object-cover w-full h-full" />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/**
 * Story milestone component
 */
function StoryMilestone({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-8">
      <h4 className="font-serif text-2xl text-gold mb-2 text-center">{title}</h4>
      <p className="font-serif text-base text-center mb-4">{content}</p>
    </div>
  );
}

/**
 * Save the date section component
 */
function SaveTheDateSection() {
  return (
    <motion.section
      className="w-full max-w-3xl py-16 px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="flex flex-col items-center w-full"
      >
        <h2 className="font-serif text-5xl md:text-5xl text-dark-teal mb-4 mt-2 text-center">Save the Date</h2>
        <h3 className="text-xl mb-8 text-center">— Mark your calendars for our special day —</h3>
        
        <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center w-full max-w-2xl">
          <CalendarHeader />
          <div className="border-t border-gray-200 w-full mb-4"></div>
          <CalendarGrid />
        </div>
      </motion.div>
    </motion.section>
  );
}

/**
 * Calendar header component
 */
function CalendarHeader() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <div className="grid grid-cols-7 w-full mb-4 text-2xl md:text-3xl text-center">
      {days.map((day, i) => (
        <span key={i} className="font-serif tracking-widest text-gray-500">{day}</span>
      ))}
    </div>
  );
}

/**
 * Calendar grid component
 */
function CalendarGrid() {
  return (
    <div className="grid grid-cols-7 gap-y-4 w-full text-center text-2xl md:text-3xl font-serif">
      {/* First row: empty, empty, empty, empty, empty, 1, 2 */}
      {Array.from({ length: 5 }, (_, i) => <div key={`empty-${i}`}></div>)}
      <div>1</div><div>2</div>
      
      {/* Second row: 3-9 */}
      {Array.from({ length: 7 }, (_, i) => <div key={i + 3}>{i + 3}</div>)}
      
      {/* Third row: 10-16 */}
      {Array.from({ length: 5 }, (_, i) => <div key={i + 10}>{i + 10}</div>)}
      
      <WeddingDay />
      <div>16</div>
      
      {/* Fourth row: 17-23 */}
      {Array.from({ length: 7 }, (_, i) => <div key={i + 17}>{i + 17}</div>)}
      
      {/* Fifth row: 24-30 */}
      {Array.from({ length: 7 }, (_, i) => <div key={i + 24}>{i + 24}</div>)}
      
      {/* Sixth row: 31, rest empty */}
      <div>31</div>
      {Array.from({ length: 6 }, (_, i) => <div key={`empty-end-${i}`}></div>)}
    </div>
  );
}

/**
 * Wedding day highlight component
 */
function WeddingDay() {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
      className="relative flex items-center justify-center"
    >
      <span className="z-10 font-bold text-4xl md:text-5xl text-dark-teal">15</span>
      <motion.svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-18 md:w-24"
        viewBox="0 0 90 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <path
          d="M45 82s-22.5-17.5-31-29.5C7.5 41 13 29 24 25.5c8.5-2.5 16 3.5 18.5 8 2.5-4.5 10-10.5 18.5-8C77 29 82.5 41 76 52.5 67.5 64.5 45 82 45 82Z"
          stroke="#F2D46E"
          strokeWidth="4"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  );
}

/**
 * Event details and timeline section component
 */
function EventDetailsSection() {
  return (
    <motion.section
      className="w-full max-w-4xl py-16 px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      viewport={{ once: true }}
    >
      <h2 className="font-serif text-5xl md:text-5xl text-dark-teal mb-4 mt-2 text-center">Event Details & Timeline</h2>
      <h3 className="text-xl mb-8 text-center">— Everything you need to know for our special day —</h3>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-0 bg-transparent">
        <div className="relative h-[260px] md:h-full w-full md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none shadow-lg">
          <Image src={IMAGES.couple} alt="Couple" fill className="object-cover object-center md:object-left" />
        </div>
        
        <VenueDetails />
        
        <TimelineDetails />
        
        <div className="relative h-[260px] md:h-full w-full md:rounded-br-2xl rounded-b-2xl md:rounded-bl-none shadow-lg overflow-hidden">
          <Image src={IMAGES.couple2} alt="Couple 2" fill className="object-cover object-center" />
        </div>
      </div>
    </motion.section>
  );
}

/**
 * Venue details component
 */
function VenueDetails() {
  return (
    <div className="bg-white md:rounded-r-2xl md:rounded-bl-none flex flex-col justify-center pt-8 md:p-12 shadow-lg h-full items-center text-center">
      <h2 className="font-serif text-4xl text-dark-teal mb-8 italic">Details</h2>
      
      <VenueInfo
        title="Ceremony"
        name={VENUES.ceremony.name}
        address={VENUES.ceremony.address}
        mapUrl={VENUES.ceremony.mapUrl}
      />
      
      <VenueInfo
        title="Reception"
        name={VENUES.reception.name}
        address={VENUES.reception.address}
        mapUrl={VENUES.reception.mapUrl}
      />
    </div>
  );
}

/**
 * Venue information component
 */
function VenueInfo({ title, name, address, mapUrl }: { title: string; name: string; address: string; mapUrl: string }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="uppercase text-gold text-lg tracking-widest mb-2">{title}</h3>
      <div className="font-serif text-xl font-bold text-dark-teal leading-tight mb-1">{name}</div>
      <div className="italic text-sm text-dark-teal text-opacity-70 mb-4">{address}</div>
      <div className="flex justify-center">
        <a
          href={mapUrl}
          className="bg-[var(--color-gold)] text-white px-6 py-2 rounded font-serif text-base shadow hover:bg-[var(--color-dark-teal)] transition-colors"
        >
          VIEW MAP
        </a>
      </div>
    </div>
  );
}

/**
 * Timeline details component
 */
function TimelineDetails() {
  return (
    <div className="bg-white md:rounded-bl-2xl md:rounded-br-none flex flex-col justify-center p-8 md:p-12 shadow-lg h-full border-t md:border-t-0 md:border-r border-gray-100 items-center text-center">
      <h2 className="font-serif text-4xl text-dark-teal mb-8 italic">Timeline</h2>
      <div className="flex flex-col gap-8">
        {TIMELINE.map((item, index) => (
          <div key={index}>
            <div className="text-xl font-serif text-dark-teal mb-1">{item.time}</div>
            <div className="uppercase text-gray-500 tracking-widest">{item.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * RSVP section component
 */
function RSVPSection() {
  return (
    <motion.section
      className="w-full max-w-xl py-12 px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-full bg-white border border-gray-300 rounded-2xl p-8 md:p-12 flex flex-col items-center shadow-lg">
        <h2 className="font-serif italic text-4xl text-dark-teal mb-6 text-center">RSVP</h2>
        <p className="text-center mb-8 text-lg font-serif text-[var(--color-foreground)]">
          Every invited guest holds a special place in our hearts,<br />
          and we truly can&apos;t imagine celebrating this day<br />
          without you. As we have limited seating, we kindly<br />
          ask that you RSVP by <span className="text-gold font-semibold">{RSVP_DEADLINE}</span>.
        </p>
        
        <Image src={IMAGES.qrCode} alt="RSVP QR Code" width={160} height={160} className="mb-8" />
        
        <p className="text-center mb-6 text-base font-serif">
          Kindly scan the <span className="font-semibold">QR</span> code or click the link<br />
          below to lead you to the RSVP form
        </p>
        
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScIFEsmTBw4-NytTCLUSHA5pLWyUqoSvtPNi6dS5pWOVCDXRg/viewform?usp=header"
          className="mt-2 bg-[var(--color-gold)] text-white px-10 py-3 rounded font-serif text-lg shadow hover:bg-[var(--color-dark-teal)] hover:text-white transition-colors border-none"
        >
          CLICK HERE!
        </a>
      </div>
    </motion.section>
  );
}

/**
 * Scripture section component
 */
function ScriptureSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden mt-8">
      <Image src={IMAGES.scripture} alt="Scripture background" fill className="object-cover object-center brightness-90" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif italic text-3xl md:text-4xl text-white drop-shadow-lg mb-2">
          Ecclesiastes 3:11
        </h2>
        <p className="font-serif text-xl md:text-2xl text-white drop-shadow-lg">
          "He hath made every thing beautiful in his time..."
        </p>
      </div>
    </section>
  );
}

/**
 * Attire section component
 */
function AttireSection() {
  return (
    <motion.section
      className="w-full max-w-3xl py-8 px-4 flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="cursive text-5xl text-dark-teal mb-4 text-center mt-12">Dress Code</h2>
      
      <AttireCategory
        title="FOR PRINCIPAL SPONSORS"
        type="Formal"
        gentlemen="Barong (Nude or any Neutral Colors) with Black Pants"
        ladies="Gown or Dress (Teal Blue or Yellow)"
      />
      
      <AttireCategory
        title="FOR GUEST"
        type="Semi-Formal"
        description="We'd love to see you in these colors:"
        note="As a sign of respect, we kindly ask guests not to wear white. This color is reserved for the bride."
      />
      
      <div className="mb-6 flex justify-center">
        <Image src={IMAGES.attire} alt="Guest Attire Illustration" width={220} height={180} />
      </div>
      
      <div className="flex justify-center gap-4 my-6">
        {ATTIRE_COLORS.map((color, index) => (
          <span
            key={index}
            className="w-14 h-14 rounded-md inline-block"
            style={{ background: color.hex }}
            title={color.name}
          />
        ))}
      </div>
      
      <h4 className="font-serif text-xl mt-8 mb-4 text-center">Attire Guidelines</h4>
      <AttireGuidelines />
    </motion.section>
  );
}

/**
 * Attire category component
 */
function AttireCategory({ title, type, gentlemen, ladies, description, note }: {
  title: string;
  type: string;
  gentlemen?: string;
  ladies?: string;
  description?: string;
  note?: string;
}) {
  return (
    <div className="text-center mb-6">
      <h3 className="font-serif text-xl text-dark-teal font-semibold tracking-widest mb-2 text-center underline">{title}</h3>
      <div className="text-center">
        <p className="font-serif text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center">{type}</p>
        
        {description && <p className="font-serif text-sm md:text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center">{description}</p>}
        
        {gentlemen && (
          <div className="font-serif text-sm md:text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center">
            <p>Gentlemen:</p>
            <p>{gentlemen}</p>
          </div>
        )}
        
        {ladies && (
          <div className="font-serif text-sm md:text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center">
            <p>Ladies:</p>
            <p>{ladies}</p>
          </div>
        )}
        
        {note && <p className="font-serif text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center">{note}</p>}
      </div>
    </div>
  );
}

/**
 * Attire guidelines component
 */
function AttireGuidelines() {
  return (
    <div className="w-full grid grid-cols-2 gap-12 text-dark-teal">
      <div className="flex-1 text-center">
        <div className="font-serif font-semibold mb-2">For Her:</div>
        <ul className="list-disc list-inside text-sm md:text-base font-serif">
          <li>Midi or maxi dresses in blue teal or yellow</li>
          <li>Blouses with modest skirts (no revealing cuts or high slits)</li>
          <li>Dressy but rustic-friendly style</li>
        </ul>
      </div>
      <div className="flex-1 text-center">
        <div className="font-serif font-semibold mb-2">For Him:</div>
        <ul className="list-disc list-inside text-sm md:text-base font-serif">
          <li>Barong or Polo</li>
          <li>Slacks or tailored trousers (no jeans or shorts)</li>
          <li>Comfortable dress shoes or loafers</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Pre-wedding film section component
 */
function PreWeddingFilmSection() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-8">
      <Image src={IMAGES.preWedding} alt="Pre-wedding background" fill className="object-cover object-right brightness-90" />
      <div className="absolute inset-0 flex items-center justify-center px-2">
        <div className="w-full max-w-3xl aspect-video bg-black/10 rounded-xl flex items-center justify-center shadow-lg">
          <iframe
            width="700"
            height="400"
            src="https://www.youtube.com/embed/y3xKysdwavM?si=x8DbE23GVoNeD_B3"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

/**
 * FAQs section component
 */
function FAQSection() {
  const faqs = [
    {
      value: "gifts",
      question: "GIFTS",
      answer: "As love is what the night is all about. Your presence is one we can't celebrate without. But should you still believe that a gift is worth giving. A small envelope for our future is a delightful blessing."
    },
    {
      value: "plus-one",
      question: "PLUS ONE",
      answer: "Due to the constraints of our venue and the size of our families, we have made the difficult decision to limit our guest list to immediate family members and close friends only. We sincerely appreciate your understanding and cooperation in adhering to our wishes."
    },
    {
      value: "children",
      question: "CHILDREN",
      answer: "Although we love your little ones, we can only accommodate the children of our immediate family. We apologize for the inconvenience this may cause."
    },
    {
      value: "photos",
      question: "TAKE THE SHOT",
      answer: "Once we've exchanged our vows and said \"I do,\" feel free to take as many photos as you'd like. Don't forget to use our official hashtag when sharing on social media: #ANNsweredPrayerofVERJ"
    }
  ];

  return (
    <motion.section
      className="w-full max-w-2xl py-8 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-serif mb-12 text-center">FAQs</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.value} value={faq.value}>
            <AccordionTrigger className="flex items-center justify-between w-full py-3 font-semibold text-lg border-b border-gray-200">
              {faq.question}
              <ChevronDown className="w-5 h-5" />
            </AccordionTrigger>
            <AccordionContent className="py-2 text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
}

/**
 * Final fullscreen image section component
 */
function FinalImageSection() {
  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-end overflow-visible mt-8 p-0">
      <div className="relative w-full h-[100vh] md:h-[100vh] flex-1">
        <Image src={IMAGES.final} alt="Final Fullscreen" fill className="object-cover object-bottom" priority />
      </div>
    </section>
  );
}

/**
 * Main wedding landing page component
 */
export default function WeddingLanding() {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] w-full min-h-screen flex flex-col items-center">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/audio/도깨비OSTBEAUTIFUL VIOLIN COVER(GOBLIN OST).mp3"
        autoPlay
        loop
        className="hidden"
      />
      
      <HeroSection />
      <LoveStorySection />
      
      {/* Countdown Timer */}
      <motion.section
        className="w-full py-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Countdown />
      </motion.section>
      
      <SaveTheDateSection />
      <EventDetailsSection />
      <RSVPSection />
      <ScriptureSection />
      <AttireSection />
      <PreWeddingFilmSection />
      <FAQSection />
      <FinalImageSection />
      
      <BackToTopButton />
    </div>
  );
}
