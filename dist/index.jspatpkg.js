/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "name": () => (/* binding */ name),
/* harmony export */   "author": () => (/* binding */ author),
/* harmony export */   "license": () => (/* binding */ license),
/* harmony export */   "keywords": () => (/* binding */ keywords),
/* harmony export */   "version": () => (/* binding */ version),
/* harmony export */   "description": () => (/* binding */ description),
/* harmony export */   "jspatcher": () => (/* binding */ jspatcher),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _package_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./package-info */ "./src/package-info.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const name = _package_info__WEBPACK_IMPORTED_MODULE_0__.default.name.split("/").pop().replace(/^package-/, '');
const {
  author,
  license,
  keywords,
  version,
  description,
  jspatcher
} = _package_info__WEBPACK_IMPORTED_MODULE_0__.default;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_objectSpread({
  name,
  author,
  license,
  keywords,
  version,
  description
}, jspatcher));

/***/ }),

/***/ "./src/objects/base.ts":
/*!*****************************!*\
  !*** ./src/objects/base.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UIObject)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/index.ts");
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class UIObject extends _sdk__WEBPACK_IMPORTED_MODULE_1__.BaseObject {}

_defineProperty(UIObject, "package", _index__WEBPACK_IMPORTED_MODULE_0__.name);

_defineProperty(UIObject, "author", _index__WEBPACK_IMPORTED_MODULE_0__.author);

_defineProperty(UIObject, "version", _index__WEBPACK_IMPORTED_MODULE_0__.version);

_defineProperty(UIObject, "description", _index__WEBPACK_IMPORTED_MODULE_0__.description);

/***/ }),

/***/ "./src/objects/bpf.ts":
/*!****************************!*\
  !*** ./src/objects/bpf.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ bpf)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
/* harmony import */ var _ui_bpf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/bpf */ "./src/ui/bpf.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class bpf extends _base__WEBPACK_IMPORTED_MODULE_0__.default {
  subscribe() {
    super.subscribe();
    this.on("preInit", () => {
      this.inlets = 2;
      this.outlets = 1;
      if (!this.data.points) this.data.points = [];
    });
    let prevRange;
    let prevDomain;
    this.on("postInit", () => {
      prevRange = this.getProp("range");
      prevDomain = this.getProp("domain");
    });
    this.on("updateProps", () => {
      const range = this.getProp("range");

      if (prevRange && prevRange !== range) {
        const points = this.data.points.map(p => [p[0], _sdk__WEBPACK_IMPORTED_MODULE_1__.MathUtils.scaleClip(p[1], prevRange[0], prevRange[1], range[0], range[1]), p[2]]);
        this.setData({
          points
        });
        this.updateUI(this.data);
        prevRange = range;
      }

      const domain = this.getProp("domain");

      if (typeof prevDomain === "number" && prevDomain !== domain) {
        const points = this.data.points.map(p => [_sdk__WEBPACK_IMPORTED_MODULE_1__.MathUtils.scaleClip(p[0], 0, prevDomain, 0, domain), p[1], p[2]]);
        this.setData({
          points
        });
        this.updateUI(this.data);
        prevDomain = domain;
      }
    });
    this.on("inlet", _ref => {
      let {
        data,
        inlet
      } = _ref;

      if ((0,_sdk__WEBPACK_IMPORTED_MODULE_1__.isBang)(data)) {
        if (inlet === 0) {
          const {
            points
          } = this.data;
          this.outlet(0, points.map((p, i) => [p[1], p[0] - (i > 0 ? points[i - 1][0] : 0), p[2]]));
        }
      } else {
        let points;

        try {
          points = _sdk__WEBPACK_IMPORTED_MODULE_1__.Utils.decodeBPF(data, 3);
        } catch (e) {
          this.error("Cannot decode inlet BPF");
        }

        this.setData({
          points
        });
        this.updateUI(this.data);
      }
    });
  }

}

_defineProperty(bpf, "description", "Break-point function editor");

_defineProperty(bpf, "inlets", [{
  type: "anything",
  isHot: true,
  description: "Display & output a bpf, bang to output"
}, {
  type: "anything",
  isHot: true,
  description: "Display without output"
}]);

_defineProperty(bpf, "outlets", [{
  type: "object",
  description: "BPF triggered"
}]);

_defineProperty(bpf, "props", {
  domain: {
    type: "number",
    default: 1000,
    description: "X-axis range, starts from 0",
    isUIState: true
  },
  range: {
    type: "object",
    default: [0, 1],
    description: "Y-axis range, [low, high]",
    isUIState: true
  },
  textColor: {
    type: "color",
    default: "rgba(0, 255, 255, 1)",
    description: "Text color",
    isUIState: true
  },
  fontFamily: {
    type: "enum",
    enums: ["Lato", "Georgia", "Times New Roman", "Arial", "Tahoma", "Verdana", "Courier New"],
    default: "Arial",
    description: "Font family",
    isUIState: true
  },
  fontSize: {
    type: "number",
    default: 10,
    description: "Text font size",
    isUIState: true
  },
  fontFace: {
    type: "enum",
    enums: ["regular", "bold", "italic", "bold italic"],
    default: "regular",
    description: "Text style",
    isUIState: true
  },
  pointColor: {
    type: "color",
    default: "white",
    description: "Text color",
    isUIState: true
  },
  lineColor: {
    type: "color",
    default: "white",
    description: "Line color",
    isUIState: true
  },
  bgColor: {
    type: "color",
    default: "rgba(0, 0, 0, 0.5)",
    description: "Background color",
    isUIState: true
  }
});

_defineProperty(bpf, "UI", _ui_bpf__WEBPACK_IMPORTED_MODULE_2__.default);

/***/ }),

/***/ "./src/objects/code.ts":
/*!*****************************!*\
  !*** ./src/objects/code.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ code)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class code extends _base__WEBPACK_IMPORTED_MODULE_0__.default {
  subscribe() {
    super.subscribe();
    this.on("preInit", () => {
      this.inlets = 2;
      this.outlets = 2;
      if (typeof this.data.value === "undefined") this.setData({
        value: ""
      });
    });
    this.on("editorLoaded", () => this.updateUI({
      language: this.box.args[0] || "javascript"
    }));
    this.on("change", () => this.outlet(1, new _sdk__WEBPACK_IMPORTED_MODULE_1__.Bang()));
    this.on("updateArgs", args => {
      if (args[0]) this.updateUI({
        language: args[0]
      });
    });
    this.on("inlet", _ref => {
      let {
        data,
        inlet
      } = _ref;

      if (inlet === 0) {
        if ((0,_sdk__WEBPACK_IMPORTED_MODULE_1__.isBang)(data)) this.outlet(0, this.data.value);
      } else if (inlet === 1) {
        const value = typeof data === "string" ? data : "".concat(data);
        this.updateUI({
          value
        });
        this.setData({
          value
        });
      }
    });
  }

}

_defineProperty(code, "description", "Code Editor");

_defineProperty(code, "inlets", [{
  isHot: true,
  type: "bang",
  description: "Trigger output the code"
}, {
  isHot: false,
  type: "string",
  description: "Set the code"
}]);

_defineProperty(code, "outlets", [{
  type: "string",
  description: "Code"
}, {
  type: "bang",
  description: "Bang when the code is changed"
}]);

_defineProperty(code, "args", [{
  type: "string",
  optional: true,
  default: "javascript",
  description: "language"
}]);

_defineProperty(code, "UI", _sdk__WEBPACK_IMPORTED_MODULE_1__.CodeUI);

/***/ }),

/***/ "./src/objects/img.ts":
/*!****************************!*\
  !*** ./src/objects/img.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ img)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
/* harmony import */ var _ui_img__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/img */ "./src/ui/img.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class img extends _base__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor() {
    var _this$box$args$;

    super(...arguments);

    _defineProperty(this, "_", {
      key: (_this$box$args$ = this.box.args[0]) === null || _this$box$args$ === void 0 ? void 0 : _this$box$args$.toString(),
      image: undefined,
      file: undefined,
      url: ""
    });
  }

  subscribe() {
    super.subscribe();

    const handleFilePathChanged = () => {
      var _this$_$file;

      this._.key = (_this$_$file = this._.file) === null || _this$_$file === void 0 ? void 0 : _this$_$file.projectPath;
    };

    const subsribeItem = async () => {
      const {
        image,
        file
      } = this._;
      if (image) await image.addObserver(this);

      if (file) {
        file.on("destroyed", reload);
        file.on("nameChanged", handleFilePathChanged);
        file.on("pathChanged", handleFilePathChanged);
      }
    };

    const unsubscribeItem = async () => {
      const {
        image,
        file
      } = this._;

      if (file) {
        file.off("destroyed", reload);
        file.off("nameChanged", handleFilePathChanged);
        file.off("pathChanged", handleFilePathChanged);
      }

      if (image) await image.removeObserver(this);
    };

    const reload = async () => {
      await unsubscribeItem();
      const {
        key
      } = this._;
      let image;
      let url;

      try {
        const {
          item
        } = await this.getSharedItem(key, "image");
        image = await item.instantiate({
          env: this.patcher.env,
          project: this.patcher.project
        });
        this._.image = image;
        this._.file = item;
        url = image.objectURL;
      } catch (_unused) {
        url = key;
      } finally {
        this._.url = url;
        this.updateUI({
          url
        });
        await subsribeItem();
      }
    };

    this.on("preInit", () => {
      this.inlets = 1;
      this.outlets = 0;
    });
    this.on("postInit", reload);
    this.on("updateArgs", args => {
      if (typeof args[0] === "string") {
        var _args$;

        const oldKey = this._.key;
        const key = (_args$ = args[0]) === null || _args$ === void 0 ? void 0 : _args$.toString();
        this._.key = key;
        if (key !== oldKey) reload();
      }
    });
    this.on("inlet", _ref => {
      let {
        data,
        inlet
      } = _ref;

      if (inlet === 0) {
        if (!(0,_sdk__WEBPACK_IMPORTED_MODULE_1__.isBang)(data)) {
          if (typeof data === "string") {
            this._.key = data;
            reload();
          }
        }
      }
    });
    this.on("destroy", unsubscribeItem);
  }

}

_defineProperty(img, "description", "Display an image");

_defineProperty(img, "inlets", [{
  isHot: true,
  type: "anything",
  description: "Image file name or url"
}]);

_defineProperty(img, "args", [{
  type: "string",
  optional: true,
  description: "Image file name or url"
}]);

_defineProperty(img, "props", {
  scroll: {
    type: "boolean",
    default: false,
    description: "Allow overflow-scroll",
    isUIState: true
  },
  objectFit: {
    type: "enum",
    enums: ["fill", "cover", "contain", "none", "scale-down"],
    default: "contain",
    description: "CSS object-fit property",
    isUIState: true
  },
  objectPosition: {
    type: "string",
    default: "50% 50%",
    description: 'CSS object-position property, for example "50% 50%" or "left top"',
    isUIState: true
  }
});

_defineProperty(img, "UI", _ui_img__WEBPACK_IMPORTED_MODULE_2__.default);

/***/ }),

/***/ "./src/objects/keyboard.ts":
/*!*********************************!*\
  !*** ./src/objects/keyboard.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ keyboard)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
/* harmony import */ var _ui_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/keyboard */ "./src/ui/keyboard.tsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class keyboard extends _base__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor() {
    super(...arguments);

    _defineProperty(this, "_", {
      keys: this.flushed,
      selected: undefined
    });
  }

  get flushed() {
    const keys = [];

    for (let i = 0; i < 128; i++) {
      keys[i] = 0;
    }

    return keys;
  }

  flush() {
    const {
      keys
    } = this._;

    for (let $key = 0; $key < 128; $key++) {
      if (keys[$key]) {
        this.outlet(0, new Uint8Array([9 << 4, $key, 0]));
        this._.keys[$key] = 0;
      }
    }

    this._.selected = undefined;
  }

  keyTrigger(keyIn, velocityIn, noOutput) {
    const key = Math.max(0, Math.min(127, ~~+keyIn));
    const velocity = Math.max(0, Math.min(127, ~~+velocityIn));
    const mode = this.getProp("mode");

    if (mode === "mono") {
      const keys = this.flushed;
      keys[key] = velocity;
      if (!noOutput) this.outlet(0, new Uint8Array([9 << 4, key, velocity]));
      this._.keys = keys;
      this._.selected = key;
    } else if (mode === "poly") {
      const {
        keys
      } = this._;
      const v = +!keys[key] * (velocity || 1);
      keys[key] = v;
      if (!noOutput) this.outlet(0, new Uint8Array([9 << 4, key, v]));
      this._.keys = _objectSpread({}, keys);
      this._.selected = v ? key : undefined;
    } else {
      const {
        keys
      } = this._;
      keys[key] = velocity;
      if (!noOutput) this.outlet(0, new Uint8Array([9 << 4, key, velocity]));
      this._.keys = _objectSpread({}, keys);
      this._.selected = velocity ? key : undefined;
    }

    this.updateUI(this._);
  }

  subscribe() {
    super.subscribe();
    this.on("preInit", () => {
      this.inlets = 2;
      this.outlets = 1;
    });
    let prevMode;
    this.on("postInit", () => prevMode = this.getProp("mode"));
    this.on("updateProps", () => {
      if (prevMode && prevMode !== this.getProp("mode")) {
        this.flush();
        this._.keys = _objectSpread({}, this._.keys);
        this._.selected = undefined;
        this.updateUI(this._);
      }
    });
    this.on("inlet", _ref => {
      let {
        data,
        inlet
      } = _ref;

      if (inlet === 0 && data === "flush") {
        this.flush();
        this._.keys = _objectSpread({}, this._.keys);
        this._.selected = undefined;
        this.updateUI(this._);
      } else if (_sdk__WEBPACK_IMPORTED_MODULE_1__.Utils.isMIDIEvent(data)) {
        const cmd = data[0] >> 4;
        const channel = data[0] & 0xf;
        const data1 = data[1];
        const data2 = data[2];
        if (channel === 9) return;
        if (cmd === 8 || cmd === 9 && data2 === 0) this.keyTrigger(data1, 0, inlet === 1);else if (cmd === 9) this.keyTrigger(data1, data2, inlet === 1);
      }
    });
  }

}

