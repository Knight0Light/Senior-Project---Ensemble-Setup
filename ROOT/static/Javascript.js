function JSMain(){                              //MAIN FUNCTION
    //DECLARE VARIABLES

    //CREATE DIAGRAM
    const diagram = new go.Diagram("myDiagramDiv",{"undoManager.isEnabled": true});

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
    diagram.model = new go.GraphLinksModel(
    [ // a JavaScript Array of JavaScript objects, one per node;
      // the "color" property is added specifically for this app
      { key: "Alpha", color: "lightblue" },
      { key: "Beta", color: "orange" },
      { key: "Gamma", color: "lightgreen" },
      { key: "Delta", color: "pink" }
    ],
    [ // a JavaScript Array of JavaScript objects, one per link
      { from: "Alpha", to: "Beta" },
      { from: "Alpha", to: "Gamma" },
      { from: "Beta", to: "Beta" },
      { from: "Gamma", to: "Delta" },
      { from: "Delta", to: "Alpha" }
    ]);



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