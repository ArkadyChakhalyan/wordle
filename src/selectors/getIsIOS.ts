export const getIsIOS = (): boolean => {
    alert(navigator.platform + ' ' +  ['iPod', 'iPhone'].includes(navigator.platform))
    return ['iPod', 'iPhone'].includes(navigator.platform);
}
