/**
 * Pillar labels as [lead, sub] pairs. CMS lists may hold placeholder values
 * ("list", "1"); anything that isn't a real label falls back to the
 * translated defaults, item by item.
 */
export function normalizePillars(raw, fallback) {
    const base = Array.isArray(fallback) ? fallback : [];
    const source = Array.isArray(raw) ? raw : [];
    const usable = value => typeof value === 'string' && value.trim().length > 2 && !/^(list|\d+)$/i.test(value.trim());
    return base.map((item, i) => {
        const entry = source[i];
        if (Array.isArray(entry) && usable(entry[0])) return [entry[0], entry[1] || ''];
        if (usable(entry)) {
            const words = entry.trim().split(/\s+/);
            return words.length === 1 ? [words[0], ''] : [words[0], words.slice(1).join(' ')];
        }
        return item;
    });
}
