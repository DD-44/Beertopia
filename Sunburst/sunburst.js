// get the data from CSV

// Defining the data for the sunburst

var myPlot = document.getElementById("myDiv"),
  hoverInfo = document.getElementById("styleText"),
  beers = d3.csv("beer_styles.csv").then(function(beers) {
    console.log(beers),
      // define var STYLE and PARENT
      (styles = beers.map(wheel => wheel.styles));
    parent = beers.map(wheel => wheel.parent);

    // Colors for each slice in the Sunburst
    beerColors = beers.map(wheel => wheel.colors);
    description = beers.map(wheel => wheel.description);
    ABV = beers.map(wheel => wheel.ABV_RANGE);
    IBU = beers.map(wheel => wheel.IBU_RANGE);
    console.log(styles); // just a check for the output
    console.log(parent); // just a check for the output
    console.log(beerColors); // just a check for the output

    data = [
      {
        type: "sunburst",
        ids: styles,
        labels: styles,
        parents: parent,
        // hovertext: description,
        meta: ABV,
        customdata: IBU,
        // hovertemplate:
        //   "<b> %{label} </b> <br>" +
        //   "<b>Parent</b>: %{parent} <br>" +
        //   "<b>ABV</b>: %{meta} <br>" +
        //   "<b>IBU</b>: %{customdata}<br>" +
        //   "<b>Sytle Info: </b> %{hovertext}",
        // fillcolors: beerColors,
        // values: [10, 14, 12, 10, 4, 6, 6, 4, 4, 3, 5, 6, 7, 6, 5, 4, 3],
        leaf: { opacity: 0.5 },
        marker: {
          colors: beerColors,
          line: { width: 2 }
        }
      }
    ];

    // layout definition
    layout = {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      paper_bgcolor: "rgba(0,0,0,0)",
      hovermode: "closest",
      width: 500,
      height: 500
    };

    Plotly.plot("myDiv", data, layout);

    myPlot
      .on("plotly_hover", function(data) {
        // var hoverInfo = document.getElementById("styleText");
        var infoText = data.points.map(function(d) {
          return d.data.labels;
          console.log(d.data.labels);
        });
        hoverInfo.append(infoText);
        //       return (d.data.name + ': x= ' + d.x + ', y= ' + d.y.toPrecision(3));

        hoverInfo.innerHTML = infoText.join("<br/>");
      })
      .on("plotly_unhover", function(data) {
        hoverInfo.innerHTML = "";
        // hoverInfo.html("");
      });
  });