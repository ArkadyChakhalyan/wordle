export const NAME = '5БУКВ';
export const SHORT_NAME = NAME.slice(0, 2);

const ATTEMPTS_COUNT = 5;
const WORD_LENGTH = 5;
export const EMPTY_ROW = new Array(WORD_LENGTH).fill('');
export const DASHBOARD_DEFAULT = new Array(ATTEMPTS_COUNT).fill([...EMPTY_ROW]);
export const KEYBOARD = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '←']
];
//'✓'
export const ALLOWED_SYMBOLS = ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];

export const SUBMIT = 'Проверить слово';
export const RESTART = 'Начать новую игру';

export const RULE_KEY = 'Б';
export const RULES_TITLE = 'Правила';
export const BASIC_RULES = 'Все очень просто! Твоя задача - отгадать слово из 5 букв за 5 попыток. Все слова должны быть существительными из 5 букв.'
export const RULES_REST = [
    {
        found: true,
        text: '- ты отгадал букву в правильном месте'
    },
    {
        guessed: true,
        text: '- ты отгадал букву, но она находится в другом месте'
    },
    {
        missed: true,
        text: '- такой буквы в слове нет'
    }
];

export const MAX_NOTIFICATIONS_COUNT = 4;
export const MAX_NOTIFICATIONS_COUNT_MOBILE = 2;

export const NOTIFICATION_DEFAULT_TIMEOUT = 5000;
export const NOTIFICATION_WELCOME_1 = 'Добро пожаловать!';
export const NOTIFICATION_WELCOME_2 = 'Я загадал слово';
export const NOTIFICATIONS_WELCOME = [
    NOTIFICATION_WELCOME_1,
    NOTIFICATION_WELCOME_2,
];
export const NOTIFICATION_WORD_NOT_FOUND_1 = 'Я не знаю такого слово';
export const NOTIFICATION_WORD_NOT_FOUND_2 = 'Хм... Ты уверен, что такое слово существует?';
export const NOTIFICATION_WORD_NOT_FOUND_3 = 'В моем словаре, такого слово точно нет';
export const NOTIFICATION_WORD_NOT_FOUND_4 = 'Давай попробуем еще';
export const NOTIFICATIONS_WORD_NOT_FOUND = [
    NOTIFICATION_WORD_NOT_FOUND_1,
    NOTIFICATION_WORD_NOT_FOUND_2,
    NOTIFICATION_WORD_NOT_FOUND_3,
    NOTIFICATION_WORD_NOT_FOUND_4,
];
export const NOTIFICATION_WON = 'Поздравляю, ты победил!';
export const NOTIFICATION_NEW_GAME = 'Я загадал новое слово';
export const NOTIFICATION_LOST = 'Ты не отгадал мое слово';

export const PLAYED_WORDS_LS = 'PLAYED_WORDS';
export const APP_THEME_LS = 'APP_THEME';
