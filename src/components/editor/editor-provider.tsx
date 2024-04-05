import type { JSX } from "solid-js";

import { EditorContext, createEditorContext } from "./editor-context";

type EditorProviderProps = {
  children: JSX.Element;
};

const EditorProvider = (props: EditorProviderProps) => {
  const editor = createEditorContext();

  return (
    <EditorContext.Provider value={editor}>
      {props.children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
