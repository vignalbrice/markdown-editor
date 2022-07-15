import colors from "./colors";

export type Theme = {
  name: string;
  colors: {
    navbar: string;
    block: string;
    blockText: string;
    editor: string;
    separator: string;
    markdown: string;
    paragraph: string;
    title: string;
    border: string;
  };
};

export const light = {
  name: "light",
  colors: {
    navbar: colors.$800,
    block: colors.$200,
    blockText: colors.$700,
    editor: colors.$100,
    separator: colors.$200,
    markdown: colors.$700,
    paragraph: colors.$500,
    title: colors.$700,
    border: colors.$300,
  },
};

export const dark = {
  name: "dark",
  colors: {
    navbar: colors.$800,
    block: colors.$800,
    blockText: colors.$100,
    editor: colors.$1000,
    separator: colors.$900,
    markdown: colors.$400,
    paragraph: colors.$400,
    title: colors.$100,
    border: colors.$600,
  },
};
