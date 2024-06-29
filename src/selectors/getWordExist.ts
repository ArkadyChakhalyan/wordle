import { WORDS_ALL } from '../data/words';

export const getWordExist = (word: string): boolean => WORDS_ALL.includes(word);
