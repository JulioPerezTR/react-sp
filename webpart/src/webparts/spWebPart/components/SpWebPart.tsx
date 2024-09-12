import * as React from 'react';
import { Suspense } from 'react';
import { ISpWebPartProps } from './ISpWebPartProps';

// const Header = React.lazy(() => import('ReactAppX/Header'));
// const Footer = React.lazy(() => import('ReactAppX/Footer'));

import Header from "ReactAppX/Header";
import Footer from "ReactAppX/Footer";

export default class SpWebPart extends React.Component<ISpWebPartProps, {}> {
  public render(): React.ReactElement<ISpWebPartProps> {
    return (
      <div>
        <h1>SPWebPart - Loading Remote App</h1>
        <Suspense fallback={<div>Loading Microfrontend...</div>}>
          {/* Load the remote component dynamically */}
          <Header />
          <p>Middle content app</p>
          <Footer />

        </Suspense>
      </div>
    );
  }
}
