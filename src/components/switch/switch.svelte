<script lang="ts">
    import { getAppTheme } from '../../selectors/getAppTheme';
    import { EAppTheme } from '../../types/types';
    import { APP_THEME_LS } from '../../constants';
    import { onMount } from 'svelte';

    let theme = getAppTheme();

    onMount(() => {
        document.documentElement.className = theme === EAppTheme.LIGHT ? 'light' : 'dark';
    });

    const onThemeToggle = () => {
        theme = theme === EAppTheme.LIGHT ? EAppTheme.DARK : EAppTheme.LIGHT;
        localStorage.setItem(APP_THEME_LS, JSON.stringify(theme));
        document.documentElement.className = theme === EAppTheme.LIGHT ? 'light' : 'dark';
    };
</script>

<div
    class="switch"
    class:checked={theme === EAppTheme.DARK}
>
    <input
        on:click={onThemeToggle}
        type="checkbox"
        checked={theme === EAppTheme.DARK}
    />
</div>

<style>
    .switch {
        position: fixed;
        top: 24px;
        right: 24px;
        width: 48px;
        height: 24px;
        background: var(--color-bg-alternative-light);
        transition: all ease-in-out 0.25s;
        border-radius: 12px;
        overflow: hidden;
    }
    .switch:focus-within {
        box-shadow: var(--box-shadow);
    }
    .switch:before {
        content: 'L';
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        height: 20px;
        width: 20px;
        left: 2px;
        top: 2px;
        border-radius: 50%;
        background: var(--color-primary-light);
        transition: all ease-in-out 0.25s;
        font-size: 8px;
        color: var(--color-text-button-primary);
    }
    .switch input {
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
        cursor: pointer;

    }
    .switch.checked {
        background: var(--color-bg-alternative-dark);
    }
    .switch.checked:before {
        content: 'D';
        transform: translateX(24px);
        background: var(--color-primary-dark);
    }
    @media (max-width: 460px) {
        .switch {
            top: 34px;
            left: 16px;
            right: unset;
        }
    }
</style>
