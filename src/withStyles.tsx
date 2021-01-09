/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import React from 'react';
import StyleContext, { StyleContextType } from './StyleContext';

export default function withStyles(...styles: Array<any>) {
  return function wrapWithStyles(
    WrappedComponent: React.ComponentType,
  ): React.ComponentType {
    class WithStyles extends React.PureComponent {
      static displayName: string;
      static contextType: React.Context<StyleContextType>;
      static WrappedComponent: React.ComponentType;
      removeCss: void | (() => void);
      constructor(props: Record<string, unknown>, context: StyleContextType) {
        super(props, context);
        invariant(
          context.insertCss !== null,
          "Expected 'insertCss' method in 'StyleContext.Provider'.",
        );
        // @ts-ignore invariant guard substituted
        this.removeCss = context.insertCss(...styles);
      }
      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(() => {
            // @ts-ignore invariant guard substituted
            this.removeCss();
          }, 0);
        }
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    WithStyles.displayName = `WithStyles(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;
    WithStyles.contextType = StyleContext;
    WithStyles.WrappedComponent = WrappedComponent;
    return hoistNonReactStatics(WithStyles, WrappedComponent);
  };
}
