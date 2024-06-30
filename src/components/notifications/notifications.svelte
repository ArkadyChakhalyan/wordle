<script lang="ts">
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { fly } from 'svelte/transition';
    import { notifications } from '../../stores/stores.js';
    import { MAX_NOTIFICATIONS_COUNT, MAX_NOTIFICATIONS_COUNT_MOBILE, SHORT_NAME } from '../../constants.js';

    const [send, receive] = crossfade({
        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 500,
                css: (t) => `
					transform: ${transform};
					opacity: ${t};
				`
            };
        }
    });

    $: {
        const maxNotificationsCount = window.innerWidth > 460 ?
             MAX_NOTIFICATIONS_COUNT : MAX_NOTIFICATIONS_COUNT_MOBILE;
        if ($notifications.length > maxNotificationsCount) $notifications = [...$notifications.slice(1)];
    }
</script>

<div class="notifications">
    {#each $notifications as notification (notification.id)}
        <div
            class="notification"
            in:receive={{ key: notification.id }}
            out:send={{ key: notification.id }}
            animate:flip
        >
            {notification.text}
        </div>
    {/each}
    {#if $notifications.length}
        <div class="avatar" transition:fly={{ duration: 300, y: 24, opacity: 0 }}>
            <span class="highlight">{SHORT_NAME[0]}</span>
            {SHORT_NAME[1]}
        </div>
    {/if}
</div>

<style>
    .notifications {
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 8px;
        left: 24px;
        bottom: 24px;
        padding-bottom: 20px;
        padding-left: 20px;
    }
    .notification {
        display: flex;
        align-items: center;
        width: fit-content;
        min-height: 24px;
        border-radius: 6px;
        padding: 8px 16px;
        background: var(--color-bg-alternative-2-dark);
        color: var(--color-text-dark);
        box-shadow: var(--box-shadow);
        font-size: 14px;
        user-select: none;
    }
    .avatar {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid var(--color-text-dark);
        font-size: 14px;
        color: var(--color-text-dark);
        font-weight: bold;
        background: var(--color-bg-alternative-2-dark);
        user-select: none;
        letter-spacing: -1px;
    }
    .highlight {
        color: var(--color-primary-dark);
    }
    :global(.light ) .notification {
        background: var(--color-bg-alternative-2-light);
        color: var(--color-text-light);
    }
    :global(.light ) .highlight {
        color: var(--color-primary-light);
    }
    :global(.light ) .avatar {
        border-color: var(--color-text-light);
        color: var(--color-text-light);
        background: var(--color-bg-alternative-2-light);
    }
    @media (max-width: 1100px) {
        .notifications {
            top: 16px;
            width: fit-content;
            max-width: calc(100% - 32px);
            bottom: unset;
            padding: 0;
        }
        .avatar {
            display: none;
        }
    }
    @media (max-width: 460px) {
        .notifications {
            gap: 6px;
        }
        .notification {
            width: unset;
        }
    }
</style>
