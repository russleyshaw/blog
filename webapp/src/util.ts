import { useState, useEffect } from "react";
import { Dictionary } from "common/dist/util";

export enum LoaderStatus {
    queued,
    loading,
    loaded,
    error,
}

export interface LoaderResult<T> {
    value: T | undefined;
    status: LoaderStatus;
}
export function useLoader<T>(getter: () => Promise<T>, deps: unknown[]): LoaderResult<T> {
    const [value, setValue] = useState<T | undefined>(undefined);
    const [status, setStatus] = useState(LoaderStatus.queued);

    useEffect(() => {
        Promise.resolve().then(async () => {
            setStatus(LoaderStatus.loading);
            try {
                const newValue = await getter();
                setValue(newValue);
                setStatus(LoaderStatus.loaded);
            } catch (e) {
                setStatus(LoaderStatus.error);
            }
        });
    }, deps);

    return { status, value };
}

export function joinClassNames(classnames: Dictionary<boolean>): string {
    const names: string[] = [];
    for (const [name, enabled] of Object.entries(classnames)) {
        if (!enabled) continue;
        names.push(name);
    }
    return names.join(" ");
}

/**
 * Lazily load and cache a static value from an async function
 */
export function lazyLoader<T>(func: () => Promise<T>): () => Promise<T> {
    let value: T;
    return async (): Promise<T> => {
        if (value === undefined) {
            value = await func();
        }
        return value;
    };
}