_defineProperty(keyboard, "description", "Keyboard");

_defineProperty(keyboard, "inlets", [{
  type: "anything",
  isHot: true,
  description: 'Display & output same MIDI event, "flush" to flush active notes'
}, {
  type: "object",
  isHot: true,
  description: "Display without output"
}]);

_defineProperty(keyboard, "outlets", [{
  type: "object",
  description: "MIDI event triggered"
}]);

_defineProperty(keyboard, "props", {
  from: {
    type: "number",
    default: 24,
    description: "Lowest MIDI key to display",
    isUIState: true
  },
  to: {
    type: "number",
    default: 96,
    description: "Highest MIDI key to display",
    isUIState: true
  },
  blackKeyColor: {
    type: "color",
    default: "black",
    description: "Display color of black key",
    isUIState: true
  },
  whiteKeyColor: {
    type: "color",
    default: "white",
    description: "Display color of white key",
    isUIState: true
  },
  keyOnColor: {
    type: "color",
    default: "grey",
    description: "Display color of pressed key",
    isUIState: true
  },
  selectedColor: {
    type: "color",
    default: "yellow",
    description: "Display color of selected key",
    isUIState: true
  },
  mode: {
    type: "enum",
    enums: ["mono", "poly", "touch"],
    default: "poly",
    description: "Triggering mode",
    isUIState: true
  }
});

_defineProperty(keyboard, "UI", _ui_keyboard__WEBPACK_IMPORTED_MODULE_2__.default);

/***/ }),

/***/ "./src/objects/menu.ts":
/*!*****************************!*\
  !*** ./src/objects/menu.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ menu)
/* harmony export */ });
/* harmony import */ var _ui_menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/menu */ "./src/ui/menu.tsx");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class menu extends _base__WEBPACK_IMPORTED_MODULE_1__.default {
  subscribe() {
    super.subscribe();
    this.on("preInit", () => {
      this.inlets = 2;
      this.outlets = 1;
    });
    this.on("inlet", _ref => {
      let {
        data,
        inlet
      } = _ref;

      if (inlet === 0) {
        this.emit("query", data);
      } else {
        const options = data;
        this.updateProps({
          options
        });
      }
    });
  }

}

_defineProperty(menu, "description", "Dropdown Menu");

_defineProperty(menu, "inlets", [{
  isHot: true,
  type: "anything",
  description: "number or display text or array to select item(s)"
}, {
  isHot: false,
  type: "object",
  description: "Array of DropdownItemProps: { key, icon, text, value, ... }"
}]);

_defineProperty(menu, "outlets", [{
  type: "anything",
  description: "Selected value"
}]);

_defineProperty(menu, "args", [{
  type: "anything",
  varLength: true,
  optional: true,
  default: undefined,
  description: "Initial value(s)"
}]);

_defineProperty(menu, "props", {
  clearable: {
    type: "boolean",
    default: false,
    description: "Using the clearable setting will let users remove their selection",
    isUIState: true
  },
  closeOnBlur: {
    type: "boolean",
    default: true,
    description: "Whether or not the menu should close when the dropdown is blurred",
    isUIState: true
  },
  closeOnChange: {
    type: "boolean",
    default: undefined,
    description: "Whether or not the menu should close when a value is selected",
    isUIState: true
  },
  closeOnEscape: {
    type: "boolean",
    default: true,
    description: "Whether or not the dropdown should close when the escape key is pressed",
    isUIState: true
  },
  deburr: {
    type: "boolean",
    default: false,
    description: "Whether or not the dropdown should strip diacritics in options and input search",
    isUIState: true
  },
  defaultOpen: {
    type: "boolean",
    default: false,
    description: "Initial value of open",
    isUIState: true
  },
  defaultValue: {
    type: "anything",
    default: undefined,
    description: "Initial value or value array if multiple",
    isUIState: true
  },
  direction: {
    type: "enum",
    enums: ["left", "right"],
    default: "left",
    description: "A dropdown menu can open to the left or to the right",
    isUIState: true
  },
  disabled: {
    type: "boolean",
    default: false,
    description: " A disabled dropdown menu or item does not allow user interaction",
    isUIState: true
  },
  error: {
    type: "boolean",
    default: false,
    description: "An errored dropdown can alert a user to a problem",
    isUIState: true
  },
  lazyLoad: {
    type: "boolean",
    default: false,
    description: "A dropdown can defer rendering its options until it is open",
    isUIState: true
  },
  minCharacters: {
    type: "number",
    default: 1,
    description: "The minimum characters for a search to begin showing results",
    isUIState: true
  },
  multiple: {
    type: "boolean",
    default: false,
    description: "A selection dropdown can allow multiple selections",
    isUIState: true
  },
  noResultsMessage: {
    type: "string",
    default: "No results found",
    description: "Message to display when there are no results",
    isUIState: true
  },
  options: {
    type: "anything",
    default: [],
    description: "Array of Dropdown.Item props",
    isUIState: true
  },
  placeholder: {
    type: "string",
    default: "",
    description: "Placeholder text",
    isUIState: true
  },
  scrolling: {
    type: "boolean",
    default: false,
    description: "A dropdown can have its menu scroll",
    isUIState: true
  },
  search: {
    type: "boolean",
    default: false,
    description: "A selection dropdown can allow a user to search through a large list of choices",
    isUIState: true
  },
  selectOnBlur: {
    type: "boolean",
    default: true,
    description: "Whether the highlighted item should be selected on blur",
    isUIState: true
  },
  selectOnNavigation: {
    type: "boolean",
    default: true,
    description: "Whether dropdown should select new option when using keyboard shortcuts.",
    isUIState: true
  },
  simple: {
    type: "boolean",
    default: false,
    description: "A dropdown menu can open to the left or to the right",
    isUIState: true
  },
  tabIndex: {
    type: "anything",
    default: undefined,
    description: "A dropdown can receive focus",
    isUIState: true
  },
  text: {
    type: "string",
    default: undefined,
    description: "The text displayed in the dropdown, usually for the active item",
    isUIState: true
  },
  upward: {
    type: "boolean",
    default: false,
    description: "Controls whether the dropdown will open upward",
    isUIState: true
  },
  wrapSelection: {
    type: "boolean",
    default: false,
    description: "Selection will wrap to end or start on press ArrowUp or ArrowDown",
    isUIState: true
  }
});

_defineProperty(menu, "UI", _ui_menu__WEBPACK_IMPORTED_MODULE_0__.default);

/***/ }),

/***/ "./src/objects/message.ts":
/*!********************************!*\
  !*** ./src/objects/message.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ message)
/* harmony export */ });
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
/* harmony import */ var _ui_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ui/message */ "./src/ui/message.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class message extends _base__WEBPACK_IMPORTED_MODULE_2__.default {
  constructor() {
    super(...arguments);

    _defineProperty(this, "_", {
      buffer: new _sdk__WEBPACK_IMPORTED_MODULE_1__.Bang(),
      editing: false
    });

    _defineProperty(this, "handleUpdateArgs", args => {
      if (typeof args[0] !== "undefined") {
        this.setData({
          text: this.stringify(args[0])
        });
        this._.buffer = this.parse(args[0]);
      } else {
        this._.buffer = new _sdk__WEBPACK_IMPORTED_MODULE_1__.Bang();
      }

      this.updateUI({
        text: this.data.text
      });
    });
  }

  subscribe() {
    super.subscribe();
    this.on("preInit", () => {
      this.inlets = 2;
      this.outlets = 1;
    });
    this.on("postInit", () => {
      const args = this.box.args;
      if (typeof this.data.text === "string") this._.buffer = this.parse(this.data.text);else if (typeof args[0] !== "undefined") {
        if (typeof this.data.text !== "string") {
          this.setData({
            text: this.stringify(args[0])
          });
          this._.buffer = args[0];
        }
      } else {
        this.setData({
          text: ""
        });
        this._.buffer = new _sdk__WEBPACK_IMPORTED_MODULE_1__.Bang();
      }
    });
    this.on("updateArgs", this.handleUpdateArgs);
    this.on("inlet", _ref => {
      let {
        data,
        inlet
      } = _ref;
      if (inlet === 0) this.outlet(0, this._.buffer);else if (inlet === 1) this.handleUpdateArgs([data]);
    });
  }

  parse(o) {
    if (typeof o === "string") {
      if (o.length > 0) {
        try {
          return JSON.parse(o);
        } catch (e) {
          return o;
        }
      }

      return new _sdk__WEBPACK_IMPORTED_MODULE_1__.Bang();
    }

    return o;
  }

  stringify(o) {
    if (typeof o === "string") return o;

    try {
      return JSON.stringify(o);
    } catch (e) {
      return util__WEBPACK_IMPORTED_MODULE_0__.inspect(o);
    }
  }

}

_defineProperty(message, "description", "Message");

_defineProperty(message, "inlets", [{
  isHot: true,
  type: "anything",
  description: "Trigger output the message"
}, {
  isHot: false,
  type: "anything",
  description: "Set the message"
}]);

_defineProperty(message, "outlets", [{
  type: "anything",
  description: "Message to send"
}]);

_defineProperty(message, "UI", _ui_message__WEBPACK_IMPORTED_MODULE_3__.default);

/***/ }),

/***/ "./src/objects/view.ts":
/*!*****************************!*\
  !*** ./src/objects/view.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ view)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
/* harmony import */ var _ui_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/view */ "./src/ui/view.tsx");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class view extends _base__WEBPACK_IMPORTED_MODULE_2__.default {
  constructor() {
    super(...arguments);

    _defineProperty(this, "_", {
      children: []
    });
  }

  subscribe() {
    super.subscribe();
    this.on("preInit", () => {
      this.inlets = 1;
      this.outlets = 0;
    });

    const handleUpdateArgs = args => {
      if (typeof args[0] === "string") {
        const template = document.createElement("template");
        template.innerHTML = args[0];
        this._.children = Array.from(template.content.children);
        this.updateUI({
          children: this._.children
        });
      }
    };

    this.on("postInit", () => handleUpdateArgs(this.args));
    this.on("updateArgs", handleUpdateArgs);
    this.on("inlet", _ref => {
      let {
        data,
        inlet
      } = _ref;

      if (inlet === 0) {
        if (!(0,_sdk__WEBPACK_IMPORTED_MODULE_0__.isBang)(data)) {
          if (typeof data === "string") {
            const template = document.createElement("template");
            template.innerHTML = data;
            this._.children = Array.from(template.content.children);
          } else if (data instanceof Element) {
            this._.children = [data];
          }

          this.updateUI({
            children: this._.children
          });
        }
      }
    });
  }

}

_defineProperty(view, "description", "View HTML Element");

_defineProperty(view, "inlets", [{
  isHot: true,
  type: "anything",
  description: "HTML string or HTMLElement object to view"
}]);

_defineProperty(view, "args", [{
  type: "string",
  optional: true,
  description: "initial innerHTML"
}]);

_defineProperty(view, "props", {
  shadow: {
    type: "boolean",
    default: true,
    description: "Whether children should be attached to a Shadow DOM",
    isUIState: true
  },
  containerProps: {
    type: "object",
    default: {},
    description: "Available under non-shadow mode, the props for div container",
    isUIState: true
  }
});

_defineProperty(view, "UI", _ui_view__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./src/objects/waveform.ts":
/*!*********************************!*\
  !*** ./src/objects/waveform.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ waveform)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/objects/base.ts");
/* harmony import */ var _ui_waveform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/waveform */ "./src/ui/waveform.tsx");
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class waveform extends _base__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor() {
    super(...arguments);

    _defineProperty(this, "_", {
      audio: undefined
    });
  }

  subscribe() {
    super.subscribe();
    this.on("preInit", () => {
      this.inlets = 1;
      this.outlets = 0;
    });
    this.on("inlet", async _ref => {
      let {
        data,
        inlet
      } = _ref;

      if (inlet === 0) {
        if (data instanceof _sdk__WEBPACK_IMPORTED_MODULE_2__.PatcherAudio) {
          this.setState({
            audio: data
          });
          this.updateUI(this._);
          this.updateProps({
            selRange: null,
            viewRange: [0, data.length],
            cursor: 0
          });
        } else {
          this.error("Input data is not PatcherAudio instance");
        }
      }
    });
  }

}

_defineProperty(waveform, "description", "Buffer waveform view");

_defineProperty(waveform, "inlets", [{
  isHot: false,
  type: "object",
  description: "Patcher Audio object (from buffer~)"
}]);

_defineProperty(waveform, "props", {
  interleaved: {
    type: "boolean",
    default: false,
    description: "Draw channels seperately",
    isUIState: true
  },
  cursor: {
    type: "number",
    default: 0,
    description: "Display a cursor",
    isUIState: true
  },
  viewRange: {
    type: "object",
    default: [0, 1],
    description: "Display only a part of the buffer",
    isUIState: true
  },
  selRange: {
    type: "object",
    default: null,
    description: "Nullable, display selection of a part of the buffer",
    isUIState: true
  },
  verticalRange: {
    type: "object",
    default: [-1, 1],
    description: "Vertical range",
    isUIState: true
  },
  autoVerticalRange: {
    type: "boolean",
    default: true,
    description: "Auto adjust vertical range if > 1",
    isUIState: true
  },
  showStats: {
    type: "boolean",
    default: true,
    description: "Show stats texts",
    isUIState: true
  },
  bgColor: {
    type: "color",
    default: "rgb(40, 40, 40)",
    description: "Background color",
    isUIState: true
  },
  cursorColor: {
    type: "color",
    default: "white",
    description: "Cursor color",
    isUIState: true
  },
  phosphorColor: {
    type: "color",
    default: "hsl(0, 100%, 85%)",
    description: "Phosphor color",
    isUIState: true
  },
  hueOffset: {
    type: "number",
    default: 60,
    description: "Channel Color Hue offset",
    isUIState: true
  },
  textColor: {
    type: "color",
    default: "#DDDD99",
    description: "Info text color",
    isUIState: true
  },
  gridColor: {
    type: "color",
    default: "#404040",
    description: "Grid color",
    isUIState: true
  },
  seperatorColor: {
    type: "color",
    default: "white",
    description: "Channel seperator color",
    isUIState: true
  },
  audioUnit: {
    type: "enum",
    default: "time",
    enums: ["time", "sample", "measure"],
    description: "Vertical grid mode",
    isUIState: true
  },
  bpm: {
    type: "number",
    default: 60,
    description: "If audioUnit is measure, a BPM can be used",
    isUIState: true
  }
});

