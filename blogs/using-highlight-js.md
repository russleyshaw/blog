---
title: "Using Highlight JS with React"
created: "2020-05-10T01:10:32.585Z"
---

A simple lazy async loader.

```ts
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
```

Setting up lazy loaders for individual modules.

```ts
const loadJavascript = lazyLoader(async () => {
    const mod = await import("highlight.js/lib/languages/javascript");
    hljs.registerLanguage("javascript", mod.default);
    return mod;
});

const loadTypescript = lazyLoader(async () => {
    const mod = await import("highlight.js/lib/languages/typescript");
    hljs.registerLanguage("typescript", mod.default);
    return mod;
});
```

Loading the correct language when called.

```ts
export default async function highlight(language: string, text: string): Promise<string> {
    switch (language) {
        case "js":
        case "javascript":
            await loadJavascript();
            break;
        case "ts":
        case "typescript":
            await loadTypescript();
            break;
    }

    return hljs.highlight(language, text).value;
}
```

React hooks async loader

```ts
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
```

Adding highlighting to a component.

```ts
export default function MarkdownCode(props: any): JSX.Element {
    const highlightedCode = useLoader(() => highlight(props.language, props.value), [
        props.language,
        props.value,
    ]);

    return (
        <pre>
            <code dangerouslySetInnerHTML={{ __html: highlightedCode.value ?? props.value }}></code>
        </pre>
    );
}
```
