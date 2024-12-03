import { mergeAttributes } from "@tiptap/react";
import { Heading as TipTapHeading } from "@tiptap/extension-heading";

export const Heading = TipTapHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `h${node.attrs.level}-style`,
      }),
      0,
    ];
  },
});
