/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';

export interface StyleContextType {
  insertCss: null | ((...styles: Array<any>) => () => void);
}

const StyleContext = React.createContext<StyleContextType>({
  insertCss: null,
});

export default StyleContext;
