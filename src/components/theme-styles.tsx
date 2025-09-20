import { themeCssVariables } from '@/styles/theme';

export const ThemeStyles = () => (
  <style data-facodi-theme="true" dangerouslySetInnerHTML={{ __html: themeCssVariables }} />
);
