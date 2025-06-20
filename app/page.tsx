"use client";

import React from "react";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const heroImage = "/images/JSH02285.jpg";
const galleryImages = [
  "/images/JSH02375.jpg",
  "/images/JSH01496.jpg",
  "/images/C.jpg",
  "/images/JSH00460.jpg",
  "/images/JSH02020.jpg",
  "/images/JSH00721.jpg",
];
const coupleImage = "/images/JSH02085.jpg";
const qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://example.com/rsvp";

function Countdown() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const diff = new Date("2025-08-15T15:00:00").getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((diff / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((diff / 1000) % 60));

  // Google Calendar event handler
  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Verj & Ann's Wedding");
    const details = encodeURIComponent("Join us for the wedding of Verj & Ann!\n\nCeremony: God's Grace Believers Bible Baptist Church, Bypass Rd, Brgy. Guyong, Santa Maria, Bulacan\nReception: Uncle's Events Place, E Celestino St, Santa Maria, Bulacan");
    const location = encodeURIComponent("God's Grace Believers Bible Baptist Church, Bypass Rd, Brgy. Guyong, Santa Maria, Bulacan");
    // 2025-08-15T15:00:00 to 2025-08-15T18:00:00 (3 hours)
    const start = "20250815T150000";
    const end = "20250815T180000";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="w-full bg-[var(--color-dark-teal)] py-8 flex flex-col items-center gap-8 shadow-lg">
      <h2 className="text-3xl md:text-4xl font-serif italic mb-2 !text-white">Countdown to Forever</h2>
      <div className="flex p-2 gap-4 md:gap-6 text-center items-end">
        <div>
          <div className="text-3xl md:text-6xl font-bold !text-white">{days}</div>
          <div className="text-xs md:text-sm font-semibold uppercase tracking-widest mt-1 !text-white">Days</div>
        </div>
        <div className="text-4xl md:text-5xl font-bold !text-white">:</div>
        <div>
          <div className="text-3xl md:text-6xl font-bold !text-white">{hours.toString().padStart(2, '0')}</div>
          <div className="text-xs md:text-sm font-semibold uppercase tracking-widest mt-1 !text-white">Hours</div>
        </div>
        <div className="text-4xl md:text-5xl font-bold !text-white">:</div>
        <div>
          <div className="text-3xl md:text-6xl font-bold !text-white">{minutes.toString().padStart(2, '0')}</div>
          <div className="text-xs md:text-sm font-semibold uppercase tracking-widest mt-1 !text-white">Minutes</div>
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white">:</div>
        <div>
          <div className="text-3xl md:text-6xl font-bold text-accent-yellow">{seconds.toString().padStart(2, '0')}</div>
          <div className="text-xs md:text-sm font-semibold uppercase tracking-widest mt-1 !text-white">Seconds</div>
        </div>
      </div>
      <button
        className="mt-4 px-6 py-2 rounded font-bold cursor-pointer text-accent-yellow bg-transparent border-none text-lg tracking-wide focus:outline-none"
        onClick={handleAddToCalendar}
      >ADD TO CALENDAR</button>
    </div>
  );
}

// BackToTopButton component
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
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-opacity duration-300 bg-[var(--color-gold)] hover:bg-[var(--color-dark-teal)] text-white focus:outline-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ boxShadow: '0 4px 16px rgba(13,76,95,0.15)' }}
    >
      {/* Up arrow SVG */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
    </button>
  );
}

