"use strict";
/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
module.exports = function loader() {
    // do nothing
};
module.exports.pitch = function pitch(request) {
    if (this.cacheable) {
        this.cacheable();
    }
    const insertCss = require.resolve('./insertCss.js');
    return `
    var refs = 0;
    var css = require(${loader_utils_1.stringifyRequest(this, `!!${request}`)});
    var insertCss = require(${loader_utils_1.stringifyRequest(this, `!${insertCss}`)});
    var content = typeof css === 'string' ? [[module.id, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (module.hot && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept(${loader_utils_1.stringifyRequest(this, `!!${request}`)}, function() {
        css = require(${loader_utils_1.stringifyRequest(this, `!!${request}`)});
        content = typeof css === 'string' ? [[module.id, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  `;
};
//# sourceMappingURL=index.js.map