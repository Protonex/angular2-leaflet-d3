import { Directive, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/angular2-leaflet';
var LeafletD3SvgDirective = (function () {
    function LeafletD3SvgDirective(leafletDirective) {
        // Hexbin data binding
        this.d3SvgData = [];
        // Interaction events
        this.d3SvgMouseover = new EventEmitter();
        this.d3SvgMouseout = new EventEmitter();
        this.d3SvgClick = new EventEmitter();
        // Fired when the layer is created
        this.layerReady = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletD3SvgDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.leafletDirective.init();
        var map = this.leafletDirective.getMap();
        this.d3SvgLayer = L.hexbinLayer(this.d3SvgOptions);
        // Fire the ready event
        this.layerReady.emit(this.d3SvgLayer);
        // register for the hexbin events
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
        // Only if there is a hexbinLayer do we apply the data
        if (null != this.d3SvgLayer) {
            this.d3SvgLayer.data(data);
        }
    };
    return LeafletD3SvgDirective;
}());
export { LeafletD3SvgDirective };
LeafletD3SvgDirective.decorators = [
    { type: Directive, args: [{
                selector: '[leafletD3Svg]'
            },] },
];
/** @nocollapse */
LeafletD3SvgDirective.ctorParameters = function () { return [
    { type: LeafletDirective, },
]; };
LeafletD3SvgDirective.propDecorators = {
    'd3SvgData': [{ type: Input, args: ['leafletD3Svg',] },],
    'd3SvgOptions': [{ type: Input, args: ['leafletD3SvgOptions',] },],
    'd3SvgMouseover': [{ type: Output, args: ['leafletD3SvgMouseover',] },],
    'd3SvgMouseout': [{ type: Output, args: ['leafletD3SvgMouseout',] },],
    'd3SvgClick': [{ type: Output, args: ['leafletD3SvgClick',] },],
    'layerReady': [{ type: Output, args: ['leafletD3SvgLayerReady',] },],
};
//# sourceMappingURL=leaflet-d3svg.directive.js.map