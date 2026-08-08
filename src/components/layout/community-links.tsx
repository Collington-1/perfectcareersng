import { siteConfig } from "@/lib/site-config";
import { WhatsAppIcon, TelegramIcon } from "@/components/icons/social-icons";

// Sits opposite the main WhatsApp chat CTA (bottom-right) so the two
// don't compete — this is the lower-key "join our community" pair.
export function CommunityLinks() {
  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2.5 sm:bottom-6">
      <a
        href={siteConfig.community.whatsappGroup}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our WhatsApp group"
        title="Join our WhatsApp group"
        className="flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <WhatsAppIcon className="size-5" />
      </a>
      <a
        href={siteConfig.community.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our Telegram group"
        title="Join our Telegram group"
        className="flex size-11 items-center justify-center rounded-full bg-[#26A5E4] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#26A5E4]"
      >
        <TelegramIcon className="size-5" />
      </a>
    </div>
  );
}
