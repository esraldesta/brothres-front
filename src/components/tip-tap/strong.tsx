import { Extension, CommandProps } from "@tiptap/react";

// Define the custom extension
export const EncloseElement = Extension.create({
  name: "encloseElement",

  // addCommands() {
  //   return {
  //     setEncloseElement:
  //       (attrs: { backgroundColor: string; borderLeft: string }) =>
  //       ({ commands }) => {
  //         return commands.insertContent(
  //           `<div style="background-color: ${attrs.backgroundColor}; border-left: ${attrs.borderLeft}; padding: 10px;">$1</div>`
  //         );
  //       },
  //   };
  // },
});
