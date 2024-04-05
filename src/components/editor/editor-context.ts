import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { createContext, useContext } from "solid-js";
import {
  createEditorTransaction,
  createTiptapEditor,
  useEditorIsFocused,
} from "solid-tiptap";

export function createEditorContext() {
  const editor = createTiptapEditor(() => ({
    autofocus: true,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose mx-auto h-[30rem] max-w-none overflow-y-auto whitespace-pre-wrap px-4 py-2 text-foreground outline-none scrollbar-thumb-muted-foreground hover:scrollbar-thumb-foreground active:scrollbar-thumb-foreground scrollbar-thumb-rounded-md scrollbar scrollbar-track-none",
        id: "tiptap",
      },
    },
    element: document.getElementById("editor")!,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      CharacterCount,
      TextStyle,
      Color,
    ],
    injectCSS: false,
  }));

  const getCharacterCount = createEditorTransaction(
    () => editor()!,
    (editor) => editor.storage.characterCount.characters(),
  );

  const getWordCount = createEditorTransaction(
    () => editor()!,
    (editor) => editor.storage.characterCount.words(),
  );

  const isEditorFocused = useEditorIsFocused(() => editor());

  const isBold = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("bold"),
  );

  const isBoldDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleBold().run(),
  );

  const isItalic = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("italic"),
  );

  const isItalicDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleItalic().run(),
  );

  const isCode = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("code"),
  );

  const isCodeDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleCode().run(),
  );

  const isUnderline = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("underline"),
  );

  const isUnderlineDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleUnderline().run(),
  );

  const isStrike = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("strike"),
  );

  const isStrikeDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleStrike().run(),
  );

  const isBulletList = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("bulletList"),
  );

  const isBulletListDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleBulletList().run(),
  );

  const isOrderedList = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("orderedList"),
  );

  const isOrderedListDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleOrderedList().run(),
  );

  const isBlockquote = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("blockquote"),
  );

  const isBlockquoteDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleBlockquote().run(),
  );

  const isH1 = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("heading", { level: 1 }),
  );

  const isH1Disabled = createEditorTransaction(
    () => editor()!,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 1 }).run(),
  );

  const isH2 = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("heading", { level: 2 }),
  );

  const isH2Disabled = createEditorTransaction(
    () => editor()!,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 2 }).run(),
  );

  const isH3 = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("heading", { level: 3 }),
  );

  const isH3Disabled = createEditorTransaction(
    () => editor()!,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 3 }).run(),
  );

  const isH4 = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("heading", { level: 4 }),
  );

  const isH4Disabled = createEditorTransaction(
    () => editor()!,
    (editor) =>
      !editor?.can().chain().focus().toggleHeading({ level: 4 }).run(),
  );

  const isUndoDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().undo().run(),
  );

  const isRedoDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().redo().run(),
  );

  const isEmpty = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isEmpty,
  );

  const isCodeBlock = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.isActive("codeBlock"),
  );

  const isCodeBlockDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().toggleCodeBlock().run(),
  );

  const isHorizontalRuleDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().setHorizontalRule().run(),
  );

  const isHardBreakDisabled = createEditorTransaction(
    () => editor()!,
    (editor) => !editor?.can().chain().focus().setHardBreak().run(),
  );

  const currentColor = createEditorTransaction(
    () => editor()!,
    (editor) => editor?.getAttributes("textStyle").color,
  );

  const isActiveColor = (color: string) => {
    if (color === "default") {
      return createEditorTransaction(
        () => editor()!,
        (editor) => editor?.isActive("textStyle", { color: undefined }),
      );
    }

    return createEditorTransaction(
      () => editor()!,
      (editor) => editor?.isActive("textStyle", { color: color }),
    );
  };

  return [
    editor,
    {
      currentColor,
      getCharacterCount,
      getWordCount,
      isActiveColor,
      isBlockquote,
      isBlockquoteDisabled,
      isBold,
      isBoldDisabled,
      isBulletList,
      isBulletListDisabled,
      isCode,
      isCodeBlock,
      isCodeBlockDisabled,
      isCodeDisabled,
      isEditorFocused,
      isEmpty,
      isH1,
      isH1Disabled,
      isH2,
      isH2Disabled,
      isH3,
      isH3Disabled,
      isH4,
      isH4Disabled,
      isHardBreakDisabled,
      isHorizontalRuleDisabled,
      isItalic,
      isItalicDisabled,
      isOrderedList,
      isOrderedListDisabled,
      isRedoDisabled,
      isStrike,
      isStrikeDisabled,
      isUnderline,
      isUnderlineDisabled,
      isUndoDisabled,
    },
  ] as const;
}

type EditorContextType = ReturnType<typeof createEditorContext>;
export const EditorContext = createContext<EditorContextType>();
export const useEditorContext = () => useContext(EditorContext)!;