export default function WeddingLanding() {
  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] w-full min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
        <Image src={heroImage} alt="Romantic couple silhouette" fill className="object-cover object-bottom brightness-75" priority />
        <div className="absolute inset-0 flex flex-col items-center top-30 md:top-20 text-center px-4">
          <h1 className="cursive text-8xl md:text-9xl drop-shadow-lg mb-2 text-gold">Verj & Ann</h1>
          <h2 className="font-serif text-3xl md:text-4xl text-gold mb-4">08.15.2025</h2>
        </div>
      </section>

      {/* Love Story Section */}
      <motion.section
        className="w-full max-w-3xl py-16 px-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-4xl md:text-5xl text-dark-teal mb-4 text-center">Our Love Story</h2>
        <h3 className="font-serif text-xl text-gold mb-6 text-center">— a little peek into how forever began —</h3>
        <p className="font-serif text-lg text-center mb-6">Ten years ago, we had no idea what God was preparing in us, and for us. Every step, every delay, every moment of waiting—He was weaving our hearts together in His perfect time, far better than we could imagine. This isn&apos;t just our journey, it&apos;s His masterpiece.</p>
        <div className="mb-8">
          <h4 className="font-serif text-2xl text-gold mb-2 text-center">The First Date</h4>
          <p className="font-serif text-base text-center mb-4">We kept planning, kept canceling—life and distance got in the way. But one random day, Greenhills became the place where we finally showed up for each other.</p>
        </div>
        <div className="mb-8">
          <h4 className="font-serif text-2xl text-gold mb-2 text-center">The Day I Said Yes</h4>
          <p className="font-serif text-base text-center mb-4">Not over dinner, not under the stars in Baguio. But somewhere along the highway home — August 15,2022 He asked, in the most unexpected way. &quot;Can we change our Facebook status?&quot; And even though I waited for it. It still felt like a perfect surprise.</p>
        </div>
        <div className="mb-12">
          <h4 className="font-serif text-2xl text-gold mb-2 text-center">The Proposal</h4>
          <p className="font-serif text-base text-center mb-4">So here&apos;s the thing, Again in Baguio—Verj is the shy type who hates being the center of attention. We visited so many romantic places, but the moment he proposed wasn&apos;t in any of them. It happened in the car. He wasn&apos;t sure how to give me the ring, so on the way back he said, &quot;Let&apos;s change your ring. Will you marry me?&quot; Even when you expect it, the moment still takes your breath away. And of course, I said yes!</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {galleryImages.map((src, i) => (
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

      {/* Save the Date */}
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
          <h2 className="font-serif text-5xl md:text-5xl text-dark-teal mb-4 mt-2 text-center" style={{ fontFamily: 'var(--font-serif)' }}>Save the Date</h2>
          <h3 className="text-xl mb-8 text-center">— Mark your calendars for our special day —</h3>
          <div className="bg-white rounded-2xl shadow p-10 flex flex-col items-center w-full max-w-2xl">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 w-full mb-4 text-2xl md:text-3xl text-center">
              <span className="font-serif tracking-widest text-gray-500">S</span>
              <span className="font-serif tracking-widest text-gray-500">M</span>
              <span className="font-serif tracking-widest text-gray-500">T</span>
              <span className="font-serif tracking-widest text-gray-500">W</span>
              <span className="font-serif tracking-widest text-gray-500">T</span>
              <span className="font-serif tracking-widest text-gray-500">F</span>
              <span className="font-serif tracking-widest text-gray-500">S</span>
            </div>
            <div className="border-t border-gray-200 w-full mb-4"></div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-4 w-full text-center text-2xl md:text-3xl font-serif">
              {/* First row: empty, empty, empty, empty, empty, 1, 2 */}
              <div></div><div></div><div></div><div></div><div></div>
              <div>1</div><div>2</div>
              {/* Second row: 3-9 */}
              {[3,4,5,6,7,8,9].map(day => <div key={day}>{day}</div>)}
              {/* Third row: 10-16 */}
              {[10,11,12,13,14].map(day => <div key={day}>{day}</div>)}
              <motion.div
                key={15}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
                className="relative flex items-center justify-center"
              >
                <span className="z-10 font-bold text-4xl md:text-5xl text-dark-teal">15</span>
                {/* Animated Heart SVG around 15 */}
                <motion.svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-18 md:w-24"
                  viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                  <path d="M45 82s-22.5-17.5-31-29.5C7.5 41 13 29 24 25.5c8.5-2.5 16 3.5 18.5 8 2.5-4.5 10-10.5 18.5-8C77 29 82.5 41 76 52.5 67.5 64.5 45 82 45 82Z" stroke="#F2D46E" strokeWidth="4" fill="none"/>
                </motion.svg>
              </motion.div>
              <div>16</div>
              {/* Fourth row: 17-23 */}
              {[17,18,19,20,21,22,23].map(day => <div key={day}>{day}</div>)}
              {/* Fifth row: 24-30 */}
              {[24,25,26,27,28,29,30].map(day => <div key={day}>{day}</div>)}
              {/* Sixth row: 31, rest empty */}
              <div>31</div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Event Details + Timeline Grid */}
      <motion.section
        className="w-full max-w-4xl py-16 px-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-5xl md:text-5xl text-dark-teal mb-4 mt-2 text-center" style={{ fontFamily: 'var(--font-serif)' }}>Event Details & Timeline</h2>
        <h3 className="text-xl mb-8 text-center">— Everything you need to know for our special day —</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-0 bg-transparent">
          {/* Row 1, Col 1: Couple Photo */}
          <div className="relative h-[260px] md:h-full w-full md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none shadow-lg ">
            <Image src={coupleImage} alt="Couple" fill className="object-cover object-center md:object-left" />
          </div>
          {/* Row 1, Col 2: Details Card */}
          <div className="bg-white md:rounded-r-2xl md:rounded-bl-none flex flex-col justify-center pt-8 md:p-12 shadow-lg h-full items-center text-center">
            <h2 className="font-serif text-4xl text-dark-teal mb-8 italic" style={{ fontFamily: 'var(--font-serif)' }}>Details</h2>
            {/* Ceremony */}
            <div className="mb-8">
              <h3 className="uppercase text-gold text-lg tracking-widest mb-2">Ceremony</h3>
              <div className="font-serif text-xl font-bold text-dark-teal leading-tight mb-1">God&apos;s Grace Believers<br/>Bible Baptist Church</div>
              <div className="italic text-sm text-dark-teal text-opacity-70 mb-4">Bypass Rd, Brgy. Guyong<br/>Santa Maria, Bulacan</div>
              <div className="flex justify-center">
                <a href="https://maps.app.goo.gl/SqzGvwDnXonZyU1H6" className="bg-[var(--color-gold)] text-white px-6 py-2 rounded font-serif text-base shadow hover:bg-[var(--color-dark-teal)] transition-colors">VIEW MAP</a>
              </div>
            </div>
            {/* Reception */}
            <div>
              <h3 className="uppercase text-gold text-lg tracking-widest mb-2">Reception</h3>
              <div className="font-serif text-xl font-bold text-dark-teal leading-tight mb-1">Uncle&apos;s Events Place</div>
              <div className="italic text-sm text-dark-teal text-opacity-70 mb-4">E Celestino St, Santa Maria, Bulacan</div>
              <div className="flex justify-center">
                <a href="https://maps.app.goo.gl/xVN4dzniUteyYkyc7" className="bg-[var(--color-gold)] text-white px-6 py-2 rounded font-serif text-base shadow hover:bg-[var(--color-dark-teal)] transition-colors">VIEW MAP</a>
              </div>
            </div>
          </div>
          {/* Row 2, Col 1: Timeline */}
          <div className="bg-white md:rounded-bl-2xl md:rounded-br-none flex flex-col justify-center p-8 md:p-12 shadow-lg h-full border-t md:border-t-0 md:border-r border-gray-100 items-center text-center">
            <h2 className="font-serif text-4xl text-dark-teal mb-8 italic" style={{ fontFamily: 'var(--font-serif)' }}>Timeline</h2>
            <div className="flex flex-col gap-8">
              <div>
                <div className="text-xl font-serif text-dark-teal mb-1">2:30 PM</div>
                <div className="uppercase text-gray-500 tracking-widest">Ceremony</div>
              </div>
              <div>
                <div className="text-xl font-serif text-dark-teal mb-1">3:30 PM</div>
                <div className="uppercase text-gray-500 tracking-widest">Cocktail</div>
              </div>
              <div>
                <div className="text-xl font-serif text-dark-teal mb-1">5:00 PM</div>
                <div className="uppercase text-gray-500 tracking-widest">Dinner</div>
              </div>
            </div>
          </div>
          {/* Row 2, Col 2: Second Photo */}
          <div className="relative h-[260px] md:h-full w-full md:rounded-br-2xl rounded-b-2xl md:rounded-bl-none shadow-lg overflow-hidden">
            <Image src="/images/JSH02105.jpg" alt="Couple 2" fill className="object-cover object-center" />
          </div>
        </div>
      </motion.section>

      {/* RSVP Section */}
      <motion.section
        className="w-full max-w-xl py-12 px-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="w-full bg-white border border-gray-300 rounded-2xl p-8 md:p-12 flex flex-col items-center shadow-lg">
          <h2 className="font-serif italic text-4xl text-dark-teal mb-6 text-center" style={{ fontFamily: 'var(--font-serif)' }}>RSVP</h2>
          <p className="text-center mb-8 text-lg font-serif text-[var(--color-foreground)]">
            Every invited guest holds a special place in our hearts,<br />
            and we truly can&apos;t imagine celebrating this day<br />
            without you. As we have limited seating, we kindly<br />
            ask that you RSVP by <span className="text-gold font-semibold">July 25, 2025</span>.
          </p>
          <Image src={qrCode} alt="RSVP QR Code" width={160} height={160} className="mb-8" />
          <p className="text-center mb-6 text-base font-serif">
            Kindly scan the <span className="font-semibold">QR</span> code or click the link<br />
            below to lead you to the RSVP form
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScIFEsmTBw4-NytTCLUSHA5pLWyUqoSvtPNi6dS5pWOVCDXRg/viewform?usp=header" className="mt-2 bg-[var(--color-gold)] text-white px-10 py-3 rounded font-serif text-lg shadow hover:bg-[var(--color-dark-teal)] hover:text-white transition-colors border-none">CLICK HERE!</a>
        </div>
      </motion.section>

      {/* Scripture Section */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden mt-8">
        <Image src="/images/JSH02261.jpg" alt="Scripture background" fill className="object-cover object-center brightness-90" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="font-serif italic text-3xl md:text-4xl text-white drop-shadow-lg mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Ecclesiastes 3:1
          </h2>
          <p className="font-serif text-xl md:text-2xl text-white drop-shadow-lg">To every thing there is a season...</p>
        </div>
      </section>

      {/* Entourage Section */}
      <section className="w-full flex justify-center py-16 px-2 bg-transparent">
        <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full py-12 px-2 md:px-16 flex flex-col items-center">
          <h2 className="cursive text-5xl text-dark-teal mb-2 text-center" style={{ fontFamily: 'var(--font-cursive)' }}>
            The entourage
          </h2>
          <h3 className="font-serif text-lg tracking-widest mb-8 text-center">TAGULAO- PALERO NUPTIALS</h3>
          <div className="w-full">
            {/* Parents */}
            <div className="w-full grid grid-cols-2 gap-6 md:gap-8 text-center mb-6">
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Parents of the Groom</div>
                <div className="font-serif text-base text-xs md:text-lg">Ptr. Ireneo Tagulao<br/>Mrs. Zenaida Tagulao</div>
              </div>
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Parents of the Bride</div>
                <div className="font-serif text-base text-xs md:text-lg">Mr. Rodrigo Palero<br/>Mrs. Felisicima Palero</div>
              </div>
            </div>
            {/* Officiating Pastor */}
            <div>
              <div className="col-span-2 w-full">
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider w-full text-center">Officiating Pastor</div>
              </div>
              <div>
                <div className="font-serif text-center text-xs md:text-lg">
                  Ptr. Ver Julius Tagulao
                </div>
              </div>
            </div>
            {/* Principal Sponsors */}
            <div className="col-span-2 w-full mt-6">
              <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider w-full text-center">Principal Sponsors</div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6 md:gap-8 text-center mt-6">
              <div>
                <div className="font-serif text-center text-xs md:text-lg">
                Ptr. Conrado Herrera<br/>
                Ptr. Richard John Raon<br/>
                Ptr. Alan Navea<br/>
                Mr. Noel Girasol<br/>
                Mr. Mark Anthony Cabio<br/>
                Mr. Elmer Guanzon<br/>
                Mr. Kinn Villegas<br/>
                Mr. Lemuel Montes<br/>
                Ptr. Reynaldo Remogat Jr.<br/>
                Mr. June Asuncion<br/>
                Mr. Rodrigo Sambrano
                </div>
              </div>
              <div>
                <div className="font-serif text-center text-xs md:text-lg">
                Mrs. Babylene Herrera<br/>
                Mrs. Catherine Faith Raon<br/>
                Mrs. Rhona Navea<br/>
                Mrs. Jovelyn Girasol<br/>
                Mrs. Venjie Cabio<br/>
                Mrs. Josephine Guanzon<br/>
                Mrs. Janice Villegas<br/>
                Mrs. Regina Caalim<br/>
                Mrs. Myrna Reyes<br/>
                Mrs. Judith Asuncion<br/>
                Mrs. Fely Sambrano<br/>
                Mrs. Liza Badillo<br/>
                Mrs. Bernadette Umayam<br/>
                Mrs. Irenea Tirao<br/>
                Mrs. Florena Tagulao
                </div>
              </div>
            </div>
            {/* Best Man / Maid of Honor */}
            
            <div className="w-full grid grid-cols-2 gap-6 md:gap-8 text-center mt-6">
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Best Man</div>
                <div className="font-serif text-center text-xs md:text-lg">Mr. Nathaniel Louis Sandoc</div>
              </div>
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Maid of Honor</div>
                <div className="font-serif text-center text-xs md:text-lg">Ms. Gerlie Durana</div>
              </  div>
            </div>
            {/* Groomsmen / Bridesmaids */}
            <div className="w-full grid grid-cols-2 gap-6 md:gap-8 text-center mt-6 mb-6 ">
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Groomsmen</div>
                <div className="font-serif text-center text-xs md:text-lg">
                Mr. Peter Milano<br/>
                Mr. Eljay Sambrano<br/>
                Mr. Peter Michael Tagulao<br/>
                </div>
              </div>
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Bridesmaids</div>
                <div className="font-serif text-center text-xs md:text-lg">
                Ms. Abigail Malapitan<br/>
                Ms. Zoe Micah Nicole Cabio<br/>
                Ms. Julliana Grace Tagulao<br/>
                </div>
              </div>
            </div>
            {/* Secondary Sponsors */}
            <div className="col-span-2 w-full">
              <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider w-full text-center">Secondary Sponsors</div>
            </div>
            <div className="w-full grid grid-cols-2 gap-6 md:gap-8 text-center mt-6">
              <div>
                <div className="font-serif text-base"><span className="font-semibold uppercase text-lg text-[#9B8353]">Candle</span><br/>
                <span className=" text-xs md:text-lg"> Mr. Renjay Rosal<br/>Ms. Alexandria Nicole Caalim</span></div>
              </div>
              <div>
                <div className="font-serif text-base"><span className="font-semibold uppercase text-lg text-[#9B8353]">Veil</span><br/>
                <span className=" text-xs md:text-lg">Mr. Jhon Regie Tagulao<br/>Ms. Leah Angeline Banadera</span></div>
              </div>
            </div>
            <div>
              <div className="font-serif text-center mt-6"><span className="font-semibold uppercase text-lg text-[#9B8353]">Cord</span><br/>
              <span className=" text-xs md:text-lg">Ptr. Timothy John Fernandez<br/>Ms. Chermae Theresa Aguila</span>
              </div>
            </div>
            {/* Bearers */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center mt-6">
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Ring Bearer</div>
                <div className="font-serif text-base text-xs md:text-lg">Asher Lemrod Tamon</div>
              </div>
              <div>
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Bible Bearer</div>
                <div className="font-serif text-base text-xs md:text-lg">Azariah Lemuel Rod Tamon</div>
              </div>  
              <div className="hidden md:block">
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Coin Bearers</div>
                <div className="font-serif text-base text-xs md:text-lg">Darell Chase Ramos<br/>Gabriel Rodriguez</div>
              </div>
            </div>
            <div className="w-full text-center block md:hidden">
                <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider">Coin Bearers</div>
                <div className="font-serif text-base text-xs md:text-lg">Darell Chase Ramos<br/>Gabriel Rodriguez</div>
            </div>
            <div className="font-serif uppercase text-lg font-semibold mb-1 text-[#9B8353] tracking-wider text-center mt-6">Flower Girl</div>
            <div className="w-full grid grid-cols-2 md:grid-cols-3 text-center">
                <div className="font-serif text-center text-xs md:text-lg">
                  Amara Naomi Dizon<br/>
                  Rosie Brielle Mayo
                </div>
                <div className="font-serif text-center text-xs md:text-lg">
                Harmony Lois Fernandez<br/>
                  Zeraphine Loira Sosa
                </div>
                <div className="font-serif text-center text-xs md:text-lg">
                  Maria Jean Athena Tiu
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attire Section */}
      <motion.section
        className="w-full max-w-3xl py-8 px-4 flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="cursive text-5xl text-dark-teal mb-4 text-center" style={{ fontFamily: 'var(--font-cursive)' }}>Dress Code</h2>
        <h3 className="font-serif text-xl text-dark-teal font-semibold tracking-widest mb-2 text-center underline">FOR PRINCIPAL SPONSORS</h3>
        <div className="text-center">
          <p className="font-serif text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center ">Formal</p>
          <div className="font-serif text-sm md:text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center">
            <p>Gentlemen:</p>
            <p>Barong (Nude or any Neutral Colors) with Black Pants</p>
          </div>
          <div className="font-serif text-sm md:text-lg    text-dark-teal font-semibold tracking-widest mb-2 text-center">
            <p>Ladies:</p>
            <p>Gown or Dress (Teal Blue or Yellow)</p>
          </div>
        </div>
        <h3 className="font-serif text-xl text-dark-teal font-semibold tracking-widest mb-2 text-center mt-6 underline">FOR GUEST</h3>
        <div className="font-serif text-lg text-dark-teal font-semibold tracking-widest mb-2 text-center">
          <p>Semi-Formal</p>
          <p>We&apos;d love to see you in these colors:</p>
          <p>As a sign of respect, we kindly ask guests not to wear white. <br/> This color is reserved for the bride.</p>
        </div>
        <div className="mb-6 flex justify-center">
          <Image src="/images/Attire.png" alt="Guest Attire Illustration" width={220} height={180} />
        </div>
        <div className="flex justify-center gap-4 my-6">
          <span className="w-14 h-14 rounded-md inline-block" style={{ background: '#0D4C5F' }}></span>
          <span className="w-14 h-14 rounded-md inline-block" style={{ background: '#4B7D8B' }}></span>
          <span className="w-14 h-14 rounded-md inline-block" style={{ background: '#F2E7A2' }}></span>
          <span className="w-14 h-14 rounded-md inline-block" style={{ background: '#F2D46E' }}></span>
        </div>
        <h4 className="font-serif text-xl mt-8 mb-4 text-center">Attire Guidelines</h4>
        <div className="w-full grid grid-cols-2 gap-12 text-dark-teal">
          <div className="flex-1 text-center">
            <div className="font-serif font-semibold mb-2">For Her:</div>
            <ul className="list-disc list-inside text-sm text-base font-serif">
              <li>Midi or maxi dresses in blue teal or yellow</li>
              <li>Blouses with modest skirts (no revealing cuts or high slits)</li>
              <li>Dressy but rustic-friendly style</li>
              <li>Accessories in earthy, gold, or muted tones</li>
            </ul>
          </div>
          <div className="flex-1 text-center">
            <div className="font-serif font-semibold mb-2">For Him:</div>
            <ul className="list-disc list-inside text-sm text-base font-serif">
              <li>Barong</li>
              <li>Slacks or tailored trousers (no jeans or shorts)</li>
              <li>Comfortable dress shoes or loafers</li>
              <li>Ties optional (preferably in yellow or coordinating shades)</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Pre-wedding Film Section */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden mt-8">
        <Image src="/images/JSH02006.jpg" alt="Pre-wedding background" fill className="object-cover object-right brightness-90" />
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
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <motion.section
        className="w-full max-w-2xl py-8 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-serif mb-12 text-center">FAQs</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="guest">
            <AccordionTrigger className="flex items-center justify-between w-full py-3 font-semibold text-lg border-b border-gray-200">GIFTS<ChevronDown className="w-5 h-5" /></AccordionTrigger>
            <AccordionContent className="py-2 text-gray-700">As love is what the night is all about. Your presence is one we can&apos;t celebrate without. But should you still believe that a gift is worth giving. A small envelope for our future is a delightful blessing.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="kids">
            <AccordionTrigger className="flex items-center justify-between w-full py-3 font-semibold text-lg border-b border-gray-200">PLUS ONE<ChevronDown className="w-5 h-5" /></AccordionTrigger>
            <AccordionContent className="py-2 text-gray-700">Due to the constraints of our venue and the size of our families, we have made the difficult decision to limit our guest list to immediate family members and close friends only.  We sincerely appreciate your understanding and cooperation in adhering to our wishes.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="children">
            <AccordionTrigger className="flex items-center justify-between w-full py-3 font-semibold text-lg border-b border-gray-200">CHILDREN<ChevronDown className="w-5 h-5" /></AccordionTrigger>
            <AccordionContent className="py-2 text-gray-700">Although we love your little ones, we can only accommodate the children of our immediate family. We apologize for the inconvenience this may cause.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="photos">
            <AccordionTrigger className="flex items-center justify-between w-full py-3 font-semibold text-lg border-b border-gray-200">TAKE THE SHOT<ChevronDown className="w-5 h-5" /></AccordionTrigger>
            <AccordionContent className="py-2 text-gray-700">Once we&apos;ve exchanged our vows and said &quot;I do,&quot; feel free to take as many photos as you&apos;d like. Don&apos;t forget to use our official hashtag when sharing on social media: #ANNsweredPrayerofVERJ</AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.section>

      {/* Final Fullscreen Image */}
      <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-end overflow-visible mt-8 p-0">
        <div className="relative w-full h-[100vh] md:h-[100vh] flex-1">
          <Image src="/images/JSH02307.jpg" alt="Final Fullscreen" fill className="object-cover object-bottom" priority />
        </div>
      </section>
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  );
}