_defineProperty(waveform, "UI", _ui_waveform__WEBPACK_IMPORTED_MODULE_1__.default);

/***/ }),

/***/ "./src/package-info.ts":
/*!*****************************!*\
  !*** ./src/package-info.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var _package_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../package.json */ "./package.json");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/ (_package_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (_package_json__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(_package_json__WEBPACK_IMPORTED_MODULE_0__, 2))));

/***/ }),

/***/ "./src/sdk.ts":
/*!********************!*\
  !*** ./src/sdk.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "React": () => (/* binding */ React),
/* harmony export */   "ReactDOM": () => (/* binding */ ReactDOM),
/* harmony export */   "SemanticUI": () => (/* binding */ SemanticUI),
/* harmony export */   "PatcherAudio": () => (/* binding */ PatcherAudio),
/* harmony export */   "OperableAudioBuffer": () => (/* binding */ OperableAudioBuffer),
/* harmony export */   "Patcher": () => (/* binding */ Patcher),
/* harmony export */   "Box": () => (/* binding */ Box),
/* harmony export */   "Line": () => (/* binding */ Line),
/* harmony export */   "BaseObject": () => (/* binding */ BaseObject),
/* harmony export */   "DefaultObject": () => (/* binding */ DefaultObject),
/* harmony export */   "BaseUI": () => (/* binding */ BaseUI),
/* harmony export */   "DefaultUI": () => (/* binding */ DefaultUI),
/* harmony export */   "CanvasUI": () => (/* binding */ CanvasUI),
/* harmony export */   "CodeUI": () => (/* binding */ CodeUI),
/* harmony export */   "DefaultPopupUI": () => (/* binding */ DefaultPopupUI),
/* harmony export */   "CodePopupUI": () => (/* binding */ CodePopupUI),
/* harmony export */   "DOMUI": () => (/* binding */ DOMUI),
/* harmony export */   "generateDefaultObject": () => (/* binding */ generateDefaultObject),
/* harmony export */   "generateRemoteObject": () => (/* binding */ generateRemoteObject),
/* harmony export */   "generateRemotedObject": () => (/* binding */ generateRemotedObject),
/* harmony export */   "Bang": () => (/* binding */ Bang),
/* harmony export */   "isBang": () => (/* binding */ isBang),
/* harmony export */   "TransmitterNode": () => (/* binding */ TransmitterNode),
/* harmony export */   "TemporalAnalyserNode": () => (/* binding */ TemporalAnalyserNode),
/* harmony export */   "SpectralAnalyserNode": () => (/* binding */ SpectralAnalyserNode),
/* harmony export */   "MathUtils": () => (/* binding */ MathUtils),
/* harmony export */   "BufferUtils": () => (/* binding */ BufferUtils),
/* harmony export */   "Utils": () => (/* binding */ Utils),
/* harmony export */   "getReactMonacoEditor": () => (/* binding */ getReactMonacoEditor)
/* harmony export */ });
const sdk = globalThis.jspatcherEnv.sdk;
const {
  React,
  ReactDOM,
  SemanticUI,
  PatcherAudio,
  OperableAudioBuffer,
  Patcher,
  Box,
  Line,
  BaseObject,
  DefaultObject,
  BaseUI,
  DefaultUI,
  CanvasUI,
  CodeUI,
  DefaultPopupUI,
  CodePopupUI,
  DOMUI,
  generateDefaultObject,
  generateRemoteObject,
  generateRemotedObject,
  Bang,
  isBang,
  TransmitterNode,
  TemporalAnalyserNode,
  SpectralAnalyserNode,
  MathUtils,
  BufferUtils,
  Utils,
  getReactMonacoEditor
} = sdk;

/***/ }),

/***/ "./src/ui/bpf.tsx":
/*!************************!*\
  !*** ./src/ui/bpf.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BPFUI)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class BPFUI extends _sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", _objectSpread(_objectSpread({}, this.state), {}, {
      points: this.object.data.points,
      ghostPoint: undefined
    }));

    _defineProperty(this, "dragged", false);

    _defineProperty(this, "mouseDown", false);

    _defineProperty(this, "refG", _sdk__WEBPACK_IMPORTED_MODULE_0__.React.createRef());

    _defineProperty(this, "handleResized", () => {
      if (this.refG.current) {
        this.refG.current.style.transformOrigin = "0";
        requestAnimationFrame(() => this.refG.current.style.transformOrigin = "center");
      }
    });

    _defineProperty(this, "handleMouseMove", () => {
      this.setState({
        ghostPoint: undefined
      });
    });

    _defineProperty(this, "handleDoubleClick", e => {
      if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
      this.dragged = false;
      const {
        points
      } = this.state;
      const svg = e.currentTarget;
      let {
        left,
        top,
        width,
        height
      } = svg.getBoundingClientRect();
      left += 0.025 * width;
      top += 0.025 * height;
      width *= 0.95;
      height *= 0.95;
      const normalizedX = (e.clientX - left) / width;
      const normalizedY = 1 - (e.clientY - top) / height;
      const [x, y] = this.denormalizePoint(normalizedX, normalizedY);
      const {
        index: $point,
        point
      } = this.getInsertPoint(x, y);
      points.splice($point, 0, point);
      this.setState({
        points: points.slice()
      });
      this.object.setData({
        points: this.state.points
      });
    });

    _defineProperty(this, "handleMouseMoveLine", e => {
      if (this.mouseDown) return;
      e.stopPropagation();
      const line = e.currentTarget;

      if (e.altKey) {
        line.style.cursor = "ns-resize";
        return;
      }

      line.style.cursor = "unset";
      const {
        domain
      } = this.state;
      const svg = line.parentElement.parentElement;
      let {
        left,
        width
      } = svg.getBoundingClientRect();
      left += 0.025 * width;
      width *= 0.95;
      const normalizedX = (e.clientX - left) / width;
      const {
        point
      } = this.getInsertPoint(normalizedX * domain);
      this.setState({
        ghostPoint: point
      });
    });

    _defineProperty(this, "handleMouseDownLine", e => {
      e.stopPropagation();
      this.dragged = false;
      this.mouseDown = true;
      const line = e.currentTarget;
      const {
        points,
        domain,
        range
      } = this.state;
      const svg = line.parentElement.parentElement;
      let {
        left,
        top,
        width,
        height
      } = svg.getBoundingClientRect();
      left += 0.025 * width;
      top += 0.025 * height;
      width *= 0.95;
      height *= 0.95;

      if (e.altKey) {
        const i = +line.getAttribute("values");
        const prev = points[i];
        const next = points[i + 1];
        const {
          clientY
        } = e;

        const handleMouseMove = e => {
          this.dragged = true;
          let [rangeMin, rangeMax] = range;
          if (rangeMin > rangeMax) [rangeMin, rangeMax] = [rangeMax, rangeMin];
          const rangeInterval = rangeMax - rangeMin;
          if (!rangeInterval) return;
          const delta = (e.clientY - clientY) / height * rangeInterval;
          points[i] = prev.slice();
          points[i][1] = Math.min(rangeMax, Math.max(rangeMin, prev[1] - delta));

          if (next) {
            points[i + 1] = next.slice();
            points[i + 1][1] = Math.min(rangeMax, Math.max(rangeMin, next[1] - delta));
          }

          this.setState({
            points: points.slice()
          });
          this.object.setData({
            points: this.state.points
          });
        };

        const handleMouseUp = () => {
          this.mouseDown = false;
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      } else {
        const normalizedX = (e.clientX - left) / width;
        const {
          index: $point,
          point
        } = this.getInsertPoint(normalizedX * domain);
        const limits = [points[$point - 1][0] / domain * width + left, points[$point] ? points[$point][0] / domain * width + left : left + width];
        points.splice($point, 0, point);
        this.setState({
          points: points.slice()
        });
        this.object.setData({
          points: this.state.points
        });

        const handleMouseMove = e => {
          this.dragged = true;
          const clientX = Math.max(limits[0], Math.min(limits[1], e.clientX));
          const clientY = Math.max(top, Math.min(top + height, e.clientY));
          const normalized = [(clientX - left) / width, 1 - (clientY - top) / height];
          const [x, y] = this.denormalizePoint(...normalized);
          const point = [x, y, 0];
          points[$point] = point;
          this.setState({
            points: points.slice()
          });
          this.object.setData({
            points: this.state.points
          });
        };

        const handleMouseUp = () => {
          this.mouseDown = false;
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }
    });

    _defineProperty(this, "handleMouseDownCircle", e => {
      e.stopPropagation();
      this.dragged = false;
      const {
        points,
        domain
      } = this.state;
      const circle = e.currentTarget;
      const svg = circle.parentElement.parentElement;
      let {
        left,
        top,
        width,
        height
      } = svg.getBoundingClientRect();
      left += 0.05 * width;
      top += 0.05 * height;
      width *= 0.9;
      height *= 0.9;
      const i = +circle.getAttribute("values");
      const limits = [points[i - 1] ? points[i - 1][0] / domain * width + left : left, points[i + 1] ? points[i + 1][0] / domain * width + left : left + width];
      const [x, y] = this.normalizePoint(points[i][0], points[i][1]);
      const circleX = left + x * width;
      const circleY = top + (1 - y) * height;

      const handleMouseMove = e => {
        this.dragged = true;
        const clientX = Math.max(limits[0], Math.min(limits[1], e.shiftKey || Math.abs(circleX - e.clientX) > 5 ? e.clientX : circleX));
        const clientY = Math.max(top, Math.min(top + height, e.shiftKey || Math.abs(circleY - e.clientY) > 5 ? e.clientY : circleY));
        const normalized = [(clientX - left) / width, 1 - (clientY - top) / height];
        const [x, y] = this.denormalizePoint(...normalized);
        const point = [x, y, 0];
        points[i] = point;
        this.setState({
          points: points.slice()
        });
        this.object.setData({
          points: this.state.points
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });

    _defineProperty(this, "handleDoubleClickCircle", e => {
      e.stopPropagation();
      if (this.dragged) return;
      const circle = e.currentTarget;
      const i = +circle.getAttribute("values");
      const {
        points
      } = this.state;
      points.splice(i, 1);
      this.setState({
        points: points.slice()
      });
      this.object.setData({
        points: this.state.points
      });
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.box.on("rectChanged", this.handleResized);
    this.box.on("presentationRectChanged", this.handleResized);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.box.off("rectChanged", this.handleResized);
    this.box.off("presentationRectChanged", this.handleResized);
  }

  getInsertPoint(x, yIn) {
    let e = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    const {
      points
    } = this.state;
    let $point = 0;
    let prev = points[0];
    let next;

    while ($point < points.length) {
      next = points[$point];
      if (next[0] > x) break;
      prev = next;
      $point++;
    }

    if (prev === next) return {
      index: $point,
      point: [x, typeof yIn === "number" ? yIn : prev[1], e]
    };
    if (typeof yIn === "number") return {
      index: $point,
      point: [x, yIn, e]
    };
    const exponent = prev[2] || 0;
    const normalizedX = (x - prev[0]) / (next[0] - prev[0]);
    const normalizedY = _sdk__WEBPACK_IMPORTED_MODULE_0__.MathUtils.normExp(normalizedX, exponent);
    const y = prev[1] + normalizedY * (next[1] - prev[1]);
    return {
      index: $point,
      point: [x, y, e]
    };
  }

  get normalizedPoints() {
    const {
      domain,
      range,
      points
    } = this.state;
    let [rangeMin, rangeMax] = range;
    if (rangeMin > rangeMax) [rangeMin, rangeMax] = [rangeMax, rangeMin];
    const rangeInterval = rangeMax - rangeMin;
    return points.map(point => [point[0] / domain, rangeInterval ? (point[1] - rangeMin) / rangeInterval : 0.5]);
  }

  normalizePoint(x, y) {
    const {
      domain,
      range
    } = this.state;
    let [rangeMin, rangeMax] = range;
    if (rangeMin > rangeMax) [rangeMin, rangeMax] = [rangeMax, rangeMin];
    const rangeInterval = rangeMax - rangeMin;
    return [x / domain, rangeInterval ? (y - rangeMin) / rangeInterval : 0.5];
  }

  denormalizePoint(x, y) {
    const {
      domain,
      range
    } = this.state;
    let [rangeMin, rangeMax] = range;
    if (rangeMin > rangeMax) [rangeMin, rangeMax] = [rangeMax, rangeMin];
    const rangeInterval = rangeMax - rangeMin;
    return [x * domain, y * rangeInterval + rangeMin];
  }

  get font() {
    const {
      fontFace,
      fontSize,
      fontFamily
    } = this.state;
    return "".concat(fontFace === "regular" ? "" : fontFace, " ").concat(fontSize, "px ").concat(fontFamily, ", sans-serif");
  }

  render() {
    const {
      normalizedPoints,
      font,
      state
    } = this;
    const {
      domain,
      points,
      textColor,
      ghostPoint,
      lineColor,
      pointColor,
      bgColor
    } = state;
    const circles = [];
    const lines = [];
    const linesEvents = [];
    const texts = [];
    let prevX;
    let prevY;

    for (let i = 0; i < normalizedPoints.length; i++) {
      const point = normalizedPoints[i];
      const x = point[0] * 100 + "%";
      const y = (1 - point[1]) * 100 + "%";
      const textAnchor = point[0] < 0.5 ? "start" : "end";
      const textX = point[0] * 100 + (point[0] < 0.5 ? 2 : -2) + "%";
      const textY = (1 - point[1]) * 100 + (point[1] < 0.5 ? -1 : 4) + "%";
      const textStyle = {
        userSelect: "none",
        WebkitUserSelect: "none",
        pointerEvents: "none",
        font,
        // stylelint-disable-line font-family-no-missing-generic-family-keyword
        fill: textColor
      };
      circles.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("circle", {
        key: i,
        cx: x,
        cy: y,
        r: 4,
        values: "".concat(i),
        fill: pointColor,
        onMouseDown: this.handleMouseDownCircle,
        onDoubleClick: this.handleDoubleClickCircle
      }));
      texts.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("text", {
        textAnchor: textAnchor,
        key: "".concat(i, "_text"),
        x: textX,
        y: textY,
        style: textStyle
      }, "".concat(_sdk__WEBPACK_IMPORTED_MODULE_0__.MathUtils.round(points[i][0], 0.01), ", ").concat(_sdk__WEBPACK_IMPORTED_MODULE_0__.MathUtils.round(points[i][1], 0.01))));

      if (prevX && prevY) {
        lines.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("line", {
          key: "".concat(i - 1, "_line"),
          x1: prevX,
          y1: prevY,
          x2: x,
          y2: y,
          stroke: lineColor,
          strokeWidth: 2
        }));
        linesEvents.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("line", {
          key: "".concat(i - 1, "_events"),
          x1: prevX,
          y1: prevY,
          x2: x,
          y2: y,
          values: "".concat(i - 1),
          stroke: "transparent",
          strokeWidth: 10,
          onMouseDown: this.handleMouseDownLine,
          onMouseMove: this.handleMouseMoveLine
        }));
      }

      prevX = x;
      prevY = y;
    }

    let ghostCircle;

    if (ghostPoint) {
      const point = this.normalizePoint(ghostPoint[0], ghostPoint[1]);
      const x = point[0] * 100 + "%";
      const y = (1 - point[1]) * 100 + "%";
      ghostCircle = /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("circle", {
        key: "ghostPoint",
        cx: x,
        cy: y,
        r: 4,
        fill: pointColor,
        style: {
          opacity: 0.25,
          pointerEvents: "none"
        }
      });
    }

    if (points.length && points[points.length - 1][0] !== domain) {
      const i = points.length - 1;
      lines.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("line", {
        key: "".concat(i, "_line"),
        x1: prevX,
        y1: prevY,
        x2: "100%",
        y2: prevY,
        stroke: lineColor,
        strokeWidth: 2
      }));
      linesEvents.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("line", {
        key: "".concat(i, "_events"),
        x1: prevX,
        y1: prevY,
        x2: "100%",
        y2: prevY,
        values: "".concat(i),
        stroke: "transparent",
        strokeWidth: 10,
        onMouseDown: this.handleMouseDownLine,
        onMouseMove: this.handleMouseMoveLine
      }));
    }

    return /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI, _extends({}, this.props, {
      containerProps: {
        style: {
          height: "100%",
          width: "100%"
        }
      }
    }), /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("svg", {
      width: "100%",
      height: "100%",
      style: {
        backgroundColor: bgColor
      },
      onMouseMove: this.handleMouseMove,
      onDoubleClick: this.handleDoubleClick
    }, /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("g", {
      ref: this.refG,
      transform: "scale(0.95, 0.95)",
      style: {
        transformOrigin: "center"
      }
    }, texts, ghostCircle, lines, linesEvents, circles)));
  }

}

_defineProperty(BPFUI, "sizing", "both");

_defineProperty(BPFUI, "defaultSize", [450, 300]);

/***/ }),

