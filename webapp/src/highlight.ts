import * as hljs from "highlight.js/lib/core";
import "highlight.js/styles/dracula.css";

import { lazyLoader } from "./util";

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
