"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40",
        active && "bg-primary/10 text-primary hover:bg-primary/10"
      )}
    >
      {children}
    </button>
  );
}

export function TiptapEditor({
  initialJson,
  initialHtml,
}: {
  initialJson?: unknown;
  initialHtml?: string;
}) {
  const [contentJson, setContentJson] = useState<string>(initialJson ? JSON.stringify(initialJson) : "");
  const [contentHtml, setContentHtml] = useState<string>(initialHtml ?? "");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: initialHtml || "<p></p>",
    editorProps: {
      attributes: {
        class: "prose prose-neutral max-w-none min-h-[300px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContentJson(JSON.stringify(editor.getJSON()));
      setContentHtml(editor.getHTML());
    },
  });

  // Populate hidden inputs on first mount even if the editor content never changes.
  useEffect(() => {
    if (editor && !contentJson) {
      setContentJson(JSON.stringify(editor.getJSON()));
      setContentHtml(editor.getHTML());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-border bg-white">
      <input type="hidden" name="content" value={contentJson} readOnly />
      <input type="hidden" name="contentHtml" value={contentHtml} readOnly />

      <div className="flex flex-wrap items-center gap-0.5 border-b border-border p-2">
        <ToolbarButton label="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
          <Heading3 className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
          <Quote className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
            else editor.chain().focus().unsetLink().run();
          }}
        >
          <LinkIcon className="size-4" />
        </ToolbarButton>
        <div className="mx-1 h-5 w-px bg-border" />
        <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
