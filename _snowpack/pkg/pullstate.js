import { r as react } from './common/index-04edb6a1.js';
import './common/_commonjsHelpers-8c19dec8.js';

var es6 = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

function n(n){for(var r=arguments.length,t=Array(r>1?r-1:0),e=1;e<r;e++)t[e-1]=arguments[e];throw Error("[Immer] minified error nr: "+n+(t.length?" "+t.map((function(n){return "'"+n+"'"})).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function r(n){return !!n&&!!n[Q]}function t(n){return !!n&&(function(n){if(!n||"object"!=typeof n)return !1;var r=Object.getPrototypeOf(n);if(null===r)return !0;var t=Object.hasOwnProperty.call(r,"constructor")&&r.constructor;return "function"==typeof t&&Function.toString.call(t)===Z}(n)||Array.isArray(n)||!!n[L]||!!n.constructor[L]||s(n)||v(n))}function i(n,r,t){void 0===t&&(t=!1),0===o(n)?(t?Object.keys:nn)(n).forEach((function(e){t&&"symbol"==typeof e||r(e,n[e],n);})):n.forEach((function(t,e){return r(e,t,n)}));}function o(n){var r=n[Q];return r?r.i>3?r.i-4:r.i:Array.isArray(n)?1:s(n)?2:v(n)?3:0}function u(n,r){return 2===o(n)?n.has(r):Object.prototype.hasOwnProperty.call(n,r)}function a(n,r){return 2===o(n)?n.get(r):n[r]}function f(n,r,t){var e=o(n);2===e?n.set(r,t):3===e?(n.delete(r),n.add(t)):n[r]=t;}function c(n,r){return n===r?0!==n||1/n==1/r:n!=n&&r!=r}function s(n){return X&&n instanceof Map}function v(n){return q&&n instanceof Set}function p(n){return n.o||n.t}function l(n){if(Array.isArray(n))return Array.prototype.slice.call(n);var r=rn(n);delete r[Q];for(var t=nn(r),e=0;e<t.length;e++){var i=t[e],o=r[i];!1===o.writable&&(o.writable=!0,o.configurable=!0),(o.get||o.set)&&(r[i]={configurable:!0,writable:!0,enumerable:o.enumerable,value:n[i]});}return Object.create(Object.getPrototypeOf(n),r)}function d(n,e){return void 0===e&&(e=!1),y(n)||r(n)||!t(n)?n:(o(n)>1&&(n.set=n.add=n.clear=n.delete=h),Object.freeze(n),e&&i(n,(function(n,r){return d(r,!0)}),!0),n)}function h(){n(2);}function y(n){return null==n||"object"!=typeof n||Object.isFrozen(n)}function b(r){var t=tn[r];return t||n(18,r),t}function m(n,r){tn[n]||(tn[n]=r);}function _(){return U}function j(n,r){r&&(b("Patches"),n.u=[],n.s=[],n.v=r);}function g(n){O(n),n.p.forEach(S),n.p=null;}function O(n){n===U&&(U=n.l);}function w(n){return U={p:[],l:U,h:n,m:!0,_:0}}function S(n){var r=n[Q];0===r.i||1===r.i?r.j():r.g=!0;}function P(r,e){e._=e.p.length;var i=e.p[0],o=void 0!==r&&r!==i;return e.h.O||b("ES5").S(e,r,o),o?(i[Q].P&&(g(e),n(4)),t(r)&&(r=M(e,r),e.l||x(e,r)),e.u&&b("Patches").M(i[Q],r,e.u,e.s)):r=M(e,i,[]),g(e),e.u&&e.v(e.u,e.s),r!==H?r:void 0}function M(n,r,t){if(y(r))return r;var e=r[Q];if(!e)return i(r,(function(i,o){return A(n,e,r,i,o,t)}),!0),r;if(e.A!==n)return r;if(!e.P)return x(n,e.t,!0),e.t;if(!e.I){e.I=!0,e.A._--;var o=4===e.i||5===e.i?e.o=l(e.k):e.o;i(3===e.i?new Set(o):o,(function(r,i){return A(n,e,o,r,i,t)})),x(n,o,!1),t&&n.u&&b("Patches").R(e,t,n.u,n.s);}return e.o}function A(e,i,o,a,c,s){if(r(c)){var v=M(e,c,s&&i&&3!==i.i&&!u(i.D,a)?s.concat(a):void 0);if(f(o,a,v),!r(v))return;e.m=!1;}if(t(c)&&!y(c)){if(!e.h.F&&e._<1)return;M(e,c),i&&i.A.l||x(e,c);}}function x(n,r,t){void 0===t&&(t=!1),n.h.F&&n.m&&d(r,t);}function z(n,r){var t=n[Q];return (t?p(t):n)[r]}function I(n,r){if(r in n)for(var t=Object.getPrototypeOf(n);t;){var e=Object.getOwnPropertyDescriptor(t,r);if(e)return e;t=Object.getPrototypeOf(t);}}function k(n){n.P||(n.P=!0,n.l&&k(n.l));}function E(n){n.o||(n.o=l(n.t));}function R(n,r,t){var e=s(r)?b("MapSet").N(r,t):v(r)?b("MapSet").T(r,t):n.O?function(n,r){var t=Array.isArray(n),e={i:t?1:0,A:r?r.A:_(),P:!1,I:!1,D:{},l:r,t:n,k:null,o:null,j:null,C:!1},i=e,o=en;t&&(i=[e],o=on);var u=Proxy.revocable(i,o),a=u.revoke,f=u.proxy;return e.k=f,e.j=a,f}(r,t):b("ES5").J(r,t);return (t?t.A:_()).p.push(e),e}function D(e){return r(e)||n(22,e),function n(r){if(!t(r))return r;var e,u=r[Q],c=o(r);if(u){if(!u.P&&(u.i<4||!b("ES5").K(u)))return u.t;u.I=!0,e=F(r,c),u.I=!1;}else e=F(r,c);return i(e,(function(r,t){u&&a(u.t,r)===t||f(e,r,n(t));})),3===c?new Set(e):e}(e)}function F(n,r){switch(r){case 2:return new Map(n);case 3:return Array.from(n)}return l(n)}function T(){function e(n){if(!t(n))return n;if(Array.isArray(n))return n.map(e);if(s(n))return new Map(Array.from(n.entries()).map((function(n){return [n[0],e(n[1])]})));if(v(n))return new Set(Array.from(n).map(e));var r=Object.create(Object.getPrototypeOf(n));for(var i in n)r[i]=e(n[i]);return r}function f(n){return r(n)?e(n):n}var c="add";m("Patches",{$:function(r,t){return t.forEach((function(t){for(var i=t.path,u=t.op,f=r,s=0;s<i.length-1;s++){var v=o(f),p=i[s];0!==v&&1!==v||"__proto__"!==p&&"constructor"!==p||n(24),"function"==typeof f&&"prototype"===p&&n(24),"object"!=typeof(f=a(f,p))&&n(15,i.join("/"));}var l=o(f),d=e(t.value),h=i[i.length-1];switch(u){case"replace":switch(l){case 2:return f.set(h,d);case 3:n(16);default:return f[h]=d}case c:switch(l){case 1:return f.splice(h,0,d);case 2:return f.set(h,d);case 3:return f.add(d);default:return f[h]=d}case"remove":switch(l){case 1:return f.splice(h,1);case 2:return f.delete(h);case 3:return f.delete(t.value);default:return delete f[h]}default:n(17,u);}})),r},R:function(n,r,t,e){switch(n.i){case 0:case 4:case 2:return function(n,r,t,e){var o=n.t,s=n.o;i(n.D,(function(n,i){var v=a(o,n),p=a(s,n),l=i?u(o,n)?"replace":c:"remove";if(v!==p||"replace"!==l){var d=r.concat(n);t.push("remove"===l?{op:l,path:d}:{op:l,path:d,value:p}),e.push(l===c?{op:"remove",path:d}:"remove"===l?{op:c,path:d,value:f(v)}:{op:"replace",path:d,value:f(v)});}}));}(n,r,t,e);case 5:case 1:return function(n,r,t,e){var i=n.t,o=n.D,u=n.o;if(u.length<i.length){var a=[u,i];i=a[0],u=a[1];var s=[e,t];t=s[0],e=s[1];}for(var v=0;v<i.length;v++)if(o[v]&&u[v]!==i[v]){var p=r.concat([v]);t.push({op:"replace",path:p,value:f(u[v])}),e.push({op:"replace",path:p,value:f(i[v])});}for(var l=i.length;l<u.length;l++){var d=r.concat([l]);t.push({op:c,path:d,value:f(u[l])});}i.length<u.length&&e.push({op:"replace",path:r.concat(["length"]),value:i.length});}(n,r,t,e);case 3:return function(n,r,t,e){var i=n.t,o=n.o,u=0;i.forEach((function(n){if(!o.has(n)){var i=r.concat([u]);t.push({op:"remove",path:i,value:n}),e.unshift({op:c,path:i,value:n});}u++;})),u=0,o.forEach((function(n){if(!i.has(n)){var o=r.concat([u]);t.push({op:c,path:o,value:n}),e.unshift({op:"remove",path:o,value:n});}u++;}));}(n,r,t,e)}},M:function(n,r,t,e){t.push({op:"replace",path:[],value:r}),e.push({op:"replace",path:[],value:n.t});}});}var G,U,W="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),X="undefined"!=typeof Map,q="undefined"!=typeof Set,B="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,H=W?Symbol.for("immer-nothing"):((G={})["immer-nothing"]=!0,G),L=W?Symbol.for("immer-draftable"):"__$immer_draftable",Q=W?Symbol.for("immer-state"):"__$immer_state",Z=""+Object.prototype.constructor,nn="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(n){return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n))}:Object.getOwnPropertyNames,rn=Object.getOwnPropertyDescriptors||function(n){var r={};return nn(n).forEach((function(t){r[t]=Object.getOwnPropertyDescriptor(n,t);})),r},tn={},en={get:function(n,r){if(r===Q)return n;var e=p(n);if(!u(e,r))return function(n,r,t){var e,i=I(r,t);return i?"value"in i?i.value:null===(e=i.get)||void 0===e?void 0:e.call(n.k):void 0}(n,e,r);var i=e[r];return n.I||!t(i)?i:i===z(n.t,r)?(E(n),n.o[r]=R(n.A.h,i,n)):i},has:function(n,r){return r in p(n)},ownKeys:function(n){return Reflect.ownKeys(p(n))},set:function(n,r,t){var e=I(p(n),r);if(null==e?void 0:e.set)return e.set.call(n.k,t),!0;if(!n.P){var i=z(p(n),r),o=null==i?void 0:i[Q];if(o&&o.t===t)return n.o[r]=t,n.D[r]=!1,!0;if(c(t,i)&&(void 0!==t||u(n.t,r)))return !0;E(n),k(n);}return n.o[r]===t&&"number"!=typeof t||(n.o[r]=t,n.D[r]=!0,!0)},deleteProperty:function(n,r){return void 0!==z(n.t,r)||r in n.t?(n.D[r]=!1,E(n),k(n)):delete n.D[r],n.o&&delete n.o[r],!0},getOwnPropertyDescriptor:function(n,r){var t=p(n),e=Reflect.getOwnPropertyDescriptor(t,r);return e?{writable:!0,configurable:1!==n.i||"length"!==r,enumerable:e.enumerable,value:t[r]}:e},defineProperty:function(){n(11);},getPrototypeOf:function(n){return Object.getPrototypeOf(n.t)},setPrototypeOf:function(){n(12);}},on={};i(en,(function(n,r){on[n]=function(){return arguments[0]=arguments[0][0],r.apply(this,arguments)};})),on.deleteProperty=function(r,t){return en.deleteProperty.call(this,r[0],t)},on.set=function(r,t,e){return en.set.call(this,r[0],t,e,r[0])};var un=function(){function e(r){var e=this;this.O=B,this.F=!0,this.produce=function(r,i,o){if("function"==typeof r&&"function"!=typeof i){var u=i;i=r;var a=e;return function(n){var r=this;void 0===n&&(n=u);for(var t=arguments.length,e=Array(t>1?t-1:0),o=1;o<t;o++)e[o-1]=arguments[o];return a.produce(n,(function(n){var t;return (t=i).call.apply(t,[r,n].concat(e))}))}}var f;if("function"!=typeof i&&n(6),void 0!==o&&"function"!=typeof o&&n(7),t(r)){var c=w(e),s=R(e,r,void 0),v=!0;try{f=i(s),v=!1;}finally{v?g(c):O(c);}return "undefined"!=typeof Promise&&f instanceof Promise?f.then((function(n){return j(c,o),P(n,c)}),(function(n){throw g(c),n})):(j(c,o),P(f,c))}if(!r||"object"!=typeof r){if((f=i(r))===H)return;return void 0===f&&(f=r),e.F&&d(f,!0),f}n(21,r);},this.produceWithPatches=function(n,r){return "function"==typeof n?function(r){for(var t=arguments.length,i=Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return e.produceWithPatches(r,(function(r){return n.apply(void 0,[r].concat(i))}))}:[e.produce(n,r,(function(n,r){t=n,i=r;})),t,i];var t,i;},"boolean"==typeof(null==r?void 0:r.useProxies)&&this.setUseProxies(r.useProxies),"boolean"==typeof(null==r?void 0:r.autoFreeze)&&this.setAutoFreeze(r.autoFreeze);}var i=e.prototype;return i.createDraft=function(e){t(e)||n(8),r(e)&&(e=D(e));var i=w(this),o=R(this,e,void 0);return o[Q].C=!0,O(i),o},i.finishDraft=function(r,t){var e=r&&r[Q];var i=e.A;return j(i,t),P(void 0,i)},i.setAutoFreeze=function(n){this.F=n;},i.setUseProxies=function(r){r&&!B&&n(20),this.O=r;},i.applyPatches=function(n,t){var e;for(e=t.length-1;e>=0;e--){var i=t[e];if(0===i.path.length&&"replace"===i.op){n=i.value;break}}var o=b("Patches").$;return r(n)?o(n,t):this.produce(n,(function(n){return o(n,t.slice(e+1))}))},e}(),an=new un,fn=an.produce,cn=an.produceWithPatches.bind(an),sn=an.setAutoFreeze.bind(an),vn=an.setUseProxies.bind(an),pn=an.applyPatches.bind(an),ln=an.createDraft.bind(an),dn=an.finishDraft.bind(an);

function useStoreState(store, getSubState, deps) {
    const updateRef = react.useRef({ state: undefined, initialized: false });
    if (!updateRef.current.initialized) {
        updateRef.current.state = getSubState ? getSubState(store.getRawState()) : store.getRawState();
        updateRef.current.initialized = true;
    }
    const [, setUpdateTrigger] = react.useState(0);
    react.useEffect(() => {
        const effectState = { shouldUpdate: true };
        function update() {
            if (effectState.shouldUpdate) {
                const nextSubState = getSubState
                    ? getSubState(store.getRawState())
                    : store.getRawState();
                if (!es6(updateRef.current.state, nextSubState)) {
                    if (effectState.shouldUpdate) {
                        updateRef.current.state = nextSubState;
                        setUpdateTrigger((val) => val + 1);
                    }
                }
            }
        }
        store._addUpdateListener(update);
        update();
        return () => {
            effectState.shouldUpdate = false;
            store._removeUpdateListener(update);
        };
    }, deps !== null && deps !== void 0 ? deps : []);
    if (deps !== undefined) {
        const prevDeps = react.useRef(deps);
        if (!es6(deps, prevDeps)) {
            updateRef.current.state = getSubState(store.getRawState());
        }
    }
    return updateRef.current.state;
}function useLocalStore(initialState, deps) {
    const storeRef = react.useRef();
    if (storeRef.current == null) {
        storeRef.current = new Store(initialState);
    }
    if (deps !== undefined) {
        const prevDeps = react.useRef(deps);
        if (!es6(deps, prevDeps)) {
            storeRef.current = new Store(initialState);
        }
    }
    return storeRef.current;
}const globalClientState = {
    storeOrdinal: 0,
    batching: false,
    flushStores: {}
};T();
function makeSubscriptionFunction(store, watch, listener) {
    let lastWatchState = watch(store.getRawState());
    return () => {
        const currentState = store.getRawState();
        const nextWatchState = watch(currentState);
        if (!es6(nextWatchState, lastWatchState)) {
            listener(nextWatchState, currentState, lastWatchState);
            lastWatchState = nextWatchState;
        }
    };
}
function makeReactionFunctionCreator(watch, reaction) {
    return (store) => {
        let lastWatchState = watch(store.getRawState());
        return (forceRun = false) => {
            const currentState = store.getRawState();
            const nextWatchState = watch(currentState);
            if (forceRun || !es6(nextWatchState, lastWatchState)) {
                if (store._optListenerCount > 0) {
                    const [nextState, patches, inversePatches] = cn(currentState, (s) => reaction(nextWatchState, s, currentState, lastWatchState));
                    store._updateStateWithoutReaction(nextState);
                    lastWatchState = nextWatchState;
                    if (patches.length > 0) {
                        store._patchListeners.forEach((listener) => listener(patches, inversePatches));
                        return Object.keys(getChangedPathsFromPatches(patches));
                    }
                }
                else {
                    if (store._patchListeners.length > 0) {
                        const [nextState, patches, inversePatches] = cn(currentState, (s) => reaction(nextWatchState, s, currentState, lastWatchState));
                        if (patches.length > 0) {
                            store._patchListeners.forEach((listener) => listener(patches, inversePatches));
                        }
                        store._updateStateWithoutReaction(nextState);
                    }
                    else {
                        store._updateStateWithoutReaction(fn(currentState, (s) => reaction(nextWatchState, s, currentState, lastWatchState)));
                    }
                    lastWatchState = nextWatchState;
                }
            }
            return [];
        };
    };
}
const optPathDivider = "~._.~";
class Store {
    constructor(initialState) {
        this.updateListeners = [];
        this.ssr = false;
        this.reactions = [];
        this.clientSubscriptions = [];
        this.reactionCreators = [];
        this.optimizedUpdateListeners = {};
        this.optimizedUpdateListenerPaths = {};
        this.optimizedListenerPropertyMap = {};
        this._optListenerCount = 0;
        this._patchListeners = [];
        if (initialState instanceof Function) {
            const state = initialState();
            this.currentState = state;
            this.initialState = state;
            this.createInitialState = initialState;
        }
        else {
            this.currentState = initialState;
            this.initialState = initialState;
            this.createInitialState = () => initialState;
        }
        this.internalOrdId = globalClientState.storeOrdinal++;
    }
    _setInternalOptions({ ssr, reactionCreators = [] }) {
        this.ssr = ssr;
        this.reactionCreators = reactionCreators;
        this.reactions = reactionCreators.map((rc) => rc(this));
    }
    _getReactionCreators() {
        return this.reactionCreators;
    }
    _instantiateReactions() {
        this.reactions = this.reactionCreators.map((rc) => rc(this));
    }
    _getInitialState() {
        return this.createInitialState();
    }
    _updateStateWithoutReaction(nextState) {
        this.currentState = nextState;
    }
    _updateState(nextState, updateKeyedPaths = []) {
        this.currentState = nextState;
        this.batchState = undefined;
        for (const runReaction of this.reactions) {
            updateKeyedPaths.push(...runReaction());
        }
        if (!this.ssr) {
            for (const runSubscription of this.clientSubscriptions) {
                runSubscription();
            }
            if (updateKeyedPaths.length > 0) {
                const updateOrds = new Set();
                for (const keyedPath of updateKeyedPaths) {
                    if (this.optimizedListenerPropertyMap[keyedPath]) {
                        for (const ord of this.optimizedListenerPropertyMap[keyedPath]) {
                            updateOrds.add(ord);
                        }
                    }
                }
                for (const ord of updateOrds.values()) {
                    if (this.optimizedUpdateListeners[ord]) {
                        this.optimizedUpdateListeners[ord]();
                    }
                }
            }
            this.updateListeners.forEach((listener) => listener());
        }
    }
    _addUpdateListener(listener) {
        this.updateListeners.push(listener);
    }
    _addUpdateListenerOpt(listener, ordKey, paths) {
        this.optimizedUpdateListeners[ordKey] = listener;
        const listenerPathsKeyed = paths.map((path) => path.join(optPathDivider));
        this.optimizedUpdateListenerPaths[ordKey] = listenerPathsKeyed;
        for (const keyedPath of listenerPathsKeyed) {
            if (this.optimizedListenerPropertyMap[keyedPath] == null) {
                this.optimizedListenerPropertyMap[keyedPath] = [ordKey];
            }
            else {
                this.optimizedListenerPropertyMap[keyedPath].push(ordKey);
            }
        }
        this._optListenerCount++;
    }
    _removeUpdateListener(listener) {
        this.updateListeners = this.updateListeners.filter((f) => f !== listener);
    }
    _removeUpdateListenerOpt(ordKey) {
        const listenerPathsKeyed = this.optimizedUpdateListenerPaths[ordKey];
        for (const keyedPath of listenerPathsKeyed) {
            this.optimizedListenerPropertyMap[keyedPath] = this.optimizedListenerPropertyMap[keyedPath].filter((ord) => ord !== ordKey);
        }
        delete this.optimizedUpdateListenerPaths[ordKey];
        delete this.optimizedUpdateListeners[ordKey];
        this._optListenerCount--;
    }
    listenToPatches(patchListener) {
        this._patchListeners.push(patchListener);
        return () => {
            this._patchListeners = this._patchListeners.filter((f) => f !== patchListener);
        };
    }
    subscribe(watch, listener) {
        if (!this.ssr) {
            const func = makeSubscriptionFunction(this, watch, listener);
            this.clientSubscriptions.push(func);
            return () => {
                this.clientSubscriptions = this.clientSubscriptions.filter((f) => f !== func);
            };
        }
        return () => {
            console.warn(`Pullstate: Subscriptions made on the server side are not registered - so therefor this call to unsubscribe does nothing.`);
        };
    }
    createReaction(watch, reaction, { runNow = false, runNowWithSideEffects = false } = {}) {
        const creator = makeReactionFunctionCreator(watch, reaction);
        this.reactionCreators.push(creator);
        const func = creator(this);
        this.reactions.push(func);
        if (runNow || runNowWithSideEffects) {
            func(true);
            if (runNowWithSideEffects && !this.ssr) {
                this._updateState(this.currentState);
            }
        }
        return () => {
            this.reactions = this.reactions.filter((f) => f !== func);
        };
    }
    getRawState() {
        if (this.batchState !== undefined) {
            return this.batchState;
        }
        else {
            return this.currentState;
        }
    }
    useState(getSubState, deps) {
        return useStoreState(this, getSubState, deps);
    }
    useLocalCopyInitial(deps) {
        return useLocalStore(this.createInitialState, deps);
    }
    useLocalCopySnapshot(deps) {
        return useLocalStore(this.currentState, deps);
    }
    flushBatch(ignoreError = false) {
        if (this.batchState !== undefined) {
            if (this.batchState !== this.currentState) {
                this._updateState(this.batchState);
            }
        }
        else if (!ignoreError) {
            console.error(`Pullstate: Trying to flush batch state which was never created or updated on`);
        }
        this.batchState = undefined;
    }
    update(updater, patchesCallback) {
        {
            this.batchState = undefined;
            update(this, updater, patchesCallback);
        }
    }
    replace(newState) {
        this._updateState(newState);
    }
    applyPatches(patches) {
        applyPatchesToStore(this, patches);
    }
}
function applyPatchesToStore(store, patches) {
    const currentState = store.getRawState();
    const nextState = pn(currentState, patches);
    if (nextState !== currentState) {
        store._updateState(nextState, Object.keys(getChangedPathsFromPatches(patches)));
    }
}
function getChangedPathsFromPatches(changePatches, prev = {}) {
    for (const patch of changePatches) {
        let curKey;
        for (const p of patch.path) {
            if (curKey) {
                curKey = `${curKey}${optPathDivider}${p}`;
            }
            else {
                curKey = p;
            }
            prev[curKey] = 1;
        }
    }
    return prev;
}
function runUpdates(currentState, updater, func) {
    return func
        ? cn(currentState, (s) => updater(s, currentState))
        : updater.reduce(([nextState, patches, inversePatches], currentValue) => {
            const resp = cn(nextState, (s) => currentValue(s, nextState));
            patches.push(...resp[1]);
            inversePatches.push(...resp[2]);
            return [resp[0], patches, inversePatches];
        }, [currentState, [], []]);
}
function update(store, updater, patchesCallback) {
    const currentState = store.getRawState();
    const func = typeof updater === "function";
    if (store._optListenerCount > 0) {
        const [nextState, patches, inversePatches] = runUpdates(currentState, updater, func);
        if (patches.length > 0) {
            if (patchesCallback) {
                patchesCallback(patches, inversePatches);
            }
            store._patchListeners.forEach((listener) => listener(patches, inversePatches));
            store._updateState(nextState, Object.keys(getChangedPathsFromPatches(patches)));
        }
    }
    else {
        let nextState;
        if (store._patchListeners.length > 0 || patchesCallback) {
            const [ns, patches, inversePatches] = runUpdates(currentState, updater, func);
            if (patches.length > 0) {
                if (patchesCallback) {
                    patchesCallback(patches, inversePatches);
                }
                store._patchListeners.forEach((listener) => listener(patches, inversePatches));
            }
            nextState = ns;
        }
        else {
            nextState = fn(currentState, (s) => func
                ? updater(s, currentState)
                : updater.reduce((previousValue, currentUpdater) => {
                    return fn(previousValue, (s) => currentUpdater(s, previousValue));
                }, currentState));
        }
        if (nextState !== currentState) {
            store._updateState(nextState);
        }
    }
}var EAsyncEndTags;
(function (EAsyncEndTags) {
    EAsyncEndTags["THREW_ERROR"] = "THREW_ERROR";
    EAsyncEndTags["RETURNED_ERROR"] = "RETURNED_ERROR";
    EAsyncEndTags["UNFINISHED"] = "UNFINISHED";
    EAsyncEndTags["DORMANT"] = "DORMANT";
})(EAsyncEndTags || (EAsyncEndTags = {}));
var EPostActionContext;
(function (EPostActionContext) {
    EPostActionContext["WATCH_HIT_CACHE"] = "WATCH_HIT_CACHE";
    EPostActionContext["BECKON_HIT_CACHE"] = "BECKON_HIT_CACHE";
    EPostActionContext["RUN_HIT_CACHE"] = "RUN_HIT_CACHE";
    EPostActionContext["READ_HIT_CACHE"] = "READ_HIT_CACHE";
    EPostActionContext["READ_RUN"] = "READ_RUN";
    EPostActionContext["SHORT_CIRCUIT"] = "SHORT_CIRCUIT";
    EPostActionContext["DIRECT_RUN"] = "DIRECT_RUN";
    EPostActionContext["BECKON_RUN"] = "BECKON_RUN";
    EPostActionContext["CACHE_UPDATE"] = "CACHE_UPDATE";
})(EPostActionContext || (EPostActionContext = {}));let storeErrorProxy;
try {
    storeErrorProxy = new Proxy({}, {
        get: function (obj, prop) {
            throw new Error(`Pullstate: Trying to access store (${String(prop)}) inside async actions without the correct usage or setup.
If this error occurred on the server:
* If using run(), make use of your created instance for this request: instance.runAsyncAction()
* If using read(), useWatch(), useBeckon() etc. - make sure you have properly set up your <PullstateProvider/>

If this error occurred on the client:
* Make sure you have created your "pullstateCore" object with all your stores, using createPullstateCore(), and are making use of instantiate() before rendering.`);
        }
    });
}
catch {
    storeErrorProxy = {};
}
const startedButUnfinishedResult = [
    true,
    false,
    {
        message: "",
        tags: [EAsyncEndTags.UNFINISHED],
        error: true,
        payload: null,
        errorPayload: null
    },
    false,
    -1
];
const PullstateContext = react.createContext(null);
var EAsyncActionInjectType;
(function (EAsyncActionInjectType) {
    EAsyncActionInjectType["WATCH"] = "watch";
    EAsyncActionInjectType["BECKON"] = "beckon";
})(EAsyncActionInjectType || (EAsyncActionInjectType = {}));

export { Store };
