import { Directive, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/angular2-leaflet';


@Directive({
	selector: '[leafletD3Svg]'
})
export class LeafletD3SvgDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirectiveWrapper;
	d3SvgLayer: L.D3SvgLayer;

	// Hexbin data binding
	@Input('leafletD3Svg') d3SvgData: any[] = [];

	// Options binding
	@Input('leafletD3SvgOptions') d3SvgOptions: L.D3SvgLayerConfig;

	// Interaction events
	@Output('leafletD3SvgMouseover') d3SvgMouseover: EventEmitter<any> = new EventEmitter<any>();
	@Output('leafletD3SvgMouseout') d3SvgMouseout: EventEmitter<any> = new EventEmitter<any>();
	@Output('leafletD3SvgClick') d3SvgClick: EventEmitter<any> = new EventEmitter<any>();

	// Fired when the layer is created
	@Output('leafletD3SvgLayerReady') layerReady: EventEmitter<L.D3SvgLayer> = new EventEmitter<L.D3SvgLayer>();

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {

		this.leafletDirective.init();

		let map = this.leafletDirective.getMap();
		this.d3SvgLayer = L.d3SvgLayer(this.d3SvgOptions);

		// Fire the ready event
		this.layerReady.emit(this.d3SvgLayer);

		// register for the d3Svg events
		this.d3SvgLayer.dispatch().on('mouseover', (p: any) => { this.d3SvgMouseover.emit(p); });
		this.d3SvgLayer.dispatch().on('mouseout', (p: any) => { this.d3SvgMouseout.emit(p); });
		this.d3SvgLayer.dispatch().on('click', (p: any) => { this.d3SvgClick.emit(p); });

		this.d3SvgLayer.addTo(map);

		// Initialize the data (in case the data was set before the directive was initialized)
		this.setD3SvgData(this.d3SvgData);

	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {

		// Set the new data
		if (changes['d3SvgData']) {
			this.setD3SvgData(changes['d3SvgData'].currentValue);
		}

	}

	private setD3SvgData(data: any[]) {

		// Only if there is a d3SvgLayer do we apply the data
		if (null != this.d3SvgLayer) {
			this.d3SvgLayer.data(data);
		}

	}
}
