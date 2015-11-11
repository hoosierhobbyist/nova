'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _libSprite = require('./lib/sprite');

_defaults(exports, _interopExportWildcard(_libSprite, _defaults));

var _libEmitter = require('./lib/emitter');

_defaults(exports, _interopExportWildcard(_libEmitter, _defaults));

var _libGeometry = require('./lib/geometry');

_defaults(exports, _interopExportWildcard(_libGeometry, _defaults));

