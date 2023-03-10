function init() {
    var $ = go.GraphObject.make;  // for conciseness in defining templates

    myDiagram =
      $(go.Diagram, "myDiagramDiv");
      
    myDiagram.nodeTemplate =
      $(go.Node,
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          selectionObjectName: "SHAPE",
          selectionAdornmentTemplate:  // custom selection adornment: a blue rectangle
            $(go.Adornment, "Auto",
              $(go.Shape, { stroke: "dodgerblue", fill: null }),
              $(go.Placeholder, { margin: -1 })),
          resizable: true, resizeObjectName: "SHAPE",
          rotatable: true, rotationSpot: go.Spot.Center,
          reshapable: true
        },
        new go.Binding("angle").makeTwoWay(),
        $(go.Shape,
          { name: "SHAPE", fill: "lightgray", strokeWidth: 1.5 },
          new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
          new go.Binding("geometryString", "geo").makeTwoWay(),
          new go.Binding("fill"),
          new go.Binding("stroke"),
          new go.Binding("strokeWidth"))
      );

      myDiagram.toolManager.panningTool.isEnabled = false;

      // create polygon drawing tool for myDiagram, defined in PolygonDrawingTool.js
    var tool = new PolygonDrawingTool();
    // provide the default JavaScript object for a new polygon in the model
    tool.archetypePartData = { fill: "grey", stroke: "black", strokeWidth: 3 };
    tool.isPolygon = true;  // for a polyline drawing tool set this property to false
    tool.isEnabled = false;
    // install as first mouse-down-tool
    myDiagram.toolManager.mouseDownTools.insertAt(0, tool);

    document.getElementById("selectShape").onclick = () => mode(false);
    document.getElementById("drawStage").onclick = () => mode(true, true);
    document.getElementById("finishDrawing").onclick = () => finish(true);
    
    function mode(draw, polygon) {
        // assume PolygonDrawingTool is the first tool in the mouse-down-tools list
        var tool = myDiagram.toolManager.mouseDownTools.elt(0);
        tool.isEnabled = draw;
        tool.isPolygon = polygon;
        tool.archetypePartData.fill = (polygon ? "grey" : null);
        tool.temporaryShape.fill = (polygon ? "grey" : null);
        if (draw) myDiagram.currentTool = tool;
      }

      // this command ends the PolygonDrawingTool
  function finish(commit) {
    var tool = myDiagram.currentTool;
    if (commit && tool instanceof PolygonDrawingTool) {
      var lastInput = myDiagram.lastInput;
      if (lastInput.event instanceof window.MouseEvent) tool.removeLastPoint();  // remove point from last mouse-down
      tool.finishShape();
    } else {
      tool.doCancel();
    }
  }

  // Test Code for adding shapes and making them resizable and rotable
      // var rectangle = 
      //   $(go.Node, "Horizontal",
      //     {
      //       resizable: true,
      //       rotatable: true
      //     }, 
      
      //     $(go.Shape, "RoundedRectangle",
      //       { fill: "lightblue" })
      //   );
      
      // var circle = 
      //   $(go.Node, "Horizontal",
      //     {
      //       resizable: true,
      //       rotatable: true
      //     }, 
      
      //   $(go.Shape, "Circle",
      //   { fill: "lightgreen" })
      //   );
        
      
      // myDiagram.add(rectangle);
      // myDiagram.add(circle);

      
  }

  window.addEventListener('DOMContentLoaded', init);