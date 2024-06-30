export const getIsIOS = (): boolean => {
    return ['iPod', 'iPhone'].includes(navigator.platform);
}
