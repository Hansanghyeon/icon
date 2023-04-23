// index의 파일이름을 _index로 해서 vscode, texteditor 에디터에서 최상단에 보이도록
export * from './components/_index';
export * as Icons from './components/_index';
export * as iconsData from './components/_index-data';
export type iconsDataType = {
  svg: string;
  jsx: string;
  import: string;
}