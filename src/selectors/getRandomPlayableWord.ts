import { WORDS_PLAYABLE } from '../data/words';
import { getPlayedWords } from './getPlayedWords';

export const getRandomPlayableWord = (): string => {
    let word = WORDS_PLAYABLE[Math.floor(Math.random() * WORDS_PLAYABLE.length)];
    const playedWords = getPlayedWords();
    if (playedWords.includes(word)) {
        return getRandomPlayableWord();
    } else {
        return word;
    }
}
