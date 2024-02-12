import { firast } from "@firastar/firastar-js";
import * as vscode from "vscode";
import { resolveOptions } from "./options";


export function activate(context: vscode.ExtensionContext) {

  let disposable = vscode.commands.registerCommand("firastar.firast", () => {
    const options = resolveOptions();
    const editor = vscode.window.activeTextEditor;
    editor?.selections.forEach((selection) => {
      const text = editor.document.getText(selection);
      const newText = firast(text,options);
      editor.edit((builder) => {
        builder.replace(selection, newText);
      });
    });
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
