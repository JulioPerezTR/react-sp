import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import SpWebPart from './components/SpWebPart';
export interface ISpWebPartWebPartProps {
  description: string;
}

export default class SpWebPartWebPart extends BaseClientSideWebPart<ISpWebPartWebPartProps> {


  public render(): void {
    const element: React.ReactElement = React.createElement(
      SpWebPart
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
