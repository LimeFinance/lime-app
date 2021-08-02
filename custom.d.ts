import "styled-components";

declare global {
  interface Window {
    Web3Modal: any;
  }
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      toned: string;
      text: string;
      secondaryBackground: string;
      secondaryText: string;
      disabled: string;
      light: string;
      background: string;
      success: string;
      error: string;
      info: string;
    };
    // breakpoints?: {
    //   [(name in "xs") | "sm" | "md" | "lg" | "xl"]: number;
    // };
  }
}
