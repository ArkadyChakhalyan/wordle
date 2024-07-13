import { PLAYED_WORDS_LS } from '../constants';

export const getPlayedWords = (): string[] => {
    const playedWords = localStorage.getItem(PLAYED_WORDS_LS);
    return playedWords ? JSON.parse(playedWords) : [];
}
