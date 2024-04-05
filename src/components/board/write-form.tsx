import { createSignal } from "solid-js";

import EditorComponent from "~/components/editor/editor-component";
import { useEditorContext } from "~/components/editor/editor-context";
import EditorProvider from "~/components/editor/editor-provider";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

function EditorFormInner(props: { userId: string }) {
  const [title, setTitle] = createSignal("");
  const [editor, { isEmpty }] = useEditorContext();

  const onSubmit = async (event: Event) => {
    event.preventDefault();

    if (!editor()) return;

    if (isEmpty()) {
      alert("Content is required");
      return;
    }

    const content = editor()!.getHTML();

    const formData = new FormData();
    formData.append("title", title());
    formData.append("content", content);
    formData.append("userId", props.userId);
    formData.append("category", "default");

    const res = await fetch("/api/articles/insert", {
      body: formData,
      method: "POST",
    });

    if (res.status !== 200) {
      console.error(res.statusText);
      alert(await res.text());
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div>
        <div class="space-y-8">
          <Input
            class="placeholder:capitalize"
            minlength="1"
            name="title"
            onChange={(value) => setTitle(value)}
            placeholder="title"
            required
            title="Enter a title"
            value={title()}
          />
          <EditorComponent />
        </div>
        <div class="mt-4 flex justify-end">
          <div class="grid grid-cols-2 gap-2">
            <Button type="button" variant="muted">
              Cancel
            </Button>
            <Button type="submit">Publish</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function WriteForm(props: { userId: string }) {
  return (
    <EditorProvider>
      <EditorFormInner userId={props.userId} />
    </EditorProvider>
  );
}
