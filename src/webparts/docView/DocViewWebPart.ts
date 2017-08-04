import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';


import DocView from './components/DocView';
import { IDocViewProps } from './components/IDocViewProps';
import { IDocViewWebPartProps } from './IDocViewWebPartProps';

export default class DocViewWebPart extends BaseClientSideWebPart<IDocViewWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDocViewProps> = React.createElement(DocView,{docLibraryName: this.properties.docLibraryName});
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('docLibraryName', {
                  label: 'Document Library Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
