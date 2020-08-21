declare module "*.md" {
    const content: string;
    export default content;
}

declare module "highlight.js/lib/core" {
    import hljs from "highlight.js";
    export { hljs as default };
}

declare module "highlight.js/lib/languages/*" {
    import { HLJSStatic, IModeBase } from "highlight.js";
    type language = (hljs?: HLJSStatic) => IModeBase;
    export { langauge as default };
}
