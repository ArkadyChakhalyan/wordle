<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import Key from '../key/key.svelte';
    import { BASIC_RULES, RULE_KEY, RULES_REST, RULES_TITLE } from '../../constants';
    import { clickOutside } from '../../customEvents/clickOutside';
    import { onMount } from 'svelte';

    let button: HTMLElement, opened: boolean, show: boolean;

    const onClickOutside = (e: any) => {
        if (e.detail === button) return;
        opened = false;
    };

    onMount(() => {
        show = true;
    });
</script>

{#if show}
    <button
        class="info"
        class:opened
        bind:this={button}
        on:click={() => opened = !opened}
        in:fade={{ duration: 200, delay: 400 }}
    >
        i
    </button>
{/if}
{#if opened}
    <div
        class="rules"
        transition:fly={{ y: 8, duration: 300 }}
        use:clickOutside
        on:clickOutside={onClickOutside}
    >
        <h3 class="title">{RULES_TITLE}</h3>
        <p class="text">{BASIC_RULES}</p>
        {#each RULES_REST as rule}
            <div class="rule">
                <Key
                    key={RULE_KEY}
                    fake
                    found={rule.found}
                    guessed={rule.guessed}
                    missed={rule.missed}
                />
                <p class="text">{rule.text}</p>
            </div>
        {/each}
    </div>
{/if}

<style>
    .info {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 24px;
        bottom: 24px;
        height: 32px;
        width: 32px;
        padding: 0;
        border: 2px solid var(--color-text-dark);
        border-radius: 50%;
        font-size: 16px;
        background: none;
        cursor: pointer;
        opacity: 0.9;
        user-select: none;
        color: var(--color-text-dark);
    }
    .info:hover,
    .info:focus,
    .info.opened {
        opacity: 1;
    }
    .info:focus-visible {
        outline: none;
    }
    .title {
        margin: 0;
        margin-bottom: 12px;
        text-align: center;
        color: var(--color-text-alternative-dark);
    }
    .text {
        margin: 0;
        font-size: 12px;
        color: var(--color-text-alternative-dark);
    }
    .rules {
        position: fixed;
        right: 24px;
        bottom: 64px;
        padding: 16px;
        box-shadow: var(--box-shadow);
        border-radius: 8px;
        width: 320px;
        background: var(--color-bg-alternative-2-dark);
        z-index: 5;
    }
    .rule {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 12px;
    }
    .rule .text {
        padding-left: 14px;
        text-indent: -6px;
    }
    :global(.light) .info {
        border-color: var(--color-text-light);
        color: var(--color-text-light);
    }
    :global(.light) .title {
        color: var(--color-text-alternative-light);
    }
    :global(.light) .text {
        color: var(--color-text-alternative-light);
    }
    :global(.light) .rules {
        background: var(--color-bg-alternative-2-light);
    }
    @media (max-width: 460px) {
        .info {
            top: 30px;
            right: 16px;
            bottom: unset;
        }
        .rules {
            width: unset;
            top: 72px;
            bottom: unset;
            right: 16px;
            left: 16px;
        }
    }
</style>
