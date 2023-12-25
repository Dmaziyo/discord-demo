// TranslationsProvider.tsx
"use client";

import initTranslations from "@/app/i18n";
import { PropsWithChildren, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

let i18n: any;

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
}: PropsWithChildren<{
  locale: string;
  namespaces: string[];
}>) {
  const [instance, setInstance] = useState(i18n);

  useEffect(() => {
    const init = async () => {
      if (!i18n) {
        const newInstance = await initTranslations(locale, namespaces);
        i18n = newInstance;
        setInstance(newInstance);
      } else {
        if (i18n.language !== locale) {
          i18n.changeLanguage(locale);
        }
      }
    };

    init();
  }, [locale, namespaces]);

  if (!instance) {
    return null;
  }

  return (
    <I18nextProvider i18n={instance} defaultNS={namespaces[0]}>
      {children}
    </I18nextProvider>
  );
}

