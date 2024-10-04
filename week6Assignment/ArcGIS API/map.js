var Main;

require(
    [
        "esri/Map",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/ElevationLayer",
        "esri/views/SceneView",
        "esri/widgets/Search"
        
    ],
    function(
       Map, Graphic, GraphicsLayer, ElevationLayer, SceneView, Search
    ) {
        
  
        $(document).ready(function() {
            Main = (function() {
                let layer = new ElevationLayer({
                    url: "http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
                    
                
            });
                var map = new Map({
                    basemap: "hybrid",
                    ground: {
                        layers: [layer]
                    },
                });
    
                var view = new SceneView({
                    container: "map",
                    viewingMode: "global",
                    map: map,
                    camera: {
                        position: {
                            x: -105.58077771278067,
                            y: 41.31403134536375, 
                            z: 2000000,
                            spatialReference: {
                                wkid: 4326
    
                            }
                        },
                        heading: 0,
                        tilt: 10,
                    },
                 
                    popup: {
                        dockEnabled: true,
                        dockOptions: {
                            breakpoint: false
                        }
                    },
                    // enable shadows to be cast from the features
                    environment: {
                        lighting: {
                            type: "sun"
                        },
                        atmosphereEnabled: true
                      
                }})
              
                const initMap = function(){
               
                   
                    // var graphicsLayer = new GraphicsLayer()
                    const graphicsLayer = new GraphicsLayer();
                    map.add(graphicsLayer);
                    for (const [key, value] of Object.entries(myStuff)){
                        console.log("Processing point:", key, value.coord)
                        const point = {
                            type: "point", 
                            x: value.coord[0],
                            y: value.coord[1],
                            z: 10000,
                          
                        };
                  
                          const markerSymbol = {
                            type: "simple-marker", 
                            style: "diamond",
                            color: [34, 139, 34],
                            outline: {
                              // autocasts as new SimpleLineSymbol()
                              color: [255, 255, 255],
                              width: 2
                            }
                          };
                      
                          const pointGraphic = new Graphic({
                            geometry: point,
                            symbol: markerSymbol,
                            popupTemplate: {
                                title: key + ": " + value.placename + ", " + value.date}
                          });
                          graphicsLayer.add(pointGraphic);
                  
                    }
                    graphicsLayer.on("click", (event) => {
                      view.animateTo({
                        center: event.graphic.geometry,
                        scale: 100000 })})
                        
                  const pointIndex = 0; // Replace with the desired index
const pointGraphic = graphicsLayer.graphics[pointIndex];
const pointGeometry = pointGraphic.geometry;

view.animateTo({
  center: pointGeometry,
  scale: 100000 // Adjust the scale as needed
});
                    graphicsLayer.featureReduction = {
                        type: "selection",
                        selectionRadius: "80px",
          // defines the label within each cluster
          labelingInfo: [
            {
              deconflictionStrategy: "none",
              labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,###')"
              },
              symbol: {
                type: "text",
                color: "white",
                font: {
                  family: "Noto Sans",
                  size: "12px"
                }
              },
              labelPlacement: "center-center"
            }
          ],
          // information to display when the user clicks a cluster
          popupTemplate: {
            title: "Cluster Summary",
            content: "This cluster represents <b>{cluster_count}</b> features.",
            fieldInfos: [{
              fieldName: "cluster_count",
              format: {
                places: 0,
                digitSeparator: true
                    }
                }]
                }}
                const sources = [{
                    layer: graphicsLayer,
                    placeholder: "Places",
                    searchFields: ["placename"],
                    name: "Vacation Spots",
                    exactMatch: false,
                    zoomScale: 1000
                   }
    
                   ]
              
                    const searchWidget = new Search({
                        view: view,
                        sources: sources,
                        
                        
                      });
                      view.ui.add(searchWidget, {
                        position: "top-right"
                      });
                   
                    
                    };
                  
                    
                
                initMap()
                return {
           
                };
                map.addLayer(pointLayer);
                

            
            })()
            })
            });


    
