import * as vscode from "vscode";

/** Code that is used to associate diagnostic entries with code actions. */
export const FIRAST_MENTION = "firast_mention";

/**
 * Analyzes the text document for problems.
 * This demo diagnostic problem provider finds all mentions of 'emoji'.
 * @param doc text document to analyze
 * @param diagnosticsCollection diagnostic collection
 */
export function refreshDiagnostics(
  doc: vscode.TextDocument,
  diagnosticsCollection: vscode.DiagnosticCollection,
): void {
  const diagnostics: vscode.Diagnostic[] = [];

  for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
    const lineOfText = doc.lineAt(lineIndex);
    // Regular expression to match Persian characters
    var persianRegex = /[\u0600-\u06FF\s]/;
    // Check if the text contains Persian characters
    if (persianRegex.test(lineOfText.text)) {
      diagnostics.push(createDiagnostic(doc, lineOfText, lineIndex));
    }
  }

  diagnosticsCollection.set(doc.uri, diagnostics);
}

function createDiagnostic(
  doc: vscode.TextDocument,
  lineOfText: vscode.TextLine,
  lineIndex: number,
): vscode.Diagnostic {
  // find where in the line of that the 'emoji' is mentioned
  const index = lineOfText.text.indexOf(EMOJI);

  // create range that represents, where in the document the word is
  const range = new vscode.Range(
    lineIndex,
    index,
    lineIndex,
    index + EMOJI.length,
  );

  const diagnostic = new vscode.Diagnostic(
    range,
    "When you say 'emoji', do you want to find out more?",
    vscode.DiagnosticSeverity.Warning,
  );
  diagnostic.code = FIRAST_MENTION;
  return diagnostic;
}

export function subscribeToDocumentChanges(
  context: vscode.ExtensionContext,
  diagnosticsCollection: vscode.DiagnosticCollection,
): void {
  if (vscode.window.activeTextEditor) {
    refreshDiagnostics(
      vscode.window.activeTextEditor.document,
      diagnosticsCollection,
    );
  }
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        refreshDiagnostics(editor.document, diagnosticsCollection);
      }
    }),
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) =>
      refreshDiagnostics(e.document, diagnosticsCollection),
    ),
  );

  context.subscriptions.push(
    vscode.workspace.onDidCloseTextDocument((doc) =>
      diagnosticsCollection.delete(doc.uri),
    ),
  );

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      "",
      new FirastActionProvider(),
    ),
  );
}

class FirastActionProvider implements vscode.CodeActionProvider {
  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {
    throw new Error("Method not implemented.");
  }
  resolveCodeAction?(
    codeAction: vscode.CodeAction,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CodeAction> {
    throw new Error("Method not implemented.");
  }
}
