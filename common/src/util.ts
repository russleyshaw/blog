import moment from "moment";

export type Awaitable<T> = T | Promise<T>;

export type Dictionary<T> = { [key: string]: T };

export function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

export function castToFirst<T>(items: T | T[]): T {
    if (Array.isArray(items)) {
        const item = getFirst(items);
        if (item == null) throw new Error("Unable to cast to single value.");
        return item;
    }

    return items;
}

export function castToArray<T>(items: T | T[]): T[] {
    if (Array.isArray(items)) return items;
    return [items];
}

export function filterNil<T>(items: Array<T | null | undefined>): Array<T> {
    return items.filter(item => item != null) as T[];
}

export async function delayMs(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export function lazyVal<T>(getter: () => Promise<T>): () => Promise<T> {
    let value: Promise<T> | undefined;

    return async (): Promise<T> => {
        if (value != null) return value;
        value = getter();
        return value;
    };
}

export function asNotNil<T>(value: T | null | undefined, msg?: string): T {
    if (value == null) throw new Error(msg ?? "Expected value to be defined");
    return value;
}

export function asString(value: unknown, msg?: string): string {
    if (typeof value !== "string") throw new Error(msg ?? "Expected value to be a string.");
    return value;
}

export function asOptional<T, U>(
    value: U | null | undefined,
    asExists: (value: U) => T
): T | null | undefined {
    if (value == null) return value as null | undefined;
    return asExists(value);
}

export function asDateString(value: unknown, msg?: string): string {
    const errMsg = msg ?? "Expected value to be a date string.";

    if (typeof value !== "string") throw new Error(errMsg);
    if (!moment(value).isValid()) throw new Error(errMsg);

    return value;
}

export function clamp(min: number, value: number, max: number): number {
    return Math.max(Math.min(max, value), min);
}
