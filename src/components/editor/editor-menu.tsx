import type { JSX } from "solid-js";

import { Editor } from "@tiptap/core";
import { RiEditorH1, RiEditorH2, RiEditorH3, RiEditorH4 } from 'solid-icons/ri'
import {
  TbArrowBackUp,
  TbArrowForwardUp,
  TbBlockquote,
  TbBold,
  TbCode,
  TbItalic,
  TbList,
  TbListNumbers,
  TbStrikethrough,
  TbUnderline,
} from "solid-icons/tb";
import { createEditorTransaction } from "solid-tiptap";

import { Button } from "~/components/ui/button";

type EditorMenuProps = {
  editor: Editor;
};

type EditorMenuButtonProps = {
  active: boolean;
  children: JSX.Element;
  disabled: boolean;
  onClick: () => void;
};

function EditorMenuButton(props: EditorMenuButtonProps) {
  return (
    <Button
      class="transition-colors duration-100 data-[active=true]:bg-primary data-[active=true]:text-background [&_svg]:h-[1.2rem] [&_svg]:w-[1.2rem]"
      data-active={props.active}
      disabled={props.disabled ?? false}
      onClick={() => props.onClick()}
      size="icon"
      variant="ghost"
    >
      {props.children}
    </Button>
  );
}

export default function EditorMenu(props: EditorMenuProps) {
  const isBold = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("bold"),
  );

  const isBoldDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleBold().run(),
  );

  const isItalic = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("italic"),
  );

  const isItalicDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleItalic().run(),
  );

  const isCode = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("code"),
  );

  const isCodeDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleCode().run(),
  );

  const isUnderline = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("underline"),
  );

  const isUnderlineDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleUnderline().run(),
  );

  const isStrike = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("strike"),
  );

  const isStrikeDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleStrike().run(),
  );

  const isBulletList = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("bulletList"),
  );

  const isBulletListDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleBulletList().run(),
  );

  const isOrderedList = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("orderedList"),
  );

  const isOrderedListDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleOrderedList().run(),
  );

  const isBlockquote = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("blockquote"),
  );

  const isBlockquoteDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().toggleBlockquote().run(),
  );

  const isH1 = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("heading", { level: 1 }),
  );

  const isH1Disabled = createEditorTransaction(
    () => props.editor,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 1 }).run(),
  );

  const isH2 = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("heading", { level: 2 }),
  );

  const isH2Disabled = createEditorTransaction(
    () => props.editor,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 2 }).run(),
  );

  const isH3 = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("heading", { level: 3 }),
  );

  const isH3Disabled = createEditorTransaction(
    () => props.editor,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 3 }).run(),
  );

  const isH4 = createEditorTransaction(
    () => props.editor,
    (editor) => editor?.isActive("heading", { level: 4 }),
  );

  const isH4Disabled = createEditorTransaction(
    () => props.editor,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 4 }).run(),
  );

  const isUndoDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().undo().run(),
  );

  const isRedoDisabled = createEditorTransaction(
    () => props.editor,
    (editor) => !editor?.can().chain().focus().redo().run(),
  );

  return (
    <section class="flex flex-wrap items-center px-4 py-3">
      <EditorMenuButton
        active={isBold()}
        disabled={isBoldDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleBold().run()}
      >
        <TbBold />
      </EditorMenuButton>
      <EditorMenuButton
        active={isItalic()}
        disabled={isItalicDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleItalic().run()}
      >
        <TbItalic />
      </EditorMenuButton>
      <EditorMenuButton
        active={isCode()}
        disabled={isCodeDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleCode().run()}
      >
        <TbCode />
      </EditorMenuButton>
      <EditorMenuButton
        active={isStrike()}
        disabled={isStrikeDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleStrike().run()}
      >
        <TbStrikethrough />
      </EditorMenuButton>
      <EditorMenuButton
        active={isUnderline()}
        disabled={isUnderlineDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleUnderline().run()}
      >
        <TbUnderline />
      </EditorMenuButton>
      <EditorMenuButton
        active={isBulletList()}
        disabled={isBulletListDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleBulletList().run()}
      >
        <TbList />
      </EditorMenuButton>
      <EditorMenuButton
        active={isOrderedList()}
        disabled={isOrderedListDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleOrderedList().run()}
      >
        <TbListNumbers />
      </EditorMenuButton>
      <EditorMenuButton
        active={isBlockquote()}
        disabled={isBlockquoteDisabled() ?? false}
        onClick={() => props.editor.chain().focus().toggleBlockquote().run()}
      >
        <TbBlockquote />
      </EditorMenuButton>
      <EditorMenuButton
        active={isH1()}
        disabled={isH1Disabled() ?? false}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <RiEditorH1 />
      </EditorMenuButton>
      <EditorMenuButton
        active={isH2()}
        disabled={isH2Disabled() ?? false}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <RiEditorH2 />
      </EditorMenuButton>
      <EditorMenuButton
        active={isH3()}
        disabled={isH3Disabled() ?? false}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <RiEditorH3 />
      </EditorMenuButton>
      <EditorMenuButton
        active={isH4()}
        disabled={isH4Disabled() ?? false}
        onClick={() =>
          props.editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <RiEditorH4 />
      </EditorMenuButton>
      <EditorMenuButton
        active={false}
        disabled={isUndoDisabled() ?? false}
        onClick={() => props.editor.chain().focus().undo().run()}
      >
        <TbArrowBackUp />
      </EditorMenuButton>
      <EditorMenuButton
        active={false}
        disabled={isRedoDisabled() ?? false}
        onClick={() => props.editor.chain().focus().redo().run()}
      >
        <TbArrowForwardUp />
      </EditorMenuButton>
    </section>
  );
}
