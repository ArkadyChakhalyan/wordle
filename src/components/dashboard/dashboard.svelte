<script lang="ts">
    import {
        ALLOWED_SYMBOLS,
        DASHBOARD_DEFAULT,
        EMPTY_ROW, NOTIFICATION_LOST, NOTIFICATION_NEW_GAME,
        NOTIFICATION_WON,
        NOTIFICATIONS_WORD_NOT_FOUND, PLAYED_WORDS_LS
    } from '../../constants.js';
    import { getRandomPlayableWord } from '../../selectors/getRandomPlayableWord.js';
    import Keyboard from '../keyboard/keyboard.svelte';
    import { onMount, SvelteComponent } from 'svelte';
    import { getWordExist } from '../../selectors/getWordExist';
    import { foundLetters, guessedLetters, missedLetters } from '../../stores/stores';
    import NotificationsHelper from '../../helpers/notificationsHelper.svelte';
    import { getPlayedWords } from '../../selectors/getPlayedWords';
    import { scale } from 'svelte/transition';

    let word: string,
        activeTry: number = 0,
        disabled: boolean = true,
        tries: string[][] = [],
        previousNotification: string,
        notificationsHelper: SvelteComponent,
        lost: boolean = false,
        won: boolean = false;

    const onStart = () => {
        word = getRandomPlayableWord();
        console.log(word)
        tries = [...DASHBOARD_DEFAULT];
        activeTry = 0;
        won = false;
        lost = false;
        $foundLetters = new Set();
        $guessedLetters = new Set();
        $missedLetters = new Set();
    };

    onMount(() => {
        onStart();
    });

    const onSubmit = () => {
        if (won || lost) {
            onStart();
            notificationsHelper.showNotification(NOTIFICATION_NEW_GAME);
        } else {
            if (disabled) return;
            disabled = true;

            const activeTryWord = tries[activeTry].join('');
            if (!getWordExist(activeTryWord)) {
                const getNotificationText = () => {
                    const notificationText = NOTIFICATIONS_WORD_NOT_FOUND[Math.floor(Math.random() * NOTIFICATIONS_WORD_NOT_FOUND.length)];
                    if (notificationText === previousNotification) {
                        return getNotificationText();
                    } else {
                        return notificationText;
                    }
                }
                const notificationText = getNotificationText();
                previousNotification = notificationText;
                notificationsHelper.showNotification(notificationText);
                return;
            } else if (activeTryWord === word) {
                won = true;
                localStorage.setItem(PLAYED_WORDS_LS, JSON.stringify([...getPlayedWords(), word]));
                notificationsHelper.showNotification(NOTIFICATION_WON);
            } else {
                tries[activeTry].forEach((letter, idx) => {
                    if (letter === word[idx]) {
                        $foundLetters = $foundLetters.add(letter);
                    } else if (word.includes(letter)) {
                        $guessedLetters = $guessedLetters.add(letter);
                    } else {
                        $missedLetters = $missedLetters.add(letter);
                    }
                });
                if (activeTry < tries.length - 1) {
                    activeTry += 1;
                } else {
                    lost = true;
                    notificationsHelper.showNotification(NOTIFICATION_LOST);
                }
            }
        }
    };

    const onKeyPress = (key: string) => {
        if (key === 'Enter') {
            onSubmit();
        } else if (won || lost) {
            return;
        } else if (key === 'Delete' || key === 'Backspace' || key === '←') {
            for (let i = 0; i < tries[activeTry].length; i++) {
                const idx = tries[activeTry].length - i - 1;
                if (tries[activeTry][idx]) {
                    tries[activeTry] = [
                        ...tries[activeTry].slice(0, idx),
                        '',
                        ...tries[activeTry].slice(idx + 1)
                    ];
                    break;
                }
            }
            disabled = true;
        } else if (key === 'Escape') {
            tries[activeTry] = EMPTY_ROW;
            disabled = true;
        } else if (ALLOWED_SYMBOLS.includes(key) && !tries[activeTry].at(-1)) {;
            const idx = tries[activeTry].indexOf('');
            tries[activeTry] = [
                ...tries[activeTry].slice(0, idx),
                key,
                ...tries[activeTry].slice(idx + 1)
            ];
            disabled = !tries[activeTry].at(-1);
        }
    };
</script>

<svelte:window on:keydown={e => onKeyPress(e.key)} />

<NotificationsHelper bind:this={notificationsHelper} />

<div class="dashboard">
    <div class="words">
        {#each tries as tryWord, i}
            <div class="word" class:active={!lost && activeTry === i} class:won={activeTry === i && won}>
                {#each tryWord as letter, i}
                    <span
                        class="letter"
                        class:guessed={$guessedLetters.has(letter)}
                        class:found={$foundLetters.has(letter) && word[i] === letter}
                        in:scale|global={{ duration: 320, delay: Math.random() * 400 }}
                    >
                        {letter.toUpperCase()}
                    </span>
                {/each}
            </div>
        {/each}
    </div>
    <Keyboard
        won={won || lost}
        disabled={disabled}
        on:keyClick={({ detail }) => onKeyPress(detail)}
        on:submit={onSubmit}
    />
</div>

<style>
    .dashboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .words {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .word {
        display: flex;
        gap: 8px;
        opacity: 0.8;
        transition: all ease-in-out 0.3s;
    }
    .word.active {
        opacity: 1;
        scale: 1.04;
    }
    .letter {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 48px;
        border-radius: 6px;
        background: var(--color-bg-alternative-dark);
        color: var(--color-text-alternative-dark);
        font-weight: bold;
        font-size: 24px;
        user-select: none;
    }
    .letter.guessed {
        background: var(--color-secondary-dark);
        color: var(--color-text-dark);
    }
    .letter.found {
        background: var(--color-primary-dark);
        color: var(--color-text-dark);
    }
    .active .letter {
        background: var(--color-bg-alternative-dark);
        color: var(--color-text-alternative-dark);
    }
    .won .letter {
        background: var(--color-primary-dark);
        color: var(--color-text-dark);
    }
    :global(.light ) .letter {
        background: var(--color-bg-alternative-light);
        color: var(--color-text-alternative-light);
    }
    :global(.light ) .letter.guessed {
        background: var(--color-secondary-light);
        color: var(--color-text-button-primary);
    }
    :global(.light ) .letter.found {
        background: var(--color-primary-light);
        color: var(--color-text-button-primary);
    }
    :global(.light ) .active .letter {
        background: var(--color-bg-alternative-light);
        color: var(--color-text-alternative-light);
    }
    :global(.light ) .won .letter {
        background: var(--color-primary-light);
        color: var(--color-text-button-primary);
    }
    @media (max-width: 460px) {
        .dashboard {
            flex-grow: 1;
        }
    }
    .won .letter {
        animation: scale 0.4s ease-in-out;
    }
    .won .letter:nth-child(2) {
        animation-delay: 0.1s;
    }
    .won .letter:nth-child(3) {
        animation-delay: 0.2s;
    }
    .won .letter:nth-child(4) {
        animation-delay: 0.3s;
    }
    .won .letter:nth-child(5) {
        animation-delay: 0.4s;
    }
    @keyframes scale {
        0% {
            scale: 1;
        }
        40% {
            scale: 1.08;
        }
        90% {
            scale: 0.98;
        }
        100% {
            scale: 1;
        }
    }
</style>
