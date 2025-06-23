import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from '../i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = typeof messages['en-US'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
declare module 'vue-i18n' {
  // define the locale messages schema
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineDateTimeFormat {}

  // define the number format schema
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineNumberFormat {}
}
let lang = localStorage.getItem('locale')
lang = lang || 'en-US'

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: lang,
    legacy: false,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
