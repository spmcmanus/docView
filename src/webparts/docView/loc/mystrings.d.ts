declare interface IDocViewStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'docViewStrings' {
  const strings: IDocViewStrings;
  export = strings;
}
