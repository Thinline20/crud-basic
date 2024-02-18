import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Show } from "solid-js";
import { createTiptapEditor, useEditorIsFocused } from "solid-tiptap";

import EditorMenu from "./editor-menu";

export default function TiptapComponent() {
  let editorRef: HTMLDivElement | undefined;

  const editor = createTiptapEditor(() => ({
    autofocus: true,
    content: "",
    editorProps: {
      attributes: {
        class:
          "px-3 py-2 outline-none mx-auto h-[30rem] overflow-y-auto prose max-w-none text-foreground",
        id: "tiptap",
      },
    },
    element: editorRef!,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
    ],
    injectCSS: false,
  }));

  const isEditorFocused = useEditorIsFocused(() => editor());

  return (
    <div
      class="group border transition-colors duration-100 hover:border-muted-foreground data-[focus=true]:border-primary"
      data-focus={isEditorFocused() ?? false}
    >
      <Show fallback={<div class="h-[30rem]" />} when={editor()}>
        {(instance) => <EditorMenu editor={instance()} />}
      </Show>
      <div class="" id="editor" ref={editorRef!} />
    </div>
  );
}