/***/ "./src/ui/button.tsx":
/*!***************************!*\
  !*** ./src/ui/button.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ButtonUI)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class ButtonUI extends _sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", _objectSpread(_objectSpread({}, this.state), {}, {
      loading: false,
      text: this.props.object.data.text
    }));

    _defineProperty(this, "refSpan", _sdk__WEBPACK_IMPORTED_MODULE_0__.React.createRef());

    _defineProperty(this, "handleChanged", text => {});

    _defineProperty(this, "handleMouseDown", e => this.props.editing ? e.stopPropagation() : null);

    _defineProperty(this, "handleClickSpan", e => this.props.editing ? e.stopPropagation() : null);

    _defineProperty(this, "handleClick", e => {});

    _defineProperty(this, "handleKeyDown", e => {
      // propagate for parent for focus on boxUI
      if (!this.props.editing) return;

      if (e.key === "Enter") {
        e.preventDefault();
        return;
      }

      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    });

    _defineProperty(this, "handlePaste", e => {
      if (!this.props.editing) return;
      e.preventDefault();
      document.execCommand("insertHTML", false, e.clipboardData.getData("text/plain"));
    });
  }

  componentDidMount() {
    super.componentDidMount();
    if (this.props.editing) this.toggleEdit(this.props.editing);
  }

  componentDidUpdate(prevProps) {
    if (this.props.editing !== prevProps.editing) this.toggleEdit(this.props.editing);
  }

  toggleEdit(toggle) {
    const {
      editor,
      box
    } = this;
    if (editor.state.locked) return;
    if (!this.refSpan.current) return;
    const span = this.refSpan.current;

    if (toggle) {
      editor.selectOnly(box.id);
      this.setState({
        text: span.textContent
      }, () => {
        span.focus();
        _sdk__WEBPACK_IMPORTED_MODULE_0__.Utils.selectElementRange(span);
      });
    } else {
      window.getSelection().removeAllRanges();
      span.blur();
      this.setState({
        text: span.textContent
      });
      this.handleChanged(span.textContent);
    }
  }

  render() {
    const classArray = ["box-ui-button", "ui", "button", "compact", "mini"];
    return /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI, _extends({}, this.props, {
      additionalClassName: classArray.join(" "),
      containerProps: {
        onClick: this.handleClick
      }
    }), /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", {
      className: "box-ui-text-container"
    }, /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("span", {
      contentEditable: this.props.editing,
      className: "editable" + (this.props.editing ? " editing" : ""),
      ref: this.refSpan,
      onMouseDown: this.handleMouseDown,
      onClick: this.handleClickSpan,
      onPaste: this.handlePaste,
      onKeyDown: this.handleKeyDown,
      onBlur: this.props.onEditEnd,
      suppressContentEditableWarning: true
    }, this.state.text)));
  }

}

/***/ }),

/***/ "./src/ui/img.tsx":
/*!************************!*\
  !*** ./src/ui/img.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImgUI)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class ImgUI extends _sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", _objectSpread(_objectSpread({}, this.state), {}, {
      url: this.object._.url
    }));
  }

  render() {
    const {
      objectFit,
      objectPosition,
      scroll
    } = this.state;
    return /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI, this.props, /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("div", {
      style: {
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "block",
        overflow: "auto"
      }
    }, /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("img", {
      src: this.state.url,
      style: _objectSpread(_objectSpread({
        position: "absolute"
      }, scroll ? {} : {
        width: "100%",
        height: "100%"
      }), {}, {
        objectFit,
        objectPosition
      })
    })));
  }

}

_defineProperty(ImgUI, "sizing", "both");

_defineProperty(ImgUI, "defaultSize", [210, 90]);

/***/ }),

/***/ "./src/ui/keyboard.tsx":
/*!*****************************!*\
  !*** ./src/ui/keyboard.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KeyboardUI)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class KeyboardUI extends _sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", _objectSpread(_objectSpread({}, this.state), {}, {
      keys: this.object._.keys,
      selected: undefined
    }));

    _defineProperty(this, "mouseDown", false);

    _defineProperty(this, "touches", []);

    _defineProperty(this, "handleMouseDownKey", e => {
      const key = +e.currentTarget.getAttribute("values");

      if (this.state.mode === "touch") {
        if (this.state.keys[key]) return;
        this.touches[-1] = key;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.pageY - rect.top;
      const height = rect.height;
      const velocity = Math.min(127, ~~(y / height * 128)) || 1;
      this.object.keyTrigger(key, velocity);
      this.mouseDown = true;

      const handleMouseUp = () => {
        this.mouseDown = false;

        if (this.state.mode === "touch" && this.touches[-1]) {
          this.object.keyTrigger(this.touches[-1], 0);
          delete this.touches[-1];
        }

        this.setState({
          selected: undefined
        });
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mouseup", handleMouseUp);
    });

    _defineProperty(this, "handleMouseEnterKey", e => {
      if (!this.mouseDown) return;
      const key = +e.currentTarget.getAttribute("values");

      if (this.state.mode === "touch") {
        if (this.touches[-1] && this.touches[-1] !== key) {
          this.object.keyTrigger(this.touches[-1], 0);
          delete this.touches[-1];
        }

        if (this.state.keys[key]) return;
      }

      const rect = e.currentTarget.getBoundingClientRect();
      const y = e.pageY - rect.top;
      const height = rect.height;
      const velocity = Math.min(127, ~~(y / height * 128)) || 1;
      this.object.keyTrigger(key, velocity);
      if (this.state.mode === "touch") this.touches[-1] = key;
    });

    _defineProperty(this, "handleTouchStartKey", (e, keyIn) => {
      if (this.state.mode !== "touch") return;
      e.stopPropagation();
      const key = typeof keyIn === "number" ? keyIn : +e.currentTarget.getAttribute("values");
      Array.from(e.changedTouches).forEach(touch => {
        const {
          identifier: id
        } = touch;
        if (this.touches[id]) this.object.keyTrigger(this.touches[id], 0);
        this.touches[id] = key;
        const rect = e.currentTarget.getBoundingClientRect();
        const y = touch.pageY - rect.top;
        const height = rect.height;
        const velocity = Math.min(127, ~~(y / height * 128)) || 1;
        this.object.keyTrigger(key, velocity);
      });
    });

    _defineProperty(this, "handleTouchMoveKey", e => {
      if (this.state.mode !== "touch") return;
      e.stopPropagation();
      e.preventDefault();
      Array.from(e.changedTouches).forEach(touch => {
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target.parentElement !== e.currentTarget.parentElement) return;
        const key = +target.getAttribute("values");
        if (typeof key === "undefined") return;
        if (this.state.keys[key]) return;
        this.handleTouchStartKey(e, key);
      });
    });

    _defineProperty(this, "handleTouchEndKey", e => {
      if (this.state.mode !== "touch") return;
      e.stopPropagation();
      e.preventDefault();
      Array.from(e.changedTouches).forEach(touch => {
        const {
          identifier: id
        } = touch;
        if (this.touches[id]) this.object.keyTrigger(this.touches[id], 0);
        delete this.touches[id];
      });
    });
  }

  isBlack(key) {
    return KeyboardUI.blacks.indexOf(key % 12) !== -1;
  }

  get from() {
    if (this.isBlack(this.state.from)) return this.state.from - 1;
    return this.state.from;
  }

  get to() {
    if (this.isBlack(this.state.to)) return this.state.to + 1;
    return this.state.to;
  }

  get whiteCount() {
    const {
      to
    } = this;
    let {
      from
    } = this;
    if (from >= to) return 0;
    let count = 0;

    while (from <= to) {
      if (!this.isBlack(from++)) count++;
    }

    return count;
  }

  render() {
    const {
      from,
      to,
      whiteCount,
      state
    } = this;
    const {
      blackKeyColor,
      whiteKeyColor,
      keyOnColor,
      selectedColor,
      selected
    } = state;
    const whites = [];
    const blacks = [];
    const blackStyle = {
      fill: blackKeyColor,
      strokeWidth: 1,
      stroke: "black"
    };
    const whiteStyle = {
      fill: whiteKeyColor,
      strokeWidth: 1,
      stroke: "black"
    };
    const keyOnStyle = {
      fill: keyOnColor,
      strokeWidth: 1,
      stroke: "black"
    };
    const selectedStyle = {
      fill: selectedColor,
      strokeWidth: 1,
      stroke: "black"
    };
    const whiteWidthPercentage = 100 / whiteCount;
    const blackWidthPercentage = 100 / whiteCount * 2 / 3;
    const whiteWidth = "".concat(whiteWidthPercentage, "%");
    const blackWidth = "".concat(blackWidthPercentage, "%");
    let $white = 0;
    let key = from;

    while (key <= to) {
      const $key = key;
      const keyOn = +!!this.state.keys[$key];
      const commonProps = {
        key: $key,
        values: "".concat(key),
        onMouseDown: this.handleMouseDownKey,
        onMouseEnter: this.handleMouseEnterKey,
        onTouchStart: this.handleTouchStartKey,
        onTouchMove: this.handleTouchMoveKey,
        onTouchEnd: this.handleTouchEndKey
      };

      if (this.isBlack(key)) {
        const style = key === selected ? selectedStyle : keyOn ? keyOnStyle : blackStyle;
        const x = "".concat(($white - 1 / 3) * whiteWidthPercentage, "%");
        blacks.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("rect", _extends({
          x: x,
          y: 0,
          width: blackWidth,
          height: "70%",
          style: style
        }, commonProps)));
      } else {
        const style = key === selected ? selectedStyle : keyOn ? keyOnStyle : whiteStyle;
        const x = "".concat($white * whiteWidthPercentage, "%");
        whites.push( /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("rect", _extends({
          x: x,
          y: 0,
          width: whiteWidth,
          height: "100%",
          style: style
        }, commonProps)));
        $white++;
      }

      key++;
    }

    return /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI, _extends({}, this.props, {
      containerProps: {
        style: {
          height: "100%",
          width: "100%"
        }
      }
    }), /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("svg", {
      width: "100%",
      height: "100%",
      style: {
        touchAction: "none"
      }
    }, /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement("rect", {
      x: 0,
      y: 0,
      width: "100%",
      height: "100%",
      style: {
        fill: "transparent",
        strokeWidth: 2,
        stroke: "black"
      }
    }), whites, blacks));
  }

}

_defineProperty(KeyboardUI, "sizing", "both");

_defineProperty(KeyboardUI, "defaultSize", [450, 60]);

_defineProperty(KeyboardUI, "blacks", [1, 3, 6, 8, 10]);

/***/ }),

