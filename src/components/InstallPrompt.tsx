import { useEffect, useState } from "react";
import { X, Share, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const VISIT_KEY = "msg_visit_count";
const DISMISS_KEY = "msg_install_dismissed";

export const InstallPrompt = () => {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Skip in iframe / preview
    try {
      if (window.self !== window.top) return;
    } catch {
      return;
    }

    // Already installed
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;
    if (standalone) return;

    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    const visits = parseInt(localStorage.getItem(VISIT_KEY) || "0", 10) + 1;
    localStorage.setItem(VISIT_KEY, String(visits));

    if (visits < 2) return;

    const ua = window.navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua);
    setIsIOS(ios);

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    if (ios) {
      // iOS has no install API, show manual instructions
      const t = setTimeout(() => setShow(true), 2000);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    dismiss();
  };

  if (!show) return null;

  const copy = {
    de: {
      title: "App installieren",
      desc: "Füge My Secret Garden zu deinem Home-Bildschirm hinzu, für schnellen Zugriff aufs Tagesmenü.",
      install: "Installieren",
      later: "Später",
      iosHint: "Tippe auf",
      iosHint2: "und dann auf",
    },
    en: {
      title: "Install app",
      desc: "Add My Secret Garden to your home screen for quick access to today's menu.",
      install: "Install",
      later: "Later",
      iosHint: "Tap",
      iosHint2: "then",
    },
  }[language];

  return (
    <div className="fixed inset-x-3 bottom-3 z-[60] md:left-auto md:right-4 md:bottom-4 md:max-w-sm animate-fade-in">
      <div className="rounded-2xl border border-border bg-background-elevated shadow-elevated p-4 flex gap-3">
        <img src="/favicon.png" alt="" className="w-12 h-12 rounded-xl flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-cormorant text-lg leading-tight text-text-primary">{copy.title}</h3>
            <button
              onClick={dismiss}
              aria-label="Close"
              className="text-text-muted hover:text-text-primary p-1 -m-1"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm font-work text-text-secondary mt-1">{copy.desc}</p>
          {isIOS ? (
            <p className="text-xs font-work text-text-muted mt-2 flex items-center gap-1 flex-wrap">
              {copy.iosHint} <Share size={14} className="inline" /> {copy.iosHint2}{" "}
              <Plus size={14} className="inline" />
            </p>
          ) : (
            <div className="flex gap-2 mt-3">
              <button
                onClick={install}
                className="bg-action-primary text-text-inverse rounded-lg px-4 py-2 text-sm font-work font-semibold"
              >
                {copy.install}
              </button>
              <button
                onClick={dismiss}
                className="text-text-secondary rounded-lg px-4 py-2 text-sm font-work"
              >
                {copy.later}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
