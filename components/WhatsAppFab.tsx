"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl("Hi Damarus, I'd like to automate something in my business")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 12px 34px -8px rgba(37,211,102,0.6)",
      }}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 0 0 rgba(37,211,102,0.5)", animation: "pulse-slow 3s ease-in-out infinite" }}
        aria-hidden
      />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  );
}
