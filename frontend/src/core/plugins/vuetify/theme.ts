import Colors from '@/theme/colors'
import type { ThemeDefinition } from 'vuetify'

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    ...Colors.light,
    'primary-darken-1': Colors.light.inversePrimary,
    'surface-bright': Colors.light.surfaceBright,
    'surface-light': Colors.light.surfaceTint,
    'surface-variant': Colors.light.surfaceVariant,
    'on-surface-variant': Colors.light.onSurfaceVariant,
  },
}

export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    ...Colors.dark,
    'primary-darken-1': Colors.dark.inversePrimary,
    'surface-bright': Colors.dark.surfaceBright,
    'surface-dark': Colors.dark.surfaceTint,
    'surface-variant': Colors.dark.surfaceVariant,
    'on-surface-variant': Colors.dark.onSurfaceVariant,
  },
}

export const theme = {
  defaultTheme: 'light',
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
}
