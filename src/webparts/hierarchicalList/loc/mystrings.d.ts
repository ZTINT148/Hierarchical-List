declare interface IHierarchicalListWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'HierarchicalListWebPartStrings' {
  const strings: IHierarchicalListWebPartStrings;
  export = strings;
}
