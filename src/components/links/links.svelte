<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { GITHUB_LINK } from '../../constants';

    let button: HTMLElement, show: boolean;

    const onClick = () => {
        window.open(GITHUB_LINK, '_blank');
    };

    onMount(() => {
        show = true;
    });
</script>

{#if show}
    <button
        class="link"
        bind:this={button}
        on:click={onClick}
        in:fade={{ duration: 200, opacity: 0, delay: 400 }}
    >
        <img src="public/github.png" alt="github">
    </button>
{/if}

<style>
    .link {
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 64px;
        bottom: 24px;
        min-height: 32px;
        max-height: 32px;
        min-width: 32px;
        max-width: 32px;
        padding: 0;
        border: 2px solid var(--color-text-dark);
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.8;
        user-select: none;
        background: #fff;
    }
    .link:hover,
    .link:focus {
        opacity: 1;
    }
    .link:focus-visible {
        outline: none;
    }
    .link img {
        width: 29px;
    }
    :global(.light) .link {
        border-color: var(--color-text-light);
    }
    @media (max-width: 460px) {
        .link {
            top: 30px;
            right: 56px;
            bottom: unset;
        }
    }
</style>