/***/ "./src/ui/menu.tsx":
/*!*************************!*\
  !*** ./src/ui/menu.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MenuUI)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const {
  Dropdown
} = _sdk__WEBPACK_IMPORTED_MODULE_0__.SemanticUI;
class MenuUI extends _sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", _objectSpread({}, this.state));

    _defineProperty(this, "handleChange", (event, data) => {
      const {
        value
      } = data;
      this.setState({
        value
      });
      this.object.outlet(0, value);
    });

    _defineProperty(this, "handleQuery", query => {
      const {
        options
      } = this.state;
      let value;

      if (typeof query === "number") {
        if (options[query]) {
          value = options[query].value;
        }
      } else if (typeof query === "string") {
        const found = options.find(o => o.text === query);

        if (found) {
          value = found.value;
        }
      } else if (_sdk__WEBPACK_IMPORTED_MODULE_0__.Utils.isNumberArray(query)) {
        value = query.filter(i => !!options[i]).map(i => options[i].value);
      } else {
        value = options.filter(o => query.indexOf(o.text) !== -1).map(o => o.value);
      }

      if (value) {
        this.setState({
          value
        });
        this.object.outlet(0, value);
      }
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.object.on("query", this.handleQuery);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.object.off("query", this.handleQuery);
  }

  render() {
    const {
      clearable,
      closeOnBlur,
      closeOnChange,
      closeOnEscape,
      deburr,
      defaultOpen,
      defaultValue,
      direction,
      disabled,
      error,
      lazyLoad,
      minCharacters,
      multiple,
      noResultsMessage,
      options,
      placeholder,
      scrolling,
      search,
      selectOnBlur,
      selectOnNavigation,
      simple,
      tabIndex,
      text,
      upward,
      wrapSelection,
      value
    } = this.state;
    const dropdownProps = {
      clearable,
      closeOnBlur,
      closeOnChange,
      closeOnEscape,
      deburr,
      defaultOpen,
      defaultValue,
      direction,
      disabled,
      error,
      lazyLoad,
      minCharacters,
      multiple,
      noResultsMessage,
      options,
      placeholder,
      scrolling,
      search,
      selectOnBlur,
      selectOnNavigation,
      simple,
      tabIndex,
      text,
      upward,
      wrapSelection,
      value
    };
    return /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement(_sdk__WEBPACK_IMPORTED_MODULE_0__.BaseUI, this.props, /*#__PURE__*/_sdk__WEBPACK_IMPORTED_MODULE_0__.React.createElement(Dropdown, _extends({}, dropdownProps, {
      selection: true,
      fluid: true,
      onChange: this.handleChange
    })));
  }

}

/***/ }),

/***/ "./src/ui/message.tsx":
/*!****************************!*\
  !*** ./src/ui/message.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageUI)
/* harmony export */ });
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./src/ui/button.tsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class MessageUI extends _button__WEBPACK_IMPORTED_MODULE_0__.default {
  constructor() {
    super(...arguments);

    _defineProperty(this, "handleChanged", text => this.object.handleUpdateArgs([text]));

    _defineProperty(this, "handleClick", e => {
      if (this.editor.state.locked) this.object.outlet(0, this.object._.buffer);
    });
  }

}

_defineProperty(MessageUI, "editableOnUnlock", true);

/***/ }),

/***/ "./src/ui/view.tsx":
/*!*************************!*\
  !*** ./src/ui/view.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ViewUI)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class ViewUI extends _sdk__WEBPACK_IMPORTED_MODULE_0__.DOMUI {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", _objectSpread(_objectSpread({}, this.state), {}, {
      children: this.object._.children
    }));
  }

}

/***/ }),

/***/ "./src/ui/waveform.tsx":
/*!*****************************!*\
  !*** ./src/ui/waveform.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WaveformUI)
/* harmony export */ });
/* harmony import */ var color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! color-js */ "./node_modules/color-js/color.js");
/* harmony import */ var color_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(color_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sdk */ "./src/sdk.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class WaveformUI extends _sdk__WEBPACK_IMPORTED_MODULE_1__.CanvasUI {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", _objectSpread(_objectSpread({}, this.state), {}, {
      audio: this.object._.audio
    }));
  }

  async paint() {
    const {
      interleaved,
      cursor,
      autoVerticalRange,
      verticalRange,
      viewRange,
      showStats,
      bgColor,
      cursorColor,
      phosphorColor,
      hueOffset,
      textColor,
      gridColor,
      seperatorColor,
      audioUnit,
      bpm,
      audio
    } = this.state;
    const {
      ctx
    } = this;
    const [width, height] = this.fullSize();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    if (!audio) return;
    const {
      audioBuffer,
      waveform,
      numberOfChannels,
      length,
      sampleRate
    } = audio;
    const t = audioBuffer.toArray();
    if (!t.length || !t[0].length) return; // View Range

    let [$0, $1] = viewRange || [0, length];
    if ($1 < $0) [$0, $1] = [$1, $0];
    const pixelsPerSamp = width / ($1 - $0);
    const sampsPerPixel = Math.max(1, Math.round(1 / pixelsPerSamp)); // Vertical Range

    let [yMin, yMax] = autoVerticalRange ? [-1, 1] : verticalRange;

    if (autoVerticalRange) {
      // Fastest way to get min and max to have: 1. max abs value for y scaling, 2. mean value for zero-crossing
      let i = numberOfChannels;
      let s = 0;

      while (i--) {
        let j = viewRange[1];

        while (j-- > viewRange[0]) {
          s = t[i][j];
          if (s < yMin) yMin = s;else if (s > yMax) yMax = s;
        }
      }

      const yFactor = Math.max(1, Math.abs(yMin), Math.abs(yMax));
      [yMin, yMax] = [-yFactor, yFactor];
    } else {
      if (yMax < yMin) [yMin, yMax] = [yMax, yMin];
    }

    const calcY = (v, i) => channelHeight * (+interleaved * i + 1 - (v - yMin) / (yMax - yMin)); // Grids


    const {
      ruler
    } = _sdk__WEBPACK_IMPORTED_MODULE_1__.Utils.getRuler(viewRange, audioUnit, {
      bpm,
      sampleRate
    });
    const gridChannels = interleaved ? numberOfChannels : 1;
    const channelHeight = height / gridChannels; // Vertical

    ctx.strokeStyle = gridColor;
    ctx.beginPath();

    for (const sampleIn in ruler) {
      const sample = +sampleIn;
      const x = (sample - $0 + 0.5) * pixelsPerSamp;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    ctx.stroke(); // Horizontal

    ctx.beginPath();
    const range = [18, 12, 6, 3, 0, -3, -6, -12, -18].filter(v => _sdk__WEBPACK_IMPORTED_MODULE_1__.MathUtils.dbtoa(v) < Math.max(Math.abs(yMin), Math.abs(yMax)));

    for (let i = 0; i < gridChannels; i++) {
      let y = calcY(0, i);
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);

      for (let j = 0; j < range.length; j++) {
        const a = _sdk__WEBPACK_IMPORTED_MODULE_1__.MathUtils.dbtoa(range[j]);

        if (a < yMax) {
          y = calcY(a, i);
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }

        if (a > yMin) {
          y = calcY(-a, i);
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
        }
      }
    }

    ctx.stroke(); // Seperator

    ctx.beginPath();
    ctx.setLineDash([4, 2]);
    ctx.strokeStyle = seperatorColor;

    for (let i = 1; i < gridChannels; i++) {
      ctx.moveTo(0, i * channelHeight);
      ctx.lineTo(width, i * channelHeight);
    }

    ctx.stroke();
    ctx.setLineDash([]); // Iteration

    ctx.lineWidth = 1;
    const channelColor = [];
    const currentWaveform = waveform.findStep(sampsPerPixel);

    for (let i = 0; i < numberOfChannels; i++) {
      if (interleaved) {
        ctx.save();
        const clip = new Path2D();
        clip.rect(0, i * channelHeight, width, channelHeight);
        ctx.clip(clip);
      }

      ctx.beginPath();
      channelColor[i] = color_js__WEBPACK_IMPORTED_MODULE_0__(phosphorColor).shiftHue(i * hueOffset).toHSL();
      ctx.strokeStyle = channelColor[i];
      ctx.fillStyle = channelColor[i];

      if (currentWaveform) {
        const sampsPerPixel = 1 / pixelsPerSamp;
        const {
          idx
        } = currentWaveform;
        const {
          min,
          max
        } = currentWaveform[i];
        let x = 0;
        let maxInStep;
        let minInStep;

        for (let j = 0; j < idx.length - 1; j++) {
          const $ = idx[j];
          if ($ > $1) break;
          const $next = j === idx.length - 1 ? length : idx[j + 1];
          if ($next <= $0) continue;

          if (typeof maxInStep === "undefined") {
            maxInStep = max[j];
            minInStep = min[j];
          } else {
            if (min[j] < minInStep) minInStep = min[j];
            if (max[j] > maxInStep) maxInStep = max[j];
          }

          if ($next >= $0 + sampsPerPixel * (x + 1)) {
            let y = calcY(maxInStep, i);
            if (x === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);

            if (minInStep !== maxInStep) {
              y = calcY(minInStep, i);
              ctx.lineTo(x, y);
            }

            maxInStep = undefined;
            x++;
          }
        }
      } else {
        let maxInStep;
        let minInStep;
        const prev = t[i][$0 - 1] || 0;
        const prevX = -0.5 * pixelsPerSamp;
        const prevY = calcY(prev, i);
        ctx.moveTo(prevX, prevY);

        for (let j = $0; j < $1; j++) {
          const samp = t[i][j];
          const $step = (j - $0) % sampsPerPixel;

          if ($step === 0) {
            maxInStep = samp;
            minInStep = samp;
          } else {
            if (samp > maxInStep) maxInStep = samp;
            if (samp < minInStep) minInStep = samp;
          }

          if ($step === sampsPerPixel - 1) {
            const x = (j - $step - $0 + 0.5) * pixelsPerSamp;
            let y = calcY(maxInStep, i);
            ctx.lineTo(x, y);

            if (minInStep !== maxInStep && pixelsPerSamp < 1) {
              y = calcY(minInStep, i);
              ctx.lineTo(x, y);
            }

            if (pixelsPerSamp > 10) ctx.fillRect(x - 2, y - 2, 4, 4);
          }
        }

        const next = t[i][$1] || 0;
        const nextX = ($1 - $0 + 0.5) * pixelsPerSamp;
        const nextY = calcY(next, i);
        ctx.lineTo(nextX, nextY);
      }

      ctx.stroke();
      if (interleaved) ctx.restore();
    } // cursor


    if (cursor > $0 && cursor < $1) {
      ctx.strokeStyle = cursorColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const cursorX = (cursor - $0) / ($1 - $0) * width;
      ctx.moveTo(cursorX, 0);
      ctx.lineTo(cursorX, height);
      ctx.stroke();
    } // Stats


    if (showStats) {
      ctx.font = "bold 12px Consolas, monospace";
      ctx.fillStyle = textColor;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(yMax.toFixed(2), 2, 2);
      ctx.textBaseline = "bottom";
      ctx.fillText(yMax.toFixed(2), 2, height - 2);
    }
  }

  componentDidMount() {
    var _this$state$audio;

    const {
      bgColor
    } = this.state;
    const ctx = this.ctx;
    if (!ctx) return;
    const [width, height] = this.fullSize(); // Background

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    (_this$state$audio = this.state.audio) === null || _this$state$audio === void 0 ? void 0 : _this$state$audio.on("changed", this.schedulePaint);
    super.componentDidMount();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.audio !== this.state.audio) {
      var _prevState$audio, _this$state$audio2;

      (_prevState$audio = prevState.audio) === null || _prevState$audio === void 0 ? void 0 : _prevState$audio.off("changed", this.schedulePaint);
      (_this$state$audio2 = this.state.audio) === null || _this$state$audio2 === void 0 ? void 0 : _this$state$audio2.on("changed", this.schedulePaint);
    }

    super.componentDidUpdate(prevProps, prevState);
  }

  componentWillUnmount() {
    var _this$state$audio3;

    (_this$state$audio3 = this.state.audio) === null || _this$state$audio3 === void 0 ? void 0 : _this$state$audio3.off("changed", this.schedulePaint);
    super.componentWillUnmount();
  }

}

_defineProperty(WaveformUI, "defaultSize", [120, 60]);

/***/ }),

/***/ "./node_modules/call-bind/callBound.js":
/*!*********************************************!*\
  !*** ./node_modules/call-bind/callBound.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var callBind = __webpack_require__(/*! ./ */ "./node_modules/call-bind/index.js");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "./node_modules/call-bind/index.js":
/*!*****************************************!*\
  !*** ./node_modules/call-bind/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ "./node_modules/color-js/color.js":
/*!****************************************!*\
  !*** ./node_modules/color-js/color.js ***!
  \****************************************/
