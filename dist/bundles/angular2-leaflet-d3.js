/*! @asymmetrik/angular2-leaflet-d3 - 0.0.3 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@asymmetrik/angular2-leaflet'), require('leaflet'), require('rxjs'), require('@asymmetrik/leaflet-d3')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@asymmetrik/angular2-leaflet', 'leaflet', 'rxjs', '@asymmetrik/leaflet-d3'], factory) :
	(factory((global.angular2LeafletD3 = global.angular2LeafletD3 || {}),global.ng.core,global.angular2Leaflet,global.L,global.Rx));
}(this, (function (exports,_angular_core,_asymmetrik_angular2Leaflet,L,rxjs) { 'use strict';

var LeafletHexbinDirective = (function () {
    function LeafletHexbinDirective(leafletDirective) {
        // Hexbin data binding
        this.hexbinData = [];
        // Interaction events
        this.hexbinMouseover = new _angular_core.EventEmitter();
        this.hexbinMouseout = new _angular_core.EventEmitter();
        this.hexbinClick = new _angular_core.EventEmitter();
        // Fired when the layer is created
        this.layerReady = new _angular_core.EventEmitter();
        this.leafletDirective = new _asymmetrik_angular2Leaflet.LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletHexbinDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.leafletDirective.init();
        var map = this.leafletDirective.getMap();
        this.hexbinLayer = L.hexbinLayer(this.hexbinOptions);
        // Fire the ready event
        this.layerReady.emit(this.hexbinLayer);
        // register for the hexbin events
        this.hexbinLayer.dispatch().on('mouseover', function (p) { _this.hexbinMouseover.emit(p); });
        this.hexbinLayer.dispatch().on('mouseout', function (p) { _this.hexbinMouseout.emit(p); });
        this.hexbinLayer.dispatch().on('click', function (p) { _this.hexbinClick.emit(p); });
        this.hexbinLayer.addTo(map);
        // Initialize the data (in case the data was set before the directive was initialized)
        this.setHexbinData(this.hexbinData);
    };
    LeafletHexbinDirective.prototype.ngOnChanges = function (changes) {
        // Set the new data
        if (changes['hexbinData']) {
            this.setHexbinData(changes['hexbinData'].currentValue);
        }
    };
    LeafletHexbinDirective.prototype.setHexbinData = function (data) {
        // Only if there is a hexbinLayer do we apply the data
        if (null != this.hexbinLayer) {
            this.hexbinLayer.data(data);
        }
    };
    return LeafletHexbinDirective;
}());
LeafletHexbinDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[leafletHexbin]'
            },] },
];
/** @nocollapse */
LeafletHexbinDirective.ctorParameters = function () { return [
    { type: _asymmetrik_angular2Leaflet.LeafletDirective, },
]; };
LeafletHexbinDirective.propDecorators = {
    'hexbinData': [{ type: _angular_core.Input, args: ['leafletHexbin',] },],
    'hexbinOptions': [{ type: _angular_core.Input, args: ['leafletHexbinOptions',] },],
    'hexbinMouseover': [{ type: _angular_core.Output, args: ['leafletHexbinMouseover',] },],
    'hexbinMouseout': [{ type: _angular_core.Output, args: ['leafletHexbinMouseout',] },],
    'hexbinClick': [{ type: _angular_core.Output, args: ['leafletHexbinClick',] },],
    'layerReady': [{ type: _angular_core.Output, args: ['leafletHexbinLayerReady',] },],
};

var LeafletPingDirective = (function () {
    function LeafletPingDirective(leafletDirective) {
        this.pingObserverReady = new _angular_core.EventEmitter();
        this.leafletDirective = new _asymmetrik_angular2Leaflet.LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletPingDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.leafletDirective.init();
        var map = this.leafletDirective.getMap();
        this.pingLayer = L.pingLayer(this.pingOptions).addTo(map);
        // Handle incoming ping events
        this.pingSource = rxjs.Observable.create(function (observer) {
            _this.pingObserver = observer;
            _this.pingObserverReady.emit(_this.pingObserver);
        })
            .subscribe(function (event) {
            if (null != event) {
                _this.ping(event.data, event.cssClass);
            }
        });
    };
    /**
     * Submit a ping to the ping layer.
     *
     * @param data Contains the lat/lon information to generate the ping
     * @param cssClass Optional parameter specifying the css class to apply to the ping
     */
    LeafletPingDirective.prototype.ping = function (data, cssClass) {
        if (null != this.pingLayer) {
            this.pingLayer.ping(data, cssClass);
        }
    };
    return LeafletPingDirective;
}());
LeafletPingDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[leafletPing]'
            },] },
];
/** @nocollapse */
LeafletPingDirective.ctorParameters = function () { return [
    { type: _asymmetrik_angular2Leaflet.LeafletDirective, },
]; };
LeafletPingDirective.propDecorators = {
    'pingOptions': [{ type: _angular_core.Input, args: ['leafletPingOptions',] },],
    'pingObserverReady': [{ type: _angular_core.Output, args: ['leafletPingObserver',] },],
};

