function JSMain(){                                  //MAIN FUNCTION
    //DECLARE VARIABLES
    var $ = go.GraphObject.make;  // $ used to make go.JS objects using the GraphObject abstract class

    //CREATE DIAGRAM        adding window makes this global, attaching it to the browser window object
    diagram = $(go.Diagram,  "diagramDiv", {"undoManager.isEnabled": true});
    diagram.toolManager.panningTool.isEnabled = false;

    //DEFINE NODE TEMPLATE
    diagram.nodeTemplate =
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
        )
    ;

    //DEFINE MODEL
    diagram.model = new go.Model([]);

    //CREATE DRAWING TOOL   defined in PolygonDrawingTool.js
    var tool = new PolygonDrawingTool();
    // provide the default JavaScript object for a new polygon in the model
    tool.archetypePartData = { fill: "grey", stroke: "black", strokeWidth: 3 };
    tool.isPolygon = true;  // for a polyline drawing tool set this property to false
    tool.isEnabled = false;
    // install as first mouse-down-tool
    diagram.toolManager.mouseDownTools.insertAt(0, tool);


    //DEFINE BUTTON LISTENERS

    document.getElementById("selectShapeButton").addEventListener("click", () => mode(false));
    document.getElementById("drawStageButton").addEventListener("click", () => mode(true, true));
    document.getElementById("finishDrawingButton").addEventListener("click", () => finish(true));

    document.getElementById("squareButton").addEventListener("click", () => addNode("RoundedRectangle","lightblue", " "));
    document.getElementById("circleButton").addEventListener("click", () => addNode("Ellipse","red"," "));
    document.getElementById("triangleButton").addEventListener("click", () => addNode("TriangleUp","green"," "));

    document.getElementById("exportButton").addEventListener("click", exportToPDF);

    document.getElementById("Connor's Test Button").addEventListener("click", () => addNode("RoundedRectangle","lightblue", " ", parseInt(document.getElementById("xtest").value), parseInt(document.getElementById("ytest").value), parseInt(document.getElementById("sizetest").value)));

    //DEFINE FUNCTIONS
    function exportToPDF(){                         //EXPORT BUTTON
        var image = document.getElementById("D&D_body");
        //8.5x11 paper has 2550x3300 pixel size
        image.style.width = "2550px";
        image.style.height = "900px";
        //set file options
        var options = {
            margin:     0.5,
            filename:   "stage_setup_app.pdf",
            image:      {type: "jpeg", quality: 1},
            html2canvas:{scale: 1},
            jsPDF:      {unit: "in", format: "letter", orientation: "portrait", precision: "12"}
        };
        html2pdf().set(options).from(image).save();
    }//end exportToPDF

    //New function for adding shapes
    function addNode(nodeType, color, text= " "){
        diagram.add(
            new go.Node("Auto")
                .add(new go.Shape(nodeType, {
                    fill: color,
                    strokewidth: 3
                }))
                .add(new go.TextBlock(text, {
                    margin: 5
                }))
        );
    }

    //New function for adding shapes at a specific x,y
    function addNode(nodeType, color, text= " ", xcord, ycord, size){
        var node = new go.Node("Auto")
            .add(new go.Shape(nodeType, {
                //geometry: new go.Geometry(startX=xcord, startY=ycord, endX=xcord+size, endY=ycord+size),
                width: size,
                height: size,
                fill: color,
                strokewidth: 3
            }))
            .add(new go.TextBlock(text, {
                margin: 5
            }))
        node.location = new go.Point(xcord, ycord);
        diagram.add(node);
    }

    function mode(draw, polygon) {
        // assume PolygonDrawingTool is the first tool in the mouse-down-tools list
        var tool = diagram.toolManager.mouseDownTools.elt(0);
        tool.isEnabled = draw;
        tool.isPolygon = polygon;
        tool.archetypePartData.fill = (polygon ? "grey" : null);
        tool.temporaryShape.fill = (polygon ? "grey" : null);
        if (draw) diagram.currentTool = tool;
    }

    // this command ends the PolygonDrawingTool
    function finish(commit) {
        var tool = diagram.currentTool;
        if (commit && tool instanceof PolygonDrawingTool) {
            var lastInput = diagram.lastInput;
            if (lastInput.event instanceof window.MouseEvent) tool.removeLastPoint();  // remove point from last mouse-down
            tool.finishShape();
        }
        else {
            tool.doCancel();
        }
    }

}//end JSMain



//call the Main when the html page is done loading
window.addEventListener('DOMContentLoaded', JSMain);