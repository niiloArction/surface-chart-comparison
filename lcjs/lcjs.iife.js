var lcjs=function(t){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */var i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,i){t.__proto__=i}||function(t,i){for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])})(t,n)};function n(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function r(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}var r=function(){return(r=Object.assign||function(t){for(var i,n=1,r=arguments.length;n<r;n++)for(var e in i=arguments[n])Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e]);return t}).apply(this,arguments)};function e(t,i,n,r){return new(n||(n=Promise))((function(e,s){function o(t){try{u(r.next(t))}catch(t){s(t)}}function h(t){try{u(r.throw(t))}catch(t){s(t)}}function u(t){var i;t.done?e(t.value):(i=t.value,i instanceof n?i:new n((function(t){t(i)}))).then(o,h)}u((r=r.apply(t,i||[])).next())}))}function s(t,i){var n,r,e,s,o={label:0,sent:function(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return s={next:h(0),throw:h(1),return:h(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function h(s){return function(h){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(e=2&s[0]?r.return:s[0]?r.throw||((e=r.return)&&e.call(r),0):r.next)&&!(e=e.call(r,s[1])).done)return e;switch(r=0,e&&(s=[2&s[0],e.value]),s[0]){case 0:case 1:e=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(e=o.trys,(e=e.length>0&&e[e.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!e||s[1]>e[0]&&s[1]<e[3])){o.label=s[1];break}if(6===s[0]&&o.label<e[1]){o.label=e[1],e=s;break}if(e&&o.label<e[2]){o.label=e[2],o.ops.push(s);break}e[2]&&o.ops.pop(),o.trys.pop();continue}s=i.call(t,o)}catch(t){s=[6,t],r=0}finally{n=e=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,h])}}}function o(t){var i="function"==typeof Symbol&&Symbol.iterator,n=i&&t[i],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(i?"Object is not iterable.":"Symbol.iterator is not defined.")}function h(t,i){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,e,s=n.call(t),o=[];try{for(;(void 0===i||i-- >0)&&!(r=s.next()).done;)o.push(r.value)}catch(t){e={error:t}}finally{try{r&&!r.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}return o}function u(t,i){for(var n=0,r=i.length,e=t.length;n<r;n++,e++)t[e]=i[n];return t}
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.