var LeafletD3SvgDirective = (function () {
    function LeafletD3SvgDirective(leafletDirective) {
        // Hexbin data binding
        this.d3SvgData = [];
        // Interaction events
        this.d3SvgMouseover = new _angular_core.EventEmitter();
        this.d3SvgMouseout = new _angular_core.EventEmitter();
        this.d3SvgClick = new _angular_core.EventEmitter();
        // Fired when the layer is created
        this.layerReady = new _angular_core.EventEmitter();
        this.leafletDirective = new _asymmetrik_angular2Leaflet.LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletD3SvgDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.leafletDirective.init();
        var map = this.leafletDirective.getMap();
        this.d3SvgLayer = L.d3SvgLayer(this.d3SvgOptions);
        // Fire the ready event
        this.layerReady.emit(this.d3SvgLayer);
        // register for the d3Svg events
        this.d3SvgLayer.dispatch().on('mouseover', function (p) { _this.d3SvgMouseover.emit(p); });
        this.d3SvgLayer.dispatch().on('mouseout', function (p) { _this.d3SvgMouseout.emit(p); });
        this.d3SvgLayer.dispatch().on('click', function (p) { _this.d3SvgClick.emit(p); });
        this.d3SvgLayer.addTo(map);
        // Initialize the data (in case the data was set before the directive was initialized)
        this.setD3SvgData(this.d3SvgData);
    };
    LeafletD3SvgDirective.prototype.ngOnChanges = function (changes) {
        // Set the new data
        if (changes['d3SvgData']) {
            this.setD3SvgData(changes['d3SvgData'].currentValue);
        }
    };
    LeafletD3SvgDirective.prototype.setD3SvgData = function (data) {
        // Only if there is a d3SvgLayer do we apply the data
        if (null != this.d3SvgLayer) {
            this.d3SvgLayer.data(data);
        }
    };
    return LeafletD3SvgDirective;
}());
LeafletD3SvgDirective.decorators = [
    { type: _angular_core.Directive, args: [{
                selector: '[leafletD3Svg]'
            },] },
];
/** @nocollapse */
LeafletD3SvgDirective.ctorParameters = function () { return [
    { type: _asymmetrik_angular2Leaflet.LeafletDirective, },
]; };
LeafletD3SvgDirective.propDecorators = {
    'd3SvgData': [{ type: _angular_core.Input, args: ['leafletD3Svg',] },],
    'd3SvgOptions': [{ type: _angular_core.Input, args: ['leafletD3SvgOptions',] },],
    'd3SvgMouseover': [{ type: _angular_core.Output, args: ['leafletD3SvgMouseover',] },],
    'd3SvgMouseout': [{ type: _angular_core.Output, args: ['leafletD3SvgMouseout',] },],
    'd3SvgClick': [{ type: _angular_core.Output, args: ['leafletD3SvgClick',] },],
    'layerReady': [{ type: _angular_core.Output, args: ['leafletD3SvgLayerReady',] },],
};

var LeafletD3Module = (function () {
    function LeafletD3Module() {
    }
    LeafletD3Module.forRoot = function () {
        return { ngModule: LeafletD3Module, providers: [] };
    };
    return LeafletD3Module;
}());
LeafletD3Module.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _asymmetrik_angular2Leaflet.LeafletModule,
                ],
                exports: [
                    LeafletHexbinDirective,
                    LeafletPingDirective,
                    LeafletD3SvgDirective,
                ],
                declarations: [
                    LeafletHexbinDirective,
                    LeafletPingDirective,
                    LeafletD3SvgDirective,
                ]
            },] },
];
/** @nocollapse */
LeafletD3Module.ctorParameters = function () { return []; };

exports.LeafletD3Module = LeafletD3Module;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-leaflet-d3.js.map
