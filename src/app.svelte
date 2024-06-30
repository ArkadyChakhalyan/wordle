<script lang="ts">
    import Dashboard from './components/dashboard/dashboard.svelte';
    import Rules from './components/rules/rules.svelte';
    import Notifications from './components/notifications/notifications.svelte';
    import Switch from './components/switch/switch.svelte';
    import { NAME, NOTIFICATION_DEFAULT_TIMEOUT, NOTIFICATIONS_WELCOME } from './constants.js';
    import { onMount, SvelteComponent } from 'svelte';
    import NotificationsHelper from './helpers/notificationsHelper.svelte';
    import { fly } from 'svelte/transition';

    let notificationsHelper: SvelteComponent, show: boolean;

    onMount(() => {
        show = true;
        setTimeout(() => {
            NOTIFICATIONS_WELCOME.map((notification, idx) => {
                setTimeout(() => {
                    notificationsHelper.showNotification(notification);
                }, NOTIFICATION_DEFAULT_TIMEOUT * 0.25 * idx);
            });
        }, NOTIFICATION_DEFAULT_TIMEOUT * 0.25);
    });
</script>

<NotificationsHelper bind:this={notificationsHelper} />
<Switch />
<Rules />
{#if show}
    <h1 class='title' in:fly={{ duration: 400, delay: 250, x: -64, opacity: 0 }}>
        <span class="highlight">{NAME.slice(0, 1)}</span>{NAME.slice(1)}
    </h1>
{/if}
<Dashboard />
<Notifications />

<style>
    .title {
        user-select: none;
    }

    .highlight {
        color: var(--color-primary-dark);
    }

    :global(.light ) .highlight {
        color: var(--color-primary-light);
    }

</style>
