const DOCUMENT = (length: number) => ({
  NAME: `untitled-document${length > 0 ? `(${length})` : ""}.md`,
});

export default DOCUMENT;
