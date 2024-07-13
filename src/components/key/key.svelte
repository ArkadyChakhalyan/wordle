<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let key: string,
        guessed: boolean | undefined = undefined,
        found: boolean | undefined = undefined,
        missed: boolean | undefined = undefined,
        fake: boolean | undefined = undefined;
    const dispatch = createEventDispatcher();
</script>

<button
    class="key"
    class:guessed
    class:found
    class:missed
    class:fake
    on:click={() => {
        if (fake) return;
        dispatch('click', key);
    }}
    on:keydown={e => {
        if (e.key === 'Space') {
            dispatch('click', key);
        } else if (e.key === 'Enter') {
            e.preventDefault();
        }
    }}
>
    {key}
</button>

<style>
    .key {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 38px;
        min-width: 38px;
        cursor: pointer;
        background: var(--color-bg-alternative-dark);
        color: var(--color-text-alternative-dark);
        opacity: 0.9;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        font-weight: normal;
        user-select: none;
        transition: all ease-in-out 0.2s;
    }
    .key:hover,.key:focus {
        opacity: 1;
    }
    .key.guessed {
        background: var(--color-secondary-dark);
        color: var(--color-text-dark);
    }
    .key.found {
        background: var(--color-primary-dark);
        color: var(--color-text-dark);
    }
    .key.missed {
        opacity: 0.5;
    }
    .key.fake {
        pointer-events: none;
        opacity: 1;
    }
    :global(.light) .key {
        background: var(--color-bg-alternative-light);
        color: var(--color-text-alternative-light);
    }
    :global(.light) .key.guessed {
        background: var(--color-secondary-light);
        color: var(--color-text-button-primary);
    }
    :global(.light) .key.found {
        background: var(--color-primary-light);
        color: var(--color-text-button-primary);
    }

    @media (max-width: 1200px) {
        .key {
            min-width: 32px;
            height: 32px;
        }
    }
    @media (max-width: 720px) {
        .key {
            height: 34px;
            min-width: 28px;
        }
    }
    @media (max-width: 460px) {
        .key {
            min-width: 22px;
            max-width: 22px;
            font-size: 12px;
        }
    }
</style>
