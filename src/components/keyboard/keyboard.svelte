<script lang="ts">
    import { KEYBOARD, RESTART, SUBMIT } from '../../constants.js';
    import { createEventDispatcher, onMount } from 'svelte';
    import Key from '../key/key.svelte';
    import { foundLetters, guessedLetters, missedLetters } from '../../stores/stores';
    import { fly } from 'svelte/transition';

    export let disabled: boolean,
        won: boolean,
        show: boolean = false,
        key: {} = {},
        button: HTMLElement = null;

    const dispatch = createEventDispatcher();

    onMount(() => show = true);

    $: if (won) key = {};
</script>

{#if show}
    <div class="keyboard" in:fly={{ duration: 500, delay: 250, y: 40, opacity: 0 }}>
        <button
            class="submit"
            disabled={!won && disabled}
            on:click={() => dispatch('submit')}
            bind:this={button}
        >
            {won ? RESTART : SUBMIT}
            {#if won}
                <div
                    class="slide"
                    in:fly={{
                        duration: window.innerWidth * 0.9 > 800 ? 1100 : 800,
                        delay: 500,
                        x: -button.offsetWidth - 80,
                        opacity: 1
                    }}
                />
            {/if}
        </button>
        {#each KEYBOARD as row}
            <div class="row">
                {#each row as key}
                    <Key
                        key={key}
                        guessed={$guessedLetters.has(key)}
                        found={$foundLetters.has(key)}
                        missed={$missedLetters.has(key)}
                        on:click={() => dispatch('keyClick', key)}
                    />
                {/each}
            </div>
        {/each}
    </div>
{/if}

<style>
    .keyboard {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        flex-direction: column;
        margin-top: 40px;
    }
    .row {
        display: flex;
        gap: 6px;
    }
    .submit {
        position: relative;
        height: 40px;
        width: 100%;
        background: var(--color-primary-dark);
        color: var(--color-text-button-primary);
        border-radius: 4px;
        border: none;
        font-size: 14px;
        transition: all ease-in-out 0.2s;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
    }
    .submit:disabled {
        opacity: 0.8;
        background: var(--color-bg-alternative-dark);
        color: var(--color-text-alternative-dark);
        pointer-events: none;
    }
    .submit:focus-visible {
        outline: none;
    }
    .submit:focus, .submit:hover {
        box-shadow: var(--box-shadow);
    }
    .slide {
        position: absolute;
        right: -80px;
        top: -12px;
        height: 72px;
        width: 80px;
        background: linear-gradient(110deg, transparent 20%, #fff 40%, #fff, 60%, transparent 80%);
        opacity: 0.2;
    }
    :global(.light ) .submit {
        background: var(--color-primary-light);
    }
    :global(.light ) .submit:disabled {
        background: var(--color-bg-alternative-light);
        color: var(--color-text-alternative-light);
    }
    @media (max-width: 720px) {
        .keyboard {
            margin-top: 32px;
            gap: 4px;
        }
        .row {
            gap: 4px;
        }
    }
    @media (max-width: 460px) {
        .keyboard {
            flex-grow: 1;
            justify-content: flex-end;
            margin-bottom: 16px;
        }
        .submit {
            height: 48px;
        }
    }
</style>
