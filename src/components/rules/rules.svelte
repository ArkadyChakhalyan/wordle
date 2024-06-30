<script lang="ts">
    import { fly } from 'svelte/transition';
    import Key from '../key/key.svelte';
    import { BASIC_RULES, RULE_KEY, RULES_REST, RULES_TITLE } from '../../constants';
    import { clickOutside } from '../../customEvents/clickOutside';

    let button: HTMLElement, opened: boolean;

    const onClickOutside = (e: any) => {
        if (e.detail === button) return;
        opened = false;
    };
</script>

<button
    class="info"
    class:opened
    bind:this={button}
    on:click={() => opened = !opened}
>
    i
</button>
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
        position: fixed;
        right: 24px;
        bottom: 24px;
        height: 32px;
        min-width: 32px;
        max-width: 32px;
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
    }
    .rule {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 12px;
    }
    .rule .text {
        padding-left: 16px;
        text-indent: -10px;
    }
    :global(.light ) .info {
        border: 2px solid var(--color-text-light);
        color: var(--color-text-light);
    }
    :global(.light ) .title {
        color: var(--color-text-alternative-light);
    }
    :global(.light ) .text {
        color: var(--color-text-alternative-light);
    }
    :global(.light ) .rules {
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
