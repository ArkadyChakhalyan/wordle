export function clickOutside(node: HTMLElement) {
    const onClick = (e: MouseEvent) => {
        if (node && !node.contains(e.target as HTMLElement) && !e.defaultPrevented) {
            node.dispatchEvent(new CustomEvent('clickOutside', { detail: e.target as HTMLElement }));
        }
    }

    document.addEventListener('click', onClick, true);
    return {
        destroy() {
            document.removeEventListener('click', onClick, true);
        }
    }
}
