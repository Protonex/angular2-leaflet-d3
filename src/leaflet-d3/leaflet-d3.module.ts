import { ModuleWithProviders, NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/angular2-leaflet';

import { LeafletHexbinDirective } from './hexbin/leaflet-hexbin.directive';
import { LeafletPingDirective } from './ping/leaflet-ping.directive';
import { LeafletD3SvgDirective } from './svg/leaflet-d3svg.directive';

@NgModule({
	imports: [
		LeafletModule,
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
})
export class LeafletD3Module {

	static forRoot(): ModuleWithProviders {
		return { ngModule: LeafletD3Module, providers: [] };
	}

}
