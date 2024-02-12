import { IOptions } from "@firastar/firastar-js/dist/src/types";
import { workspace } from "vscode";

const defaultOptions: IOptions = {
  preserveFrontmatter: true,
  preserveHtml: true,
  preserveComment: true,
  preserveBrace: true,
  preserveBracket: true,
  preserveUri: true,
  preserveNbsp: true,
  preserveEntity: true,
  fixEOL: true,
  fixStandardChars: true,
  fixDashes: true,
  fixEllipsis: true,
  fixEnglishQuotes: true,
  removeRLM: true,
  fixZWNJ: true,
  fixArabicNumbers: true,
  fixEnglishNumbers: true,
  fixNumeralSymbols: true,
  fixPunctuations: true,
  fixNonPersianChars: true,
  fixQuestionMarks: true,
  fixDates: true,
  fixHamzeh: true,
  fixArabicHamzeh: true,
  fixSuffixZwnj: true,
  fixPrefixZwnj: true,
  fixBracesSpacing: true,
  fixBracesSpacingInside: true,
  removeExtraMarks: true,
  fixPunctuationSpacing: true,
  removeKashidas: true,
  fixMiscSpacing: true,
  removeDiacritics: true,
  fixDiacritics: true,
  removeSpaces: true,
  fixLineBreaks: true,
  trim: true,
};

export const resolveOptions = (): IOptions => {
  const config = workspace.getConfiguration("firastar");
  const res = ({} = Object.entries(defaultOptions).reduce(
    (res, [key, value]) => ({ ...res, [key]: config.get(key) || value }),
    {} as IOptions,
  ));
  return res;
};
