import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { i18n } from "@lingui/core";
// import { I18nProvider } from "@lingui/react";
import {
  DEFAULT_LOCALE,
  SupportedLocale,
  SUPPORTED_LOCALES,
  plurals,
} from "../../configs/localization";

const LocaleContext = createContext<{
  userLocale: SupportedLocale;
  setUserLocale: (newLocale: SupportedLocale) => void;
} | null>(null);

async function dynamicActivate(locale: SupportedLocale) {
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale] });

  try {
    const catalogue = await import(`../../locales/${locale}.js`);
    i18n.load(locale, catalogue.messages || catalogue.default.messages);
    //eslint-disable-next-line
  } catch (error) {}
  i18n.activate(locale);
}

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const locale = useActiveLocale();
  const [userLocale, setUserLocaleState] = useState<SupportedLocale>(locale);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("user-locale", userLocale);
  }, [userLocale]);

  const setUserLocale = (newLocale: SupportedLocale) =>
    setUserLocaleState(newLocale);

  useEffect(() => {
    dynamicActivate(userLocale)
      .then(() => {
        document.documentElement.setAttribute("lang", userLocale);
        setLoaded(true);
      })
      .catch((error) =>
        console.error("Failed to load locale file", userLocale, error)
      );
  }, [userLocale]);

  if (!loaded) return null;

  return (
    <LocaleContext.Provider value={{ userLocale, setUserLocale }}>
      {/* <I18nProvider i18n={i18n}>{children}</I18nProvider> */}
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("Missing Locale context");

  const { userLocale, setUserLocale } = context;
  return {
    userLocale,
    setUserLocale,
  };
};

function parseLocale(cultureCode: unknown): SupportedLocale | undefined {
  if (typeof cultureCode !== "string") return undefined;
  const searchString = cultureCode.toLowerCase();

  return SUPPORTED_LOCALES.find(
    (locale) =>
      locale.toLowerCase() === searchString ||
      locale.split("-")[0] === searchString
  );
}

export function navigatorLocale(): SupportedLocale | undefined {
  if (typeof window !== "undefined") {
    if (!navigator.language) return undefined;

    const [language, region] = navigator.language.split("-");

    if (region) {
      return (
        parseLocale(`${language}-${region.toUpperCase()}`) ??
        parseLocale(language)
      );
    }
  }

  return undefined;
}

function usePersistedUserLocale() {
  if (typeof window !== "undefined") {
    return parseLocale(localStorage.getItem("user-locale"));
  }

  return null;
}

export function useActiveLocale(): SupportedLocale {
  const persistedLocale = usePersistedUserLocale();

  return useMemo(
    () => persistedLocale ?? navigatorLocale() ?? DEFAULT_LOCALE,
    [persistedLocale]
  );
}
