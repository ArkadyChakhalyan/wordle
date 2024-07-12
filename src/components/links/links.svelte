<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { GITHUB_LINK } from '../../constants';
    import github from '../../lib/images/github.svg';

    let show: boolean;

    const onClick = () => {
        window.open(GITHUB_LINK, '_blank');
    };

    onMount(() => show = true);
</script>

{#if show}
    <button
        class="link"
        on:click={onClick}
        in:fade={{ duration: 200, delay: 400 }}
    >
        <img src={github} alt="github">
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
        height: 32px;
        width: 32px;
        padding: 0;
        border: 2px solid var(--color-text-dark);
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.8;
        user-select: none;
        background: #fff;
        transition: all ease-in-out 0.2s;
    }
    .link:hover,
    .link:focus {
        opacity: 1;
    }
    .link:focus-visible {
        outline: none;
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
