import { writable } from 'svelte/store';

export const guessedLetters = writable(new Set());
export const foundLetters = writable(new Set());
export const missedLetters = writable(new Set());
export const notifications = writable([]);
