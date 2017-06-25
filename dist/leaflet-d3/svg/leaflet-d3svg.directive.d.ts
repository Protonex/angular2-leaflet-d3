import { EventEmitter, OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/angular2-leaflet';
export declare class LeafletD3SvgDirective implements OnChanges, OnInit {
    leafletDirective: LeafletDirectiveWrapper;
    d3SvgLayer: L.D3SvgLayer;
    d3SvgData: any[];
    d3SvgOptions: L.D3SvgLayerConfig;
    d3SvgMouseover: EventEmitter<any>;
    d3SvgMouseout: EventEmitter<any>;
    d3SvgClick: EventEmitter<any>;
    layerReady: EventEmitter<L.D3SvgLayer>;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    private setD3SvgData(data);
}
