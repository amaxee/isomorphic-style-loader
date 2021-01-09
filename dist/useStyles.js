"use strict";
/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_or_node_1 = require("browser-or-node");
const react_1 = __importDefault(require("react"));
const StyleContext_1 = __importDefault(require("./StyleContext"));
function useStyles(...styles) {
    const { insertCss } = react_1.default.useContext(StyleContext_1.default);
    const main = react_1.default.useCallback(() => {
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
    if (browser_or_node_1.isBrowser) {
        react_1.default.useEffect(main, []);
    }
    else {
        main();
    }
}
exports.default = useStyles;
//# sourceMappingURL=useStyles.js.map