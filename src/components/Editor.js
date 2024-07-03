import React, { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { autocompletion } from "@codemirror/autocomplete";
import { oneDark } from "@codemirror/theme-one-dark";

const languageExtensions = {
  javascript: javascript(),
  python: python(),
  cpp: cpp(),
};

const Editor = ({ language, code, setCode }) => {
  const editorRef = useRef();

  useEffect(() => {
    const startState = EditorState.create({
      doc: code,
      extensions: [
        keymap.of([...defaultKeymap]),
        languageExtensions[language],
        autocompletion(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            setCode(update.state.doc.toString());
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [language]);

  return <div ref={editorRef} className="editor" style={styles.editor}></div>;
};

const styles = {
  editor: {
    flex: "1 1 auto",
    overflow: "auto",
    backgroundColor: "#282a36",
  },
};

export default Editor;
