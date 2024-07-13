<script lang="ts">
    import { NOTIFICATION_DEFAULT_TIMEOUT } from '../constants';
    import { v4 as uuidv4 } from 'uuid';
    import { notifications } from '../stores/stores';

    export function showNotification(
        text: string,
        timeout: number = NOTIFICATION_DEFAULT_TIMEOUT,
    ) {
        const id = uuidv4();
        $notifications = [...$notifications, {
            text,
            id
        }];
        setTimeout(() => {
            $notifications = [...$notifications.filter(item => item.id !== id)];
        }, timeout);
    }
</script>
