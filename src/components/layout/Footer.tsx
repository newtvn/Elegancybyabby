import Link from "next/link";
import { Globe, AtSign, MessageCircle } from "lucide-react";
import { CATEGORIES, WHATSAPP_NUMBER, SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="silk-bg text-white mt-0">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="italic text-2xl text-white mb-4 font-bold">Elegancy</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Redefining Beauty</p>
            <p className="text-white/50 text-sm leading-relaxed">
              Hair accessories &amp; hypoallergenic jewelry store. Next day delivery — pickup mtaani or doorstep.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
                <AtSign className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Collection */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">Collection</h4>
            <div className="space-y-3">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className="block text-sm text-white/60 hover:text-white transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">Company</h4>
            <div className="space-y-3">
              <Link href="/" className="block text-sm text-white/60 hover:text-white transition-colors">
                Our Story
              </Link>
              <Link href="/requests" className="block text-sm text-white/60 hover:text-white transition-colors">
                Custom Orders
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                Contact via WhatsApp
              </a>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-5">Stay Connected</h4>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Reach out to us for exclusive pieces, new arrivals and special offers.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Crafted with love in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
