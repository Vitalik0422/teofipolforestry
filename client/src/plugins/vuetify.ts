/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify';
// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

export default createVuetify({
  theme: {
    defaultTheme: 'brandTheme',
    themes: {
      brandTheme: {
        dark: false,
        colors: {
          'primary': '#015B35',
          'secondary': '#FCBC05',
          'accent': '#469B3E',
          'info': '#00718F',
          'warning': '#FB7E24',
          'background': '#F2F2F2',
          'surface': '#FFFFFF',
          'on-surface': '#212121',
          'error': '#B00020',
          'success': '#469B3E',
        },
      },
    },
  },
});
