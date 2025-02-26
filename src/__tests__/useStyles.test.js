/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import ReactDOM from 'react-dom';
import StyleContext from '../StyleContext';
import useStyles from '../useStyles';

describe('useStyles(...styles)', () => {
  it('Should call insertCss and removeCss functions provided by context', () => {
    class Provider extends Component {
      render() {
        const { insertCss, children } = this.props;
        return (
          <StyleContext.Provider value={{ insertCss }}>
            {Children.only(children)}
          </StyleContext.Provider>
        );
      }
    }

    Provider.propTypes = {
      insertCss: PropTypes.func.isRequired,
      children: PropTypes.node.isRequired,
    };

    const FooWithStyles = () => {
      useStyles('');
      return <div />;
    };

    const insertCss = jest.fn(() => {});
    const container = global.document.createElement('div');

    ReactDOM.render(
      <Provider insertCss={insertCss}>
        <FooWithStyles />
      </Provider>,
      container,
    );
    ReactDOM.unmountComponentAtNode(container);
    expect(insertCss).toBeCalledTimes(1);
  });
});
