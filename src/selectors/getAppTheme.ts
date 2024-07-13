import { APP_THEME_LS } from '../constants';
import { EAppTheme } from '../types/types';

export const getAppTheme = (): EAppTheme => {
    const theme = localStorage.getItem(APP_THEME_LS);
    return theme ? JSON.parse(theme) : EAppTheme.LIGHT;
}
