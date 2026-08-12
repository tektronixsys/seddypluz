import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, ArrowRight, Sparkles } from "lucide-react";

interface FaqItem {
  id: string;
  category: "booking" | "travel" | "wigs" | "prep";
  question: string;
  answer: string;
}

const faqList: FaqItem[] = [
  {
    id: "faq-1",
    category: "booking",
    question: "How far in advance should I book my bridal glam session?",
    answer:
      "We recommend reserving your wedding date 3 to 6 months in advance, especially for high-demand wedding seasons (October through January). Because Seddypluz accepts a limited number of brides per weekend to ensure dedicated focus, early consultation secures your date on our master calendar.",
  },
  {
    id: "faq-2",
    category: "booking",
    question: "What is your booking retainer and cancellation policy?",
    answer:
      "A 50% non-refundable retainer is required upon contract signing to lock in your date. The remaining 50% balance is due 7 days prior to the wedding event. In the event of date rescheduling, we accommodate your new date subject to calendar availability with at least 30 days prior notice.",
  },
  {
    id: "faq-3",
    category: "travel",
    question: "Do you travel outside Lagos and for destination weddings?",
    answer:
      "Yes! Seddypluz frequently travels across Nigeria (Abuja, Port Harcourt, Ibadan, Calabar) and internationally (United Kingdom, United States, Dubai, Ghana, Zanzibar). Destination packages include travel logistics, full-day touchup support, and multi-event look changes (Welcome Dinner, Traditional Ceremony, White Wedding).",
  },
  {
    id: "faq-4",
    category: "prep",
    question: "Is a bridal preview (trial session) included in the package?",
    answer:
      "Yes. Full bridal packages include an intimate 2.5-hour in-studio trial session scheduled 2 to 4 weeks before your big day. We map your skin undertones, test sweat-resistant base formulations, customize lash fans, and conduct a preliminary gele styling to finalize your personalized wedding day portrait.",
  },
  {
    id: "faq-5",
    category: "wigs",
    question: "What is the quality of hair extensions in the Seddypluz Boutique?",
    answer:
      "Our boutique features 100% Raw Virgin Remy and Double-Drawn human hair extensions with full cuticle alignment. They can be heat-styled, dyed, bleached, and reused for 3+ years with proper maintenance. All wigs come pre-plucked with ultra-thin HD Swiss lace for an invisible melt.",
  },
  {
    id: "faq-6",
    category: "wigs",
    question: "Can I get my boutique wig styled or installed in the studio?",
    answer:
      "Absolutely. When you purchase any luxury wig or bundle deal from our boutique, you can book an in-studio customization and installation session where we bleach the knots, tint the lace to your exact skin tone, and style it into bone straight, soft glam waves, or an editorial cut.",
  },
  {
    id: "faq-7",
    category: "prep",
    question: "How should I prepare my skin and hair before my session?",
    answer:
      "We provide every bride with a comprehensive 14-day pre-wedding skin prep guide. On the morning of your session, arrive with a cleansed, moisturized bare face, and freshly washed, oil-free cornrows (flat to the scalp) if you are wearing a wig or sculpted gele.",
  },
];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredFaqs =
    activeCategory === "all" ? faqList : faqList.filter((item) => item.category === activeCategory);

  return (
    <section id="faq" className="relative py-14 md:py-24 bg-[#FAF9F5] overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-mauve/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 h-[400px] w-[400px] rounded-full bg-lavender/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1600px] px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-plum/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-lavender-deep mb-4 border border-plum/10">
            <HelpCircle className="h-3.5 w-3.5 text-lavender-deep" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-5xl leading-[1.05] text-plum md:text-7xl">
            Everything You Need <br />
            <em className="text-lavender-deep">To Know.</em>
          </h2>
          <p className="mt-4 text-sm md:text-base text-plum/70">
            Clear answers regarding our bridal consultation, travel logistics, bespoke wigs, and
            appointment booking process.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { key: "all", label: "All Questions" },
            { key: "booking", label: "Booking & Policy" },
            { key: "travel", label: "Destination Travel" },
            { key: "wigs", label: "Boutique Wigs" },
            { key: "prep", label: "Skin & Trials" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === tab.key
                  ? "bg-plum text-[#FAF9F5] shadow-md shadow-plum/20"
                  : "bg-white text-plum/70 hover:bg-plum/5 border border-plum/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-plum/10 shadow-[0_20px_50px_-15px_rgba(82,58,77,0.06)]">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="border border-plum/10 rounded-2xl px-6 py-1 data-[state=open]:border-plum/25 data-[state=open]:bg-[#FAF9F5]/60 transition-colors"
              >
                <AccordionTrigger className="font-serif text-lg md:text-xl font-bold text-plum hover:no-underline hover:text-lavender-deep py-5">
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-plum/75 pb-6 font-sans">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Have Questions CTA Card */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-plum to-[#3e2338] p-8 md:p-12 text-[#FAF9F5] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-widest uppercase text-amber-300 mb-3 border border-white/20">
              <Sparkles className="h-3 w-3" />
              Direct Artist Consultation
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-[#FAF9F5]">
              Have a custom request or unique event timeline?
            </h3>
            <p className="mt-2 text-xs md:text-sm text-[#FAF9F5]/75 max-w-lg leading-relaxed">
              Chat directly with Seddypluz on WhatsApp for instant date availability checks and
              custom bridal quotes.
            </p>
          </div>

          <a
            href="https://wa.me/2348162292997?text=Hello%20Seddypluz%20Beauty%20Studio!%20I%20have%20a%20question%20regarding%20booking%20and%20bridal%20dates."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 py-4 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="h-4.5 w-4.5 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
