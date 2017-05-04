define([
    'dojo/query',
    'dojo/_base/declare',
    'dojo/dom-construct'
], function (
    query,
    declare,
    domConstruct
) {
    return declare(null, {
        constructor(mapView) {
            // summary:
            //      ??
            // mapView: esri/views/MapView
            console.log('map-tools/MapView:constructor', arguments);

            mapView.extent = {
                xmax: -11762120.612131765,
                xmin: -13074391.513731329,
                ymax: 5225035.106177688,
                ymin: 4373832.359194187,
                spatialReference: 3857
            }

            // wait until dom has been built
            mapView.then(() => {
                var poweredByDiv = query('.esri-attribution__powered-by', mapView.container)[0]
                domConstruct.empty(poweredByDiv);
                poweredByDiv.innerHTML = 'Powered by ';
                domConstruct.create('a', {
                    href: 'https://gis.utah.gov',
                    innerHTML: 'AGRC',
                    target: '_blank',
                    'class': 'esri-attribution__link'
                }, poweredByDiv);
            });
        }
    });
});
// define([
//     'dijit/Destroyable',
//
//     'dojo/aspect',
//     'dojo/dom',
//     'dojo/dom-class',
//     'dojo/dom-construct',
//     'dojo/dom-geometry',
//     'dojo/dom-style',
//     'dojo/hash',
//     'dojo/io-query',
//     'dojo/on',
//     'dojo/_base/array',
//     'dojo/_base/declare',
//     'dojo/_base/lang',
//
//     'esri/config',
//     'esri/geometry/Extent',
//     'esri/geometry/Point',
//     'esri/geometry/SpatialReference',
//     'esri/layers/support/TileInfo',
//     'esri/layers/WebTileLayer',
//     'esri/map',
//
//     'spin'
// ], function (
//     Destroyable,
//     Button,
//
//     aspect,
//     dom,
//     domClass,
//     domConstruct,
//     domGeometry,
//     domStyle,
//     hash,
//     ioQuery,
//     on,
//     array,
//     declare,
//     lang,
//
//     esriConfig,
//     Extent,
//     Point,
//     SpatialReference,
//     TileInfo,
//     WebTiledLayer,
//     esriMap,
//
//     Spinner
// ) {
//     return declare([Destroyable], {
//         // description:
//         //      Summary:
//         //          Map Control with default functionality specific to State of Utah data.
//         //      Description:
//         //          This widget does not inherit from dijit._Widget like most of the other agrc widgets.
//         //          It inherits from an esri control, esri.Map. Please see
//         //          This widget automatically replaces the ESRI logo with the AGRC logo.
//         //          It defaults to the State of Utah extent on load. You can easily make a
//         //          loader image appear when a certain layer is drawing. See addLoaderToLayer.
//
//         // _layersDrawing: [private] Integer
//         //      keeps track of layers that have draw - see addLoadingToLayer
//         _layersDrawing: 0,
//
//         // _defaultExtent: esri.geometry.Extent
//         //      set in constructor
//         _defaultExtent: null,
//
//         // spinner: Object (Spinner)
//         //      the spinner object returned by spinjs
//         spinner: null,
//
//         // map: esri/Map
//         map: null,
//
//         // mapView: esri/views/MapView
//         mapView: null,
//
//
//         // Parameters to constructor
//
//         // useDefaultBaseMap: Boolean
//         //      If true, the map will automatically load the Lite base map
//         //      Default: true
//         useDefaultBaseMap: true,
//
//         // includeFullExtentButton: Boolean
//         //      Controls the visibility of the full extent button below the zoom slider.
//         //      Default: false.
//         includeFullExtentButton: false,
//
//         // includeBackButton: Boolean
//         //      Controls the visibility of the back button below the zoom slider.
//         //      Default: false.
//         includeBackButton: false,
//
//         // router: Boolean
//         //      Toggles functionality to persist the map extent in the url.
//         //      Default: false
//         router: false,
//
//         constructor: function (mapDiv, options) {
//             // summary:
//             //      Constructor function for object.
//             // mapDiv: String or DomNode
//             //      The div that you want to put the map in.
//             // options: Object?
//             //      The parameters that you want to pass into the widget. Includes useDefaultBaseMap,
//             //      defaultBaseMap, and includeFullExtentButton. All are optional.
//             console.log('agrc.widgets.map.BaseMap::constructor', arguments);
//
//             if (!options) {
//                 options = {};
//             }
//
//             if (options.router) {
//                 lang.mixin(this._params, this.initRouter());
//             }
//
//             if (options.extent) {
//                 this._defaultExtent = options.extent;
//             } else if (options.scale && options.center) {
//                 this._defaultExtent = {
//                     scale: options.scale,
//                     center: options.center
//                 };
//             } else {
//                 this._defaultExtent = new Extent({
//                     xmax: -11762120.612131765,
//                     xmin: -13074391.513731329,
//                     ymax: 5225035.106177688,
//                     ymin: 4373832.359194187,
//                     spatialReference: {
//                         wkid: 3857
//                     }
//                 });
//                 options.extent = this._defaultExtent;
//                 options.fitExtent = true;
//             }
//
//             // mixin options
//             lang.mixin(this, options);
//
//             // load basemap
//             if (this.useDefaultBaseMap) {
//                 this.showDefaultBaseMap();
//             }
//
//             // replace default link on logo
//             esriConfig.defaults.map.logoLink = '//gis.utah.gov/';
//
//             // not sure if this is needed?
//             domClass.add(mapDiv, 'mapContainer');
//
//             if (this.includeFullExtentButton || this.includeBackButton) {
//                 var btns = [];
//                 if (this.includeFullExtentButton) {
//                     btns.push(this.buttons.full); // TODO
//                 }
//                 if (this.includeBackButton) {
//                     btns.push(this.buttons.back); // TODO
//                 }
//             }
//         },
//         setDefaultExtent: function () {
//             // summary:
//             //      Sets the extent to the State of Utah
//             console.log('agrc.widgets.map.BaseMap::setDefaultExtent', arguments);
//
//             if (this._defaultExtent.center) {
//                 this.setScale(this._defaultExtent.scale);
//                 return this.centerAt(this._defaultExtent.center);
//             }
//             return this.setExtent(this._defaultExtent, true);
//         },
//         showDefaultBaseMap: function () {
//             // summary:
//             //      Adds the UtahBaseMap-Vector map service.
//             console.log('agrc.widgets.map.BaseMap::showDefaultBaseMap', arguments);
//
//             if (!this.quadWord) {
//                 throw 'You must provide a discover.agrc.utah.gov quadWord to load the default base map!';
//             }
//
//             // build basemap url
//             var url = window.location.protocol +
//                 '//discover.agrc.utah.gov/login/path/' + this.quadWord +
//                 '/tiles/lite_basemap/${level}/${col}/${row}';
//             var lyr = new WebTiledLayer(url, {
//                 tileInfo: this._getTileInfo(),
//                 copyright: 'AGRC'
//             });
//             this.addLayer(lyr);
//         },
//         _getTileInfo: function () {
//             // summary:
//             //      returns the tile info for a discover base map service
//             // returns: TileInfo
//             console.log('app/widgets/map/BaseMap::_getTileInfo', arguments);
//
//             var tilesize = 256;
//             var earthCircumference = 40075016.685568;
//             var inchesPerMeter = 39.37;
//             var initialResolution = earthCircumference / tilesize;
//
//             var dpi = 96;
//             var maxLevel = 19;
//             var squared = 2;
//             var lods = [];
//             for (var level = 0; level <= maxLevel; level++) {
//                 var resolution = initialResolution / Math.pow(squared, level);
//                 var scale = resolution * dpi * inchesPerMeter;
//                 lods.push({
//                     level: level,
//                     scale: scale,
//                     resolution: resolution
//                 });
//             }
//
//             return new TileInfo({
//                 dpi: dpi,
//                 rows: 256,
//                 cols: 256,
//                 width: 256,
//                 origin: {
//                     x: -20037508.342787,
//                     y: 20037508.342787
//                 },
//                 spatialReference: new SpatialReference(3857),
//                 lods: lods
//             });
//         },
//         addLoaderToLayer: function (lyr) {
//             // summary:
//             //      Wires up the loader image to display when the passed layer is drawing.
//             // lyr: esri.Layer
//             //      The layer that you want to work with.
//             console.log('agrc.widgets.map.BaseMap::addLoaderToLayer', arguments);
//
//             var that = this;
//
//             function showLoading() {
//                 // increment layersDrawing
//                 that._layersDrawing++;
//
//                 that.showLoader();
//             }
//
//             function hideLoading() {
//                 // decrement layersDrawing
//                 that._layersDrawing--;
//
//                 // only hide loader if all layers have finished drawing
//                 if (that._layersDrawing <= 0) {
//                     that.hideLoader();
//                 }
//             }
//
//             // wire layer events
//             this.own(
//                 aspect.before(lyr, 'onUpdateStart', showLoading),
//                 aspect.after(lyr, 'onUpdateEnd', hideLoading)
//             );
//         },
//         showLoader: function () {
//             // summary:
//             //      Displays the loader icon in the bottom, left-hand corner of the map
//             console.log('agrc.widgets.map.BaseMap::showLoader', arguments);
//
//             var opts = {
//                 lines: 9, // The number of lines to draw
//                 length: 10, // The length of each line
//                 width: 4, // The line thickness
//                 radius: 5, // The radius of the inner circle
//                 corners: 1, // Corner roundness (0..1)
//                 rotate: 0, // The rotation offset
//                 direction: 1, // 1: clockwise, -1: counterclockwise
//                 color: '#ffffff', // #rgb or #rrggbb or array of colors
//                 speed: 1, // Rounds per second
//                 trail: 60, // Afterglow percentage
//                 shadow: true, // Whether to render a shadow
//                 hwaccel: true, // Whether to use hardware acceleration
//                 className: 'spinner', // The CSS class to assign to the spinner
//                 zIndex: 2e9, // The z-index (defaults to 2000000000)
//                 top: 'auto', // Top position relative to parent in px
//                 left: 'auto' // Left position relative to parent in px
//             };
//
//             if (!this.spinner) {
//                 this.spinner = new Spinner(opts).spin(dom.byId(this.root));
//             } else {
//                 if (!this.spinner.el) {
//                     // only start if it's not already started
//                     this.spinner.spin(dom.byId(this.root));
//                 }
//             }
//         },
//         hideLoader: function () {
//             // summary:
//             //      Hides the loader icon.
//             console.log('agrc.widgets.map.BaseMap::hideLoader', arguments);
//
//             this.spinner.stop();
//         },
//     });
// });