/***/ ((module) => {

// Copyright (c) 2008-2013, Andrew Brehaut, Tim Baumann, Matt Wilson, 
//                          Simon Heimler, Michel Vielmetter 
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// * Redistributions of source code must retain the above copyright notice,
//   this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright notice,
//   this list of conditions and the following disclaimer in the documentation
//   and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

// color.js - version 1.0.1
//
// HSV <-> RGB code based on code from http://www.cs.rit.edu/~ncs/color/t_convert.html
// object function created by Douglas Crockford.
// Color scheme degrees taken from the colorjack.com colorpicker
//
// HSL support kindly provided by Tim Baumann - http://github.com/timjb

// create namespaces
/*global net */
if ("undefined" == typeof net) {
    var net = {};
}
if (!net.brehaut) {
    net.brehaut = {};
}

// this module function is called with net.brehaut as 'this'
(function() {
    "use strict";
    // Constants

    // css_colors maps color names onto their hex values
    // these names are defined by W3C
    
    var css_colors = {aliceblue:'#F0F8FF',antiquewhite:'#FAEBD7',aqua:'#00FFFF',aquamarine:'#7FFFD4',azure:'#F0FFFF',beige:'#F5F5DC',bisque:'#FFE4C4',black:'#000000',blanchedalmond:'#FFEBCD',blue:'#0000FF',blueviolet:'#8A2BE2',brown:'#A52A2A',burlywood:'#DEB887',cadetblue:'#5F9EA0',chartreuse:'#7FFF00',chocolate:'#D2691E',coral:'#FF7F50',cornflowerblue:'#6495ED',cornsilk:'#FFF8DC',crimson:'#DC143C',cyan:'#00FFFF',darkblue:'#00008B',darkcyan:'#008B8B',darkgoldenrod:'#B8860B',darkgray:'#A9A9A9',darkgrey:'#A9A9A9',darkgreen:'#006400',darkkhaki:'#BDB76B',darkmagenta:'#8B008B',darkolivegreen:'#556B2F',darkorange:'#FF8C00',darkorchid:'#9932CC',darkred:'#8B0000',darksalmon:'#E9967A',darkseagreen:'#8FBC8F',darkslateblue:'#483D8B',darkslategray:'#2F4F4F',darkslategrey:'#2F4F4F',darkturquoise:'#00CED1',darkviolet:'#9400D3',deeppink:'#FF1493',deepskyblue:'#00BFFF',dimgray:'#696969',dimgrey:'#696969',dodgerblue:'#1E90FF',firebrick:'#B22222',floralwhite:'#FFFAF0',forestgreen:'#228B22',fuchsia:'#FF00FF',gainsboro:'#DCDCDC',ghostwhite:'#F8F8FF',gold:'#FFD700',goldenrod:'#DAA520',gray:'#808080',grey:'#808080',green:'#008000',greenyellow:'#ADFF2F',honeydew:'#F0FFF0',hotpink:'#FF69B4',indianred:'#CD5C5C',indigo:'#4B0082',ivory:'#FFFFF0',khaki:'#F0E68C',lavender:'#E6E6FA',lavenderblush:'#FFF0F5',lawngreen:'#7CFC00',lemonchiffon:'#FFFACD',lightblue:'#ADD8E6',lightcoral:'#F08080',lightcyan:'#E0FFFF',lightgoldenrodyellow:'#FAFAD2',lightgray:'#D3D3D3',lightgrey:'#D3D3D3',lightgreen:'#90EE90',lightpink:'#FFB6C1',lightsalmon:'#FFA07A',lightseagreen:'#20B2AA',lightskyblue:'#87CEFA',lightslategray:'#778899',lightslategrey:'#778899',lightsteelblue:'#B0C4DE',lightyellow:'#FFFFE0',lime:'#00FF00',limegreen:'#32CD32',linen:'#FAF0E6',magenta:'#FF00FF',maroon:'#800000',mediumaquamarine:'#66CDAA',mediumblue:'#0000CD',mediumorchid:'#BA55D3',mediumpurple:'#9370D8',mediumseagreen:'#3CB371',mediumslateblue:'#7B68EE',mediumspringgreen:'#00FA9A',mediumturquoise:'#48D1CC',mediumvioletred:'#C71585',midnightblue:'#191970',mintcream:'#F5FFFA',mistyrose:'#FFE4E1',moccasin:'#FFE4B5',navajowhite:'#FFDEAD',navy:'#000080',oldlace:'#FDF5E6',olive:'#808000',olivedrab:'#6B8E23',orange:'#FFA500',orangered:'#FF4500',orchid:'#DA70D6',palegoldenrod:'#EEE8AA',palegreen:'#98FB98',paleturquoise:'#AFEEEE',palevioletred:'#D87093',papayawhip:'#FFEFD5',peachpuff:'#FFDAB9',peru:'#CD853F',pink:'#FFC0CB',plum:'#DDA0DD',powderblue:'#B0E0E6',purple:'#800080',rebeccapurple:'#663399',red:'#FF0000',rosybrown:'#BC8F8F',royalblue:'#4169E1',saddlebrown:'#8B4513',salmon:'#FA8072',sandybrown:'#F4A460',seagreen:'#2E8B57',seashell:'#FFF5EE',sienna:'#A0522D',silver:'#C0C0C0',skyblue:'#87CEEB',slateblue:'#6A5ACD',slategray:'#708090',slategrey:'#708090',snow:'#FFFAFA',springgreen:'#00FF7F',steelblue:'#4682B4',tan:'#D2B48C',teal:'#008080',thistle:'#D8BFD8',tomato:'#FF6347',turquoise:'#40E0D0',violet:'#EE82EE',wheat:'#F5DEB3',white:'#FFFFFF',whitesmoke:'#F5F5F5',yellow:'#FFFF00',yellowgreen:'#9ACD32'};


    // CSS value regexes, according to http://www.w3.org/TR/css3-values/
    var css_integer = '(?:\\+|-)?\\d+';
    var css_float = '(?:\\+|-)?\\d*\\.\\d+';
    var css_number = '(?:' + css_integer + ')|(?:' + css_float + ')';
    css_integer = '(' + css_integer + ')';
    css_float = '(' + css_float + ')';
    css_number = '(' + css_number + ')';
    var css_percentage = css_number + '%';
    var css_whitespace = '\\s*?';

    // http://www.w3.org/TR/2003/CR-css3-color-20030514/
    var hsl_hsla_regex = new RegExp([
        '^hsl(a?)\\(', css_number, ',', css_percentage, ',', css_percentage, '(,(', css_number, '))?\\)$'
    ].join(css_whitespace));
    var rgb_rgba_integer_regex = new RegExp([
        '^rgb(a?)\\(', css_integer, ',', css_integer, ',', css_integer, '(,(', css_number, '))?\\)$'
    ].join(css_whitespace));
    var rgb_rgba_percentage_regex = new RegExp([
        '^rgb(a?)\\(', css_percentage, ',', css_percentage, ',', css_percentage, '(,(', css_number, '))?\\)$'
    ].join(css_whitespace));

    // Package wide variables

    // becomes the top level prototype object
    var color;

    /* registered_models contains the template objects for all the
     * models that have been registered for the color class.
     */
    var registered_models = [];


    /* factories contains methods to create new instance of
     * different color models that have been registered.
     */
    var factories = {};

    // Utility functions

    /* object is Douglas Crockfords object function for prototypal
     * inheritance.
     */
    if (!this.object) {
        this.object = function(o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }
    var object = this.object;

    /* takes a value, converts to string if need be, then pads it
     * to a minimum length.
     */
    function pad(val, len) {
        val = val.toString();
        var padded = [];

        for (var i = 0, j = Math.max(len - val.length, 0); i < j; i++) {
            padded.push('0');
        }

        padded.push(val);
        return padded.join('');
    }


    /* takes a string and returns a new string with the first letter
     * capitalised
     */
    function capitalise(s) {
        return s.slice(0, 1).toUpperCase() + s.slice(1);
    }

    /* removes leading and trailing whitespace
     */
    function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    /* used to apply a method to object non-destructively by
     * cloning the object and then apply the method to that
     * new object
     */
    function cloneOnApply(meth) {
        return function() {
            var cloned = this.clone();
            meth.apply(cloned, arguments);
            return cloned;
        };
    }


    /* registerModel is used to add additional representations
     * to the color code, and extend the color API with the new
     * operation that model provides. see before for examples
     */
    function registerModel(name, model) {
        var proto = object(color);
        var fields = []; // used for cloning and generating accessors

        var to_meth = 'to' + capitalise(name);

        function convertAndApply(meth) {
            return function() {
                return meth.apply(this[to_meth](), arguments);
            };
        }

        for (var key in model)
            if (model.hasOwnProperty(key)) {
                proto[key] = model[key];
                var prop = proto[key];

                if (key.slice(0, 1) == '_') {
                    continue;
                }
                if (!(key in color) && "function" == typeof prop) {
                    // the method found on this object is a) public and b) not
                    // currently supported by the color object. Create an impl that
                    // calls the toModel function and passes that new object
                    // onto the correct method with the args.
                    color[key] = convertAndApply(prop);
                } else if ("function" != typeof prop) {
                    // we have found a public property. create accessor methods
                    // and bind them up correctly
                    fields.push(key);
                    var getter = 'get' + capitalise(key);
                    var setter = 'set' + capitalise(key);

                    color[getter] = convertAndApply(
                        proto[getter] = (function(key) {
                            return function() {
                                return this[key];
                            };
                        })(key)
                    );

                    color[setter] = convertAndApply(
                        proto[setter] = (function(key) {
                            return function(val) {
                                var cloned = this.clone();
                                cloned[key] = val;
                                return cloned;
                            };
                        })(key)
                    );
                }
            } // end of for over model

            // a method to create a new object - largely so prototype chains dont
            // get insane. This uses an unrolled 'object' so that F is cached
            // for later use. this is approx a 25% speed improvement

        function F() {}
        F.prototype = proto;

        function factory() {
            return new F();
        }
        factories[name] = factory;

        proto.clone = function() {
            var cloned = factory();
            for (var i = 0, j = fields.length; i < j; i++) {
                var key = fields[i];
                cloned[key] = this[key];
            }
            return cloned;
        };

        color[to_meth] = function() {
            return factory();
        };

        registered_models.push(proto);

        return proto;
    } // end of registerModel

    // Template Objects

    /* color is the root object in the color hierarchy. It starts
     * life as a very simple object, but as color models are
     * registered it has methods programmatically added to manage
     * conversions as needed.
     */
    color = {
        /* fromObject takes an argument and delegates to the internal
         * color models to try to create a new instance.
         */
        fromObject: function(o) {
            if (!o) {
                return object(color);
            }

            for (var i = 0, j = registered_models.length; i < j; i++) {
                var nu = registered_models[i].fromObject(o);
                if (nu) {
                    return nu;
                }
            }

            return object(color);
        },

        toString: function() {
            return this.toCSS();
        }
    };

    var transparent = null; // defined with an RGB later.

    /* RGB is the red green blue model. This definition is converted
     * to a template object by registerModel.
     */
    registerModel('RGB', {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0,

        /* getLuminance returns a value between 0 and 1, this is the
         * luminance calcuated according to
         * http://www.poynton.com/notes/colour_and_gamma/ColorFAQ.html#RTFToC9
         */
        getLuminance: function() {
            return (this.red * 0.2126) + (this.green * 0.7152) + (this.blue * 0.0722);
        },

        /* does an alpha based blend of color onto this. alpha is the
         * amount of 'color' to use. (0 to 1)
         */
        blend: function(color, alpha) {
            color = color.toRGB();
            alpha = Math.min(Math.max(alpha, 0), 1);
            var rgb = this.clone();

            rgb.red = (rgb.red * (1 - alpha)) + (color.red * alpha);
            rgb.green = (rgb.green * (1 - alpha)) + (color.green * alpha);
            rgb.blue = (rgb.blue * (1 - alpha)) + (color.blue * alpha);
            rgb.alpha = (rgb.alpha * (1 - alpha)) + (color.alpha * alpha);

            return rgb;
        },

        /* fromObject attempts to convert an object o to and RGB
         * instance. This accepts an object with red, green and blue
         * members or a string. If the string is a known CSS color name
         * or a hexdecimal string it will accept it.
         */
        fromObject: function(o) {
            if (o instanceof Array) {
                return this._fromRGBArray(o);
            }
            if ("string" == typeof o) {
                return this._fromCSS(trim(o));
            }
            if (o.hasOwnProperty('red') &&
                o.hasOwnProperty('green') &&
                o.hasOwnProperty('blue')) {
                return this._fromRGB(o);
            }
            // nothing matchs, not an RGB object
        },

        _stringParsers: [
            // CSS RGB(A) literal:
            function(css) {
                css = trim(css);

                var withInteger = match(rgb_rgba_integer_regex, 255);
                if (withInteger) {
                    return withInteger;
                }
                return match(rgb_rgba_percentage_regex, 100);

                function match(regex, max_value) {
                    var colorGroups = css.match(regex);

                    // If there is an "a" after "rgb", there must be a fourth parameter and the other way round
                    if (!colorGroups || (!!colorGroups[1] + !!colorGroups[5] === 1)) {
                        return null;
                    }

                    var rgb = factories.RGB();
                    rgb.red = Math.min(1, Math.max(0, colorGroups[2] / max_value));
                    rgb.green = Math.min(1, Math.max(0, colorGroups[3] / max_value));
                    rgb.blue = Math.min(1, Math.max(0, colorGroups[4] / max_value));
                    rgb.alpha = !!colorGroups[5] ? Math.min(Math.max(parseFloat(colorGroups[6]), 0), 1) : 1;

                    return rgb;
                }
            },

            function(css) {
                var lower = css.toLowerCase();
                if (lower in css_colors) {
                    css = css_colors[lower];
                }

                if (!css.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)) {
                    return;
                }

                css = css.replace(/^#/, '');

                var bytes = css.length / 3;

                var max = Math.pow(16, bytes) - 1;

                var rgb = factories.RGB();
                rgb.red = parseInt(css.slice(0, bytes), 16) / max;
                rgb.green = parseInt(css.slice(bytes * 1, bytes * 2), 16) / max;
                rgb.blue = parseInt(css.slice(bytes * 2), 16) / max;
                rgb.alpha = 1;
                return rgb;
            },

            function(css) {
                if (css.toLowerCase() !== 'transparent') return;

                return transparent;
            }
        ],

        _fromCSS: function(css) {
            var color = null;
            for (var i = 0, j = this._stringParsers.length; i < j; i++) {
                color = this._stringParsers[i](css);
                if (color) return color;
            }
        },

        _fromRGB: function(RGB) {
            var newRGB = factories.RGB();

            newRGB.red = RGB.red;
            newRGB.green = RGB.green;
            newRGB.blue = RGB.blue;
            newRGB.alpha = RGB.hasOwnProperty('alpha') ? RGB.alpha : 1;

            return newRGB;
        },

        _fromRGBArray: function(RGB) {
            var newRGB = factories.RGB();

            newRGB.red = Math.max(0, Math.min(1, RGB[0] / 255));
            newRGB.green = Math.max(0, Math.min(1, RGB[1] / 255));
            newRGB.blue = Math.max(0, Math.min(1, RGB[2] / 255));
            newRGB.alpha = RGB[3] !== undefined ? Math.max(0, Math.min(1, RGB[3])) : 1;

            return newRGB;
        },

        // convert to a CSS string. defaults to two bytes a value
        toCSSHex: function(bytes) {
            bytes = bytes || 2;

            var max = Math.pow(16, bytes) - 1;
            var css = [
                "#",
                pad(Math.round(this.red * max).toString(16).toUpperCase(), bytes),
                pad(Math.round(this.green * max).toString(16).toUpperCase(), bytes),
                pad(Math.round(this.blue * max).toString(16).toUpperCase(), bytes)
            ];

            return css.join('');
        },

        toCSS: function(bytes) {
            if (this.alpha === 1) return this.toCSSHex(bytes);

            var max = 255;

            var components = [
                'rgba(',
                Math.max(0, Math.min(max, Math.round(this.red * max))), ',',
                Math.max(0, Math.min(max, Math.round(this.green * max))), ',',
                Math.max(0, Math.min(max, Math.round(this.blue * max))), ',',
                Math.max(0, Math.min(1, this.alpha)),
                ')'
            ];

            return components.join('');
        },

        toHSV: function() {
            var hsv = factories.HSV();
            var min, max, delta;

            min = Math.min(this.red, this.green, this.blue);
            max = Math.max(this.red, this.green, this.blue);
            hsv.value = max; // v

            delta = max - min;

            if (delta == 0) { // white, grey, black
                hsv.hue = hsv.saturation = 0;
            } else { // chroma
                hsv.saturation = delta / max;

                if (this.red == max) {
                    hsv.hue = (this.green - this.blue) / delta; // between yellow & magenta
                } else if (this.green == max) {
                    hsv.hue = 2 + (this.blue - this.red) / delta; // between cyan & yellow
                } else {
                    hsv.hue = 4 + (this.red - this.green) / delta; // between magenta & cyan
                }

                hsv.hue = ((hsv.hue * 60) + 360) % 360; // degrees
            }

            hsv.alpha = this.alpha;

            return hsv;
        },
        toHSL: function() {
            return this.toHSV().toHSL();
        },

        toRGB: function() {
            return this.clone();
        }
    });

    transparent = color.fromObject({
        red: 0,
        blue: 0,
        green: 0,
        alpha: 0
    });


    /* Like RGB above, this object describes what will become the HSV
     * template object. This model handles hue, saturation and value.
     * hue is the number of degrees around the color wheel, saturation
     * describes how much color their is and value is the brightness.
     */
    registerModel('HSV', {
        hue: 0,
        saturation: 0,
        value: 1,
        alpha: 1,

        shiftHue: cloneOnApply(function(degrees) {
            var hue = (this.hue + degrees) % 360;
            if (hue < 0) {
                hue = (360 + hue) % 360;
            }

            this.hue = hue;
        }),

        devalueByAmount: cloneOnApply(function(val) {
            this.value = Math.min(1, Math.max(this.value - val, 0));
        }),

        devalueByRatio: cloneOnApply(function(val) {
            this.value = Math.min(1, Math.max(this.value * (1 - val), 0));
        }),

        valueByAmount: cloneOnApply(function(val) {
            this.value = Math.min(1, Math.max(this.value + val, 0));
        }),

        valueByRatio: cloneOnApply(function(val) {
            this.value = Math.min(1, Math.max(this.value * (1 + val), 0));
        }),

        desaturateByAmount: cloneOnApply(function(val) {
            this.saturation = Math.min(1, Math.max(this.saturation - val, 0));
        }),

        desaturateByRatio: cloneOnApply(function(val) {
            this.saturation = Math.min(1, Math.max(this.saturation * (1 - val), 0));
        }),

        saturateByAmount: cloneOnApply(function(val) {
            this.saturation = Math.min(1, Math.max(this.saturation + val, 0));
        }),

        saturateByRatio: cloneOnApply(function(val) {
            this.saturation = Math.min(1, Math.max(this.saturation * (1 + val), 0));
        }),

        schemeFromDegrees: function(degrees) {
            var newColors = [];
            for (var i = 0, j = degrees.length; i < j; i++) {
                var col = this.clone();
                col.hue = (this.hue + degrees[i]) % 360;
                newColors.push(col);
            }
            return newColors;
        },

        complementaryScheme: function() {
            return this.schemeFromDegrees([0, 180]);
        },

        splitComplementaryScheme: function() {
            return this.schemeFromDegrees([0, 150, 320]);
        },

        splitComplementaryCWScheme: function() {
            return this.schemeFromDegrees([0, 150, 300]);
        },

        splitComplementaryCCWScheme: function() {
            return this.schemeFromDegrees([0, 60, 210]);
        },

        triadicScheme: function() {
            return this.schemeFromDegrees([0, 120, 240]);
        },

        clashScheme: function() {
            return this.schemeFromDegrees([0, 90, 270]);
        },

        tetradicScheme: function() {
            return this.schemeFromDegrees([0, 90, 180, 270]);
        },

        fourToneCWScheme: function() {
            return this.schemeFromDegrees([0, 60, 180, 240]);
        },

        fourToneCCWScheme: function() {
            return this.schemeFromDegrees([0, 120, 180, 300]);
        },

        fiveToneAScheme: function() {
            return this.schemeFromDegrees([0, 115, 155, 205, 245]);
        },

        fiveToneBScheme: function() {
            return this.schemeFromDegrees([0, 40, 90, 130, 245]);
        },

        fiveToneCScheme: function() {
            return this.schemeFromDegrees([0, 50, 90, 205, 320]);
        },

        fiveToneDScheme: function() {
            return this.schemeFromDegrees([0, 40, 155, 270, 310]);
        },

        fiveToneEScheme: function() {
            return this.schemeFromDegrees([0, 115, 230, 270, 320]);
        },

        sixToneCWScheme: function() {
            return this.schemeFromDegrees([0, 30, 120, 150, 240, 270]);
        },

        sixToneCCWScheme: function() {
            return this.schemeFromDegrees([0, 90, 120, 210, 240, 330]);
        },

        neutralScheme: function() {
            return this.schemeFromDegrees([0, 15, 30, 45, 60, 75]);
        },

        analogousScheme: function() {
            return this.schemeFromDegrees([0, 30, 60, 90, 120, 150]);
        },

        fromObject: function(o) {
            if (o.hasOwnProperty('hue') &&
                o.hasOwnProperty('saturation') &&
                o.hasOwnProperty('value')) {
                var hsv = factories.HSV();

                hsv.hue = o.hue;
                hsv.saturation = o.saturation;
                hsv.value = o.value;
                hsv.alpha = o.hasOwnProperty('alpha') ? o.alpha : 1;

                return hsv;
            }
            // nothing matches, not an HSV object
            return null;
        },

        _normalise: function() {
            this.hue %= 360;
            this.saturation = Math.min(Math.max(0, this.saturation), 1);
            this.value = Math.min(Math.max(0, this.value));
            this.alpha = Math.min(1, Math.max(0, this.alpha));
        },

        toRGB: function() {
            this._normalise();

            var rgb = factories.RGB();
            var i;
            var f, p, q, t;

            if (this.saturation === 0) {
                // achromatic (grey)
                rgb.red = this.value;
                rgb.green = this.value;
                rgb.blue = this.value;
                rgb.alpha = this.alpha;
                return rgb;
            }

            var h = this.hue / 60; // sector 0 to 5
            i = Math.floor(h);
            f = h - i; // factorial part of h
            p = this.value * (1 - this.saturation);
            q = this.value * (1 - this.saturation * f);
            t = this.value * (1 - this.saturation * (1 - f));

            switch (i) {
                case 0:
                    rgb.red = this.value;
                    rgb.green = t;
                    rgb.blue = p;
                    break;
                case 1:
                    rgb.red = q;
                    rgb.green = this.value;
                    rgb.blue = p;
                    break;
                case 2:
                    rgb.red = p;
                    rgb.green = this.value;
                    rgb.blue = t;
                    break;
                case 3:
                    rgb.red = p;
                    rgb.green = q;
                    rgb.blue = this.value;
                    break;
                case 4:
                    rgb.red = t;
                    rgb.green = p;
                    rgb.blue = this.value;
                    break;
                default: // case 5:
                    rgb.red = this.value;
                    rgb.green = p;
                    rgb.blue = q;
                    break;
            }

            rgb.alpha = this.alpha;

            return rgb;
        },
        toHSL: function() {
            this._normalise();

            var hsl = factories.HSL();

            hsl.hue = this.hue;
            var l = (2 - this.saturation) * this.value,
                s = this.saturation * this.value;
            if (l && 2 - l) {
                s /= (l <= 1) ? l : 2 - l;
            }
            l /= 2;
            hsl.saturation = s;
            hsl.lightness = l;
            hsl.alpha = this.alpha;

            return hsl;
        },

        toHSV: function() {
            return this.clone();
        }
    });

    registerModel('HSL', {
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 1,

        darkenByAmount: cloneOnApply(function(val) {
            this.lightness = Math.min(1, Math.max(this.lightness - val, 0));
        }),

        darkenByRatio: cloneOnApply(function(val) {
            this.lightness = Math.min(1, Math.max(this.lightness * (1 - val), 0));
        }),

        lightenByAmount: cloneOnApply(function(val) {
            this.lightness = Math.min(1, Math.max(this.lightness + val, 0));
        }),

        lightenByRatio: cloneOnApply(function(val) {
            this.lightness = Math.min(1, Math.max(this.lightness * (1 + val), 0));
        }),

        fromObject: function(o) {
            if ("string" == typeof o) {
                return this._fromCSS(o);
            }
            if (o.hasOwnProperty('hue') &&
                o.hasOwnProperty('saturation') &&
                o.hasOwnProperty('lightness')) {
                return this._fromHSL(o);
            }
            // nothing matchs, not an RGB object
        },

        _fromCSS: function(css) {
            var colorGroups = trim(css).match(hsl_hsla_regex);

            // if there is an "a" after "hsl", there must be a fourth parameter and the other way round
            if (!colorGroups || (!!colorGroups[1] + !!colorGroups[5] === 1)) {
                return null;
            }

            var hsl = factories.HSL();
            hsl.hue = (colorGroups[2] % 360 + 360) % 360;
            hsl.saturation = Math.max(0, Math.min(parseInt(colorGroups[3], 10) / 100, 1));
            hsl.lightness = Math.max(0, Math.min(parseInt(colorGroups[4], 10) / 100, 1));
            hsl.alpha = !!colorGroups[5] ? Math.max(0, Math.min(1, parseFloat(colorGroups[6]))) : 1;

            return hsl;
        },

        _fromHSL: function(HSL) {
            var newHSL = factories.HSL();

            newHSL.hue = HSL.hue;
            newHSL.saturation = HSL.saturation;
            newHSL.lightness = HSL.lightness;

            newHSL.alpha = HSL.hasOwnProperty('alpha') ? HSL.alpha : 1;

            return newHSL;
        },

        _normalise: function() {
            this.hue = (this.hue % 360 + 360) % 360;
            this.saturation = Math.min(Math.max(0, this.saturation), 1);
            this.lightness = Math.min(Math.max(0, this.lightness));
            this.alpha = Math.min(1, Math.max(0, this.alpha));
        },

        toHSL: function() {
            return this.clone();
        },
        toHSV: function() {
            this._normalise();

            var hsv = factories.HSV();

            // http://ariya.blogspot.com/2008/07/converting-between-hsl-and-hsv.html
            hsv.hue = this.hue; // H
            var l = 2 * this.lightness,
                s = this.saturation * ((l <= 1) ? l : 2 - l);
            hsv.value = (l + s) / 2; // V
            hsv.saturation = ((2 * s) / (l + s)) || 0; // S
            hsv.alpha = this.alpha;

            return hsv;
        },
        toRGB: function() {
            return this.toHSV().toRGB();
        }
    });

    // Package specific exports

    /* the Color function is a factory for new color objects.
     */
    function Color(o) {
        return color.fromObject(o);
    }
    Color.isValid = function(str) {
        var key, c = Color(str);

        var length = 0;
        for (key in c) {
            if (c.hasOwnProperty(key)) {
                length++;
            }
        }

        return length > 0;
    };
    net.brehaut.Color = Color;
}).call(net.brehaut);

/* Export to CommonJS
 */
if (true) {
    module.exports = net.brehaut.Color;
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/ui/ui.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/ui/ui.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".patcher div.box-ui > div.package-ui.package-ui-code {\n  height: 100%;\n  width: 100%; }\n\n.patcher div.box-ui > div.package-ui.box-ui-button.box-ui-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: auto;\n  padding: 0px;\n  margin: 0px; }\n\n.patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container {\n  display: flex;\n  flex: 0 0 auto;\n  padding: 4px 5px;\n  width: 100%;\n  font-family: Lato, Tahoma, sans-serif;\n  font-size: 12px;\n  text-align: left;\n  margin: 0px;\n  overflow-wrap: break-word;\n  cursor: default;\n  user-select: none;\n  -webkit-user-select: none; }\n  .patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container:first-child {\n    border-top-width: 4px; }\n  .patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container:last-child {\n    border-bottom-width: 4px; }\n  .patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container > span {\n    position: relative;\n    word-break: break-all;\n    width: 100%;\n    line-height: 14px;\n    font-weight: normal;\n    color: black; }\n    .patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container > span.editing {\n      pointer-events: auto;\n      cursor: text;\n      user-select: auto;\n      -webkit-user-select: auto; }\n    .patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container > span:empty::before {\n      content: \"\\200b\"; }\n    .patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container > span::selection {\n      background-color: #004eff;\n      color: white; }\n  .patcher div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container i.icon {\n    line-height: 14px; }\n\n.patcher div.box-ui > div.package-ui.package-ui-menu > .dropdown {\n  user-select: none;\n  -webkit-user-select: none;\n  font-size: 12px;\n  padding: 4px 15px 4px 5px;\n  min-height: auto; }\n  .patcher div.box-ui > div.package-ui.package-ui-menu > .dropdown > .dropdown.icon {\n    padding: 5px 5px; }\n  .patcher div.box-ui > div.package-ui.package-ui-menu > .dropdown > .menu > .item {\n    user-select: none;\n    -webkit-user-select: none;\n    font-size: 12px;\n    padding: 4px 5px !important; }\n    .patcher div.box-ui > div.package-ui.package-ui-menu > .dropdown > .menu > .item.active {\n      font-weight: 600; }\n\n.patcher.unlocked div.box.selected > div.box-ui > div.package-ui.box-ui-button:hover, .patcher.unlocked div.box.selected > div.box-ui > div.package-ui.box-ui-button:active {\n  background-color: #e0e1e2; }\n\n.patcher.unlocked div.box.selected > div.box-ui > div.package-ui.box-ui-button > .box-ui-text-container {\n  pointer-events: auto; }\n\n.patcher.unlocked div.box.selected > div.box-ui > div.package-ui > span {\n  pointer-events: auto; }\n", "",{"version":3,"sources":["webpack://./src/ui/ui.scss"],"names":[],"mappings":"AAAA;EAEQ,YAAY;EACZ,WAAW,EAAA;;AAHnB;EAOY,aAAa;EACb,sBAAsB;EACtB,YAAY;EACZ,cAAc;EACd,YAAY;EACZ,WAAW,EAAA;;AAZvB;EAeY,aAAa;EACb,cAAc;EACd,gBAAgB;EAChB,WAAW;EACX,qCAAqC;EACrC,eAAe;EACf,gBAAgB;EAChB,WAAW;EACX,yBAAyB;EACzB,eAAe;EACf,iBAAiB;EACjB,yBAAyB,EAAA;EA1BrC;IA4BgB,qBAAqB,EAAA;EA5BrC;IA+BgB,wBAAwB,EAAA;EA/BxC;IAkCgB,kBAAkB;IAClB,qBAAqB;IACrB,WAAW;IACX,iBAAiB;IACjB,mBAAmB;IACnB,YAAY,EAAA;IAvC5B;MAyCoB,oBAAoB;MACpB,YAAY;MACZ,iBAAiB;MACjB,yBAAyB,EAAA;IA5C7C;MA+CoB,gBAAgB,EAAA;IA/CpC;MAkDoB,yBAAyB;MACzB,YAAY,EAAA;EAnDhC;IAuDgB,iBAAiB,EAAA;;AAvDjC;EA6DY,iBAAiB;EACjB,yBAAyB;EACzB,eAAe;EACf,yBAAyB;EACzB,gBAAgB,EAAA;EAjE5B;IAmEgB,gBAAgB,EAAA;EAnEhC;IAsEgB,iBAAiB;IACjB,yBAAyB;IACzB,eAAe;IACf,2BAA0B,EAAA;IAzE1C;MA2EoB,gBAAgB,EAAA;;AAMpC;EAGY,yBAAyB,EAAA;;AAHrC;EAMY,oBAAoB,EAAA;;AANhC;EAUQ,oBAAoB,EAAA","sourcesContent":[".patcher div.box-ui > div.package-ui {\n    &.package-ui-code {\n        height: 100%;\n        width: 100%;\n    }\n    &.box-ui-button {\n        &.box-ui-container {\n            display: flex;\n            flex-direction: column;\n            height: 100%;\n            overflow: auto;\n            padding: 0px;\n            margin: 0px;\n        }\n        & > .box-ui-text-container {\n            display: flex;\n            flex: 0 0 auto;\n            padding: 4px 5px;\n            width: 100%;\n            font-family: Lato, Tahoma, sans-serif;\n            font-size: 12px;\n            text-align: left;\n            margin: 0px;\n            overflow-wrap: break-word;\n            cursor: default;\n            user-select: none;\n            -webkit-user-select: none;\n            &:first-child {\n                border-top-width: 4px;\n            }\n            &:last-child {\n                border-bottom-width: 4px;\n            }\n            & > span {\n                position: relative;\n                word-break: break-all;\n                width: 100%;\n                line-height: 14px;\n                font-weight: normal;\n                color: black;\n                &.editing {\n                    pointer-events: auto;\n                    cursor: text;\n                    user-select: auto;\n                    -webkit-user-select: auto;\n                }\n                &:empty::before {\n                    content: \"\\200b\";\n                }\n                &::selection {\n                    background-color: #004eff;\n                    color: white;\n                }\n            }\n            i.icon {\n                line-height: 14px;\n            }\n        }\n    }\n    &.package-ui-menu {\n        & > .dropdown {\n            user-select: none;\n            -webkit-user-select: none;\n            font-size: 12px;\n            padding: 4px 15px 4px 5px;\n            min-height: auto;\n            & > .dropdown.icon {\n                padding: 5px 5px;\n            }\n            & > .menu > .item {\n                user-select: none;\n                -webkit-user-select: none;\n                font-size: 12px;\n                padding: 4px 5px!important;\n                &.active {\n                    font-weight: 600;\n                }\n            }\n        }\n    }\n}\n.patcher.unlocked div.box.selected > div.box-ui > div.package-ui {\n    &.box-ui-button {\n        &:hover, &:active {\n            background-color: #e0e1e2;\n        }\n        & > .box-ui-text-container {\n            pointer-events: auto;\n        }\n    }\n    & > span {\n        pointer-events: auto;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/foreach/index.js":
/*!***************************************!*\
  !*** ./node_modules/foreach/index.js ***!
  \***************************************/
/***/ ((module) => {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ "./node_modules/function-bind/implementation.js":
/*!******************************************************!*\
  !*** ./node_modules/function-bind/implementation.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "./node_modules/function-bind/index.js":
/*!*********************************************!*\
  !*** ./node_modules/function-bind/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(/*! ./implementation */ "./node_modules/function-bind/implementation.js");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "./node_modules/get-intrinsic/index.js":
/*!*********************************************!*\
  !*** ./node_modules/get-intrinsic/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(/*! has-symbols */ "./node_modules/has-symbols/index.js")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");
var hasOwn = __webpack_require__(/*! has */ "./node_modules/has/src/index.js");
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ "./node_modules/has-symbols/index.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(/*! ./shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ "./node_modules/has-symbols/shams.js":
/*!*******************************************!*\
  !*** ./node_modules/has-symbols/shams.js ***!
  \*******************************************/
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "./node_modules/has-tostringtag/shams.js":
/*!***********************************************!*\
  !*** ./node_modules/has-tostringtag/shams.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(/*! has-symbols/shams */ "./node_modules/has-symbols/shams.js");

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ "./node_modules/has/src/index.js":
/*!***************************************!*\
  !*** ./node_modules/has/src/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! function-bind */ "./node_modules/function-bind/index.js");

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/inherits/inherits_browser.js":
/*!***************************************************!*\
  !*** ./node_modules/inherits/inherits_browser.js ***!
  \***************************************************/
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ "./node_modules/is-arguments/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-arguments/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "./node_modules/is-generator-function/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/is-generator-function/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ "./node_modules/is-typed-array/index.js":
/*!**********************************************!*\
  !*** ./node_modules/is-typed-array/index.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new __webpack_require__.g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./src/ui/ui.scss":
/*!************************!*\
  !*** ./src/ui/ui.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ui_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./ui.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/ui/ui.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ui_scss__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ui_scss__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ui_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ui_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/util/support/isBufferBrowser.js":
/*!******************************************************!*\
  !*** ./node_modules/util/support/isBufferBrowser.js ***!
  \******************************************************/
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ "./node_modules/util/support/types.js":
/*!********************************************!*\
  !*** ./node_modules/util/support/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(/*! is-arguments */ "./node_modules/is-arguments/index.js");
var isGeneratorFunction = __webpack_require__(/*! is-generator-function */ "./node_modules/is-generator-function/index.js");
var whichTypedArray = __webpack_require__(/*! which-typed-array */ "./node_modules/which-typed-array/index.js");
var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ "./node_modules/util/util.js":
/*!***********************************!*\
  !*** ./node_modules/util/util.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (({"NODE_ENV":"development"}).NODE_DEBUG) {
  var debugEnv = ({"NODE_ENV":"development"}).NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(/*! ./support/types */ "./node_modules/util/support/types.js");

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(/*! ./support/isBuffer */ "./node_modules/util/support/isBufferBrowser.js");

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(/*! inherits */ "./node_modules/inherits/inherits_browser.js");

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ "./node_modules/which-typed-array/index.js":
/*!*************************************************!*\
  !*** ./node_modules/which-typed-array/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(/*! foreach */ "./node_modules/foreach/index.js");
var availableTypedArrays = __webpack_require__(/*! available-typed-arrays */ "./node_modules/available-typed-arrays/index.js");
var callBound = __webpack_require__(/*! call-bind/callBound */ "./node_modules/call-bind/callBound.js");

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(/*! has-tostringtag/shams */ "./node_modules/has-tostringtag/shams.js")();

var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__(/*! es-abstract/helpers/getOwnPropertyDescriptor */ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof __webpack_require__.g[typedArray] === 'function') {
			var arr = new __webpack_require__.g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(/*! is-typed-array */ "./node_modules/is-typed-array/index.js");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ "./node_modules/available-typed-arrays/index.js":
/*!******************************************************!*\
  !*** ./node_modules/available-typed-arrays/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof __webpack_require__.g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ }),

/***/ "./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(/*! get-intrinsic */ "./node_modules/get-intrinsic/index.js");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"@jspatcher/package-ui","version":"1.0.0","description":"The UI package for JSPatcher","main":"dist/index.js","scripts":{"build":"webpack --mode development","build-watch":"webpack --mode development --watch --stats-children"},"keywords":["jspatcher"],"jspatcher":{"isJSPatcherPackage":true,"thumbnail":"","jspatpkg":"index.jspatpkg.js"},"author":"Fr0stbyteR","license":"GPL-3.0-or-later","repository":"https://github.com/jspatcher/package-ui","devDependencies":{"@babel/core":"^7.15.0","@babel/plugin-proposal-class-properties":"^7.14.5","@babel/preset-env":"^7.15.0","@babel/preset-react":"^7.14.5","@babel/preset-typescript":"^7.15.0","@jspatcher/jspatcher":"0.0.8","@types/react":"^17.0.18","@types/react-dom":"^17.0.9","babel-loader":"^8.2.2","clean-webpack-plugin":"^4.0.0-alpha.0","color-js":"^1.0.5","copy-webpack-plugin":"^9.0.1","css-loader":"^6.2.0","monaco-editor":"^0.27.0","node-sass":"^6.0.1","react":"^17.0.2","react-dom":"^17.0.2","react-monaco-editor":"^0.44.0","sass-loader":"^12.1.0","semantic-ui-react":"^2.0.3","style-loader":"^3.2.1","typescript":"^4.3.5","util":"^0.12.4","webpack":"^5.50.0","webpack-cli":"^4.7.2"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/index.jspatpkg.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _objects_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/message */ "./src/objects/message.ts");
/* harmony import */ var _objects_code__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objects/code */ "./src/objects/code.ts");
/* harmony import */ var _objects_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./objects/menu */ "./src/objects/menu.ts");
/* harmony import */ var _objects_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./objects/view */ "./src/objects/view.ts");
/* harmony import */ var _objects_keyboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./objects/keyboard */ "./src/objects/keyboard.ts");
/* harmony import */ var _objects_bpf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./objects/bpf */ "./src/objects/bpf.ts");
/* harmony import */ var _objects_waveform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./objects/waveform */ "./src/objects/waveform.ts");
/* harmony import */ var _objects_img__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./objects/img */ "./src/objects/img.ts");
/* harmony import */ var _ui_ui_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ui/ui.scss */ "./src/ui/ui.scss");









/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async () => ({
  message: _objects_message__WEBPACK_IMPORTED_MODULE_0__.default,
  code: _objects_code__WEBPACK_IMPORTED_MODULE_1__.default,
  menu: _objects_menu__WEBPACK_IMPORTED_MODULE_2__.default,
  view: _objects_view__WEBPACK_IMPORTED_MODULE_3__.default,
  keyboard: _objects_keyboard__WEBPACK_IMPORTED_MODULE_4__.default,
  bpf: _objects_bpf__WEBPACK_IMPORTED_MODULE_5__.default,
  waveform: _objects_waveform__WEBPACK_IMPORTED_MODULE_6__.default,
  img: _objects_img__WEBPACK_IMPORTED_MODULE_7__.default
}));
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=index.jspatpkg.js.map