import { Show } from "solid-js";

import { Separator } from "~/components/ui/separator";

import { useEditorContext } from "./editor-context";
import EditorMenu from "./editor-menu";

export default function EditorComponent() {
  let editorContainerRef: HTMLDivElement | undefined;

  const [editor, { getCharacterCount, getWordCount }] = useEditorContext();

  return (
    <div
      class="group relative min-h-[546px] rounded-md border border-input ring-offset-background duration-100 data-[focus=true]:outline-none data-[focus=true]:ring-2 data-[focus=true]:ring-ring data-[focus=true]:ring-offset-2"
      data-focus="false"
      id="editor-container"
      onFocusIn={() => (editorContainerRef!.dataset.focus = "true")}
      onFocusOut={() => (editorContainerRef!.dataset.focus = "false")}
      ref={editorContainerRef!}
    >
      <Show when={editor()}>
        <EditorMenu />
        <Separator />
      </Show>
      <div id="editor" />
      <Show when={editor()}>
        <div class="absolute bottom-2 right-3 flex gap-1 text-muted-foreground">
          <span>{getCharacterCount()}</span>/<span>{getWordCount()}</span>
        </div>
      </Show>
    </div>
  );
}
