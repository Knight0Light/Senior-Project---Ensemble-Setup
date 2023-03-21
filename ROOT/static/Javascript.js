function JSMain(){                              //MAIN FUNCTION
    //DECLARE VARIABLES

    //CREATE DIAGRAM
    window.diagram = new go.Diagram("myDiagramDiv",{"undoManager.isEnabled": true});

    //DEFINE NODE TEMPLATE
    diagram.nodeTemplate =
      new go.Node("Auto")  // the Shape will go around the TextBlock
        .add(new go.Shape("RoundedRectangle")
        // Shape.fill is bound to Node.data.color
        .bind("fill", "color"))
        .add(new go.TextBlock({ margin: 8}) // Specify a margin to add some room around the text
        // TextBlock.text is bound to Node.data.key
        .bind("text", "key"));

    //DEFINE MODEL
    diagram.model = new go.Model([]);

}//end JSMain



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



function addSquare() {                          //ADD SQUARE
    diagram.add(
    new go.Node("Auto")
        .add(new go.Shape("RoundedRectangle", {
            fill: "lightblue",
            strokeWidth: 3
        }))
        .add(new go.TextBlock(" ", {
            margin: 5
        }))
    );
}//end addSquare

function addCircle() {
    diagram.add(
    new go.Node("Auto")
        .add(new go.Shape("Ellipse", {
            fill: "red",
            strokeWidth: 3
        }))
        .add(new go.TextBlock(" ", {
            margin: 5
        }))
    );
}

function addTriangle() {
    diagram.add(
    new go.Node("Auto")
        .add(new go.Shape("TriangleUp", {
            fill: "green",
            strokeWidth: 3
        }))
        .add(new go.TextBlock(" ", {
            margin: 5
        }))
    );
}