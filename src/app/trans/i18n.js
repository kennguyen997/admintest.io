import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './en';
import translationKR from './kr';

const resources = {
  english: { translation: translationEN },
  korean: { translation: translationKR },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('lang') == 'english' ? 'english' : 'korean',
    keySeparator: '.', // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
