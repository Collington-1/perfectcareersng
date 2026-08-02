import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site-config";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hi PerfectCareers, I'd like some career help.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp — Get CV or SOP help"
      className="group fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pr-4 pl-3 text-white shadow-lg shadow-black/20 transition-all duration-300 sm:pr-3 sm:hover:pr-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:bottom-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60 [animation-duration:2.5s]" />
      <MessageCircle className="size-6 shrink-0" fill="currentColor" strokeWidth={0} />
      <span className="text-sm font-semibold whitespace-nowrap sm:hidden">Get CV or SOP here</span>
      <span className="hidden max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100 sm:inline-block">
        Chat with an Expert
      </span>
    </a>
  );
}
