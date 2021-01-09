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
const hoist_non_react_statics_1 = __importDefault(require("hoist-non-react-statics"));
const invariant_1 = __importDefault(require("invariant"));
const react_1 = __importDefault(require("react"));
const StyleContext_1 = __importDefault(require("./StyleContext"));
function withStyles(...styles) {
    return function wrapWithStyles(WrappedComponent) {
        class WithStyles extends react_1.default.PureComponent {
            constructor(props, context) {
                super(props, context);
                invariant_1.default(context.insertCss !== null, "Expected 'insertCss' method in 'StyleContext.Provider'.");
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
                return react_1.default.createElement(WrappedComponent, Object.assign({}, this.props));
            }
        }
        WithStyles.displayName = `WithStyles(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
        WithStyles.contextType = StyleContext_1.default;
        WithStyles.WrappedComponent = WrappedComponent;
        return hoist_non_react_statics_1.default(WithStyles, WrappedComponent);
    };
}
exports.default = withStyles;
//# sourceMappingURL=withStyles.js.map