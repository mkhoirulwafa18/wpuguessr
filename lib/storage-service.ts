export function clearStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.clear();
    }
}

export function removeStorage(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
    }
}

export function addStorage(key: string, value: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, value);
    }
}

export function getStorage(key: string): string {
    if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem(key) ?? '';
    }
    return ''
}
