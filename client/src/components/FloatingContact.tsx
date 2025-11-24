import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 mb-2">
          <a
            href="http://wa.me/491637830812"
            target="_blank"
            className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-green-600 transition"
            data-testid="link-whatsapp"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a
            href="http://t.me/kingarthi"
            target="_blank"
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-600 transition"
            data-testid="link-telegram"
          >
            <Send size={18} /> Telegram
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="bg-primary text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition"
        data-testid="button-floating-contact"
      >
        <span className="text-lg">✉️</span>
      </button>
    </div>
  );
}
