import text from '@/shared/const/text';

const { themes: txt } = text;

const themes: Record<number, any> = {
  0: {
    name: txt.yellowTheme,
    class: 'base-theme',
    nextThemeId: 1,
  },
  1: {
    name: txt.redTheme,
    class: 'red-theme',
    nextThemeId: 0,
  },
};

function getNextThemeName(themeId: number): string {
  const { nextThemeId } = themes[themeId];

  return themes[nextThemeId].name;
}

function getNextThemeId(themeId: number): number {
  return themes[themeId].nextThemeId;
}

function getThemeClass(themeId: number): string {
  return themes[themeId].class;
}

export default { getNextThemeName, getNextThemeId, getThemeClass };
