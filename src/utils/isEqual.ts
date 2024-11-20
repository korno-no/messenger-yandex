function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isEqual(a: object, b: object): boolean {
    if (a === b) return true;

    if (!isObject(a) || !isObject(b)) return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!keysB.includes(key)) return false;
        const valueA = (a as Record<string, unknown>)[key];
        const valueB = (b as Record<string, unknown>)[key];

        if (isObject(valueA) && isObject(valueB)) {
        if (!isEqual(valueA, valueB)) return false;
        } else if (valueA !== valueB) {
        return false;
        }
    }

    return true;
}
export default isEqual;
