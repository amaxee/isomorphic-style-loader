/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { isBrowser } from 'browser-or-node';
import React from 'react';
import StyleContext from './StyleContext';

export default function useStyles(...styles: Array<any>): void {
  const { insertCss } = React.useContext(StyleContext);
  const main = React.useCallback(() => {
    if (insertCss) {
      // @ts-ignore invariant guard substituted
      const removeCss = insertCss(...styles);
      return () => {
        setTimeout(() => {
          removeCss();
        }, 0);
      };
    }
  }, [insertCss]);
  if (isBrowser) {
    React.useEffect(main, []);
  } else {
    main();
  }
}
