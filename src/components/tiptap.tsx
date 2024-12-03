"use client";

import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarteKit from "@tiptap/starter-kit";
import { Toolbar } from "./editor";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { Heading } from "@/app/profile/[id]/_components/heading-tiptap-extension";

interface Props {
  content: string;
  height?: number;
  onChange: (value: string) => void;
}

export default function TipTap({ content, onChange, height = 700 }: Props) {
  const editor: Editor | null = useEditor({
    extensions: [
      StarteKit.configure({
        heading: false,
      }),
      Underline,
      Paragraph,
      Heading,
      ListItem,
      OrderedList,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: `min-h-[300px] p-4 w-[100%]`,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col w-full">
      <Toolbar editor={editor} />
      <div className={`border border-gray-200 mb-4 prose max-w-none`}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
