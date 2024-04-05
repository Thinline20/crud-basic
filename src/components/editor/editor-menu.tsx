import { AiOutlineCode } from "solid-icons/ai";
import { RiEditorH1, RiEditorH2, RiEditorH3, RiEditorH4 } from "solid-icons/ri";
import {
  TbArrowBackUp,
  TbArrowForwardUp,
  TbBlockquote,
  TbBold,
  TbCode,
  TbItalic,
  TbList,
  TbListNumbers,
  TbSeparatorHorizontal,
  TbStrikethrough,
  TbUnderline,
} from "solid-icons/tb";
import { VsClearAll } from "solid-icons/vs";
import { type JSX } from "solid-js";

import { Button } from "~/components/ui/button";

import { IconParkOutlineParagraphBreakTwo } from "../icons/icon-park-outline/paragraph-break-two";
import EditorColorPicker from "./color-picker";
import { useEditorContext } from "./editor-context";

type EditorMenuButtonProps = {
  active: boolean;
  children: JSX.Element;
  disabled: boolean;
  name: string;
  onClick: () => void;
};

function EditorMenuButton(props: EditorMenuButtonProps) {
  return (
    <Button
      class="relative transition-colors duration-100 before:pointer-events-none before:absolute before:left-1/2 before:top-full before:mt-1 before:-translate-x-1/2 before:scale-90 before:text-nowrap before:rounded-md before:border before:border-border before:bg-muted before:px-2 before:py-1 before:opacity-0 before:shadow-sm before:transition-all before:duration-200 before:content-[attr(data-tooltip-text)] data-[active=true]:bg-primary data-[active=true]:text-background data-[active=true]:before:text-foreground hover:before:scale-100 hover:before:opacity-100 data-[active=true]:hover:bg-primary/90 data-[active=true]:hover:text-background [&_svg]:size-[1.2rem]"
      data-active={props.active}
      data-tooltip-text={props.name}
      disabled={props.disabled ?? false}
      onClick={(event) => {
        event.preventDefault();
        props.onClick();
      }}
      size="icon"
      variant="ghost"
    >
      {props.children}
      <span class="sr-only">{props.name}</span>
    </Button>
  );
}

export default function EditorMenu() {
  let sectionRef: HTMLDivElement | undefined;

  const [
    editor,
    {
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
  ] = useEditorContext();

  return (
    <section
      class="flex min-h-10 items-start justify-between px-4 py-2"
      ref={sectionRef!}
    >
      <div class="flex flex-wrap">
        <EditorMenuButton
          active={isBold()}
          disabled={isBoldDisabled() ?? false}
          name="Bold"
          onClick={() => editor()?.chain().focus().toggleBold().run()}
        >
          <TbBold />
        </EditorMenuButton>
        <EditorMenuButton
          active={isItalic()}
          disabled={isItalicDisabled() ?? false}
          name="Italic"
          onClick={() => editor()?.chain().focus().toggleItalic().run()}
        >
          <TbItalic />
        </EditorMenuButton>

        <EditorMenuButton
          active={isStrike()}
          disabled={isStrikeDisabled() ?? false}
          name="Strikethrough"
          onClick={() => editor()?.chain().focus().toggleStrike().run()}
        >
          <TbStrikethrough />
        </EditorMenuButton>
        <EditorMenuButton
          active={isUnderline()}
          disabled={isUnderlineDisabled() ?? false}
          name="Underline"
          onClick={() => editor()?.chain().focus().toggleUnderline().run()}
        >
          <TbUnderline />
        </EditorMenuButton>
        <EditorMenuButton
          active={isCode()}
          disabled={isCodeDisabled() ?? false}
          name="Code"
          onClick={() => editor()?.chain().focus().toggleCode().run()}
        >
          <TbCode />
        </EditorMenuButton>
        <EditorMenuButton
          active={isCodeBlock()}
          disabled={isCodeBlockDisabled() ?? false}
          name="Code Block"
          onClick={() => editor()?.chain().focus().toggleCodeBlock().run()}
        >
          <AiOutlineCode />
        </EditorMenuButton>
        <EditorMenuButton
          active={isBulletList()}
          disabled={isBulletListDisabled() ?? false}
          name="Bullet List"
          onClick={() => editor()?.chain().focus().toggleBulletList().run()}
        >
          <TbList />
        </EditorMenuButton>
        <EditorMenuButton
          active={isOrderedList()}
          disabled={isOrderedListDisabled() ?? false}
          name="Ordered List"
          onClick={() => editor()?.chain().focus().toggleOrderedList().run()}
        >
          <TbListNumbers />
        </EditorMenuButton>
        <EditorMenuButton
          active={isBlockquote()}
          disabled={isBlockquoteDisabled() ?? false}
          name="Blockquote"
          onClick={() => editor()?.chain().focus().toggleBlockquote().run()}
        >
          <TbBlockquote />
        </EditorMenuButton>
        <EditorMenuButton
          active={isH1()}
          disabled={isH1Disabled() ?? false}
          name="Heading 1"
          onClick={() =>
            editor()?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <RiEditorH1 />
        </EditorMenuButton>
        <EditorMenuButton
          active={isH2()}
          disabled={isH2Disabled() ?? false}
          name="Heading 2"
          onClick={() =>
            editor()?.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <RiEditorH2 />
        </EditorMenuButton>
        <EditorMenuButton
          active={isH3()}
          disabled={isH3Disabled() ?? false}
          name="Heading 3"
          onClick={() =>
            editor()?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <RiEditorH3 />
        </EditorMenuButton>
        <EditorMenuButton
          active={isH4()}
          disabled={isH4Disabled() ?? false}
          name="Heading 4"
          onClick={() =>
            editor()?.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          <RiEditorH4 />
        </EditorMenuButton>
        <EditorMenuButton
          active={false}
          disabled={isHorizontalRuleDisabled() ?? false}
          name="Horizontal Rule"
          onClick={() => editor()?.chain().focus().setHorizontalRule().run()}
        >
          <TbSeparatorHorizontal />
        </EditorMenuButton>
        <EditorMenuButton
          active={false}
          disabled={isHardBreakDisabled() ?? false}
          name="Hard Break"
          onClick={() => editor()?.chain().focus().setHardBreak().run()}
        >
          <IconParkOutlineParagraphBreakTwo />
        </EditorMenuButton>
        <EditorColorPicker />
      </div>
      <div class="flex items-start">
        <EditorMenuButton
          active={false}
          disabled={isEmpty() ?? false}
          name="Clear All"
          onClick={() => editor()?.chain().focus().clearContent().run()}
        >
          <VsClearAll />
        </EditorMenuButton>
        <EditorMenuButton
          active={false}
          disabled={isUndoDisabled() ?? false}
          name="Undo"
          onClick={() => editor()?.chain().focus().undo().run()}
        >
          <TbArrowBackUp />
        </EditorMenuButton>
        <EditorMenuButton
          active={false}
          disabled={isRedoDisabled() ?? false}
          name="Redo"
          onClick={() => editor()?.chain().focus().redo().run()}
        >
          <TbArrowForwardUp />
        </EditorMenuButton>
      </div>
    </section>
  );
}
