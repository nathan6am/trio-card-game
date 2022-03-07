import React from 'react'




function RenderSymbol ({card}) {

  const paths = {
    diamond: {
      d: "M25 0 L50 50 L25 100 L0 50 Z",
    },
    squiggle: {
      d: "M38.4,63.4c0,16.1,11,19.9,10.6,28.3c-0.5,9.2-21.1,12.2-33.4,3.8s-15.8-21.2-9.3-38c3.7-7.5,4.9-14,4.8-20 c0-16.1-11-19.9-10.6-28.3C1,0.1,21.6-3,33.9,5.5s15.8,21.2,9.3,38C40.4,50.6,38.5,57.4,38.4,63.4z",
    },
    oval: {
      d: "M25,99.5C14.2,99.5,5.5,90.8,5.5,80V20C5.5,9.2,14.2,0.5,25,0.5S44.5,9.2,44.5,20v60 C44.5,90.8,35.8,99.5,25,99.5z",
    },
  };
  const colors = {
    pink: "#FFC0CB",
    green: "#27ae60",
    blue: "#0000FF",
  };
  
  
  
  

  const path = paths[card.shape]
  const color = colors[card.color]
  const fills = {
    empty: "none",
    striped: "url(#striped)",
    solid: color
  }
  const fill = fills[card.fill]
  
  return (
    <>
    
    <div className="flex items-center justify-center">
    {
      [...Array(card.count)].map((e, idx) => {
        return (
          <svg viewBox="-2 -2 54 104" height="100%" key={idx}>
      <path style={{stroke: color}} d={path.d} fill={fill}> </path>
    <pattern id="striped" patternUnits="userSpaceOnUse" width="4" height="4">
      <path d="M-1,1 H5" style={{stroke:color, strokeWidth:1}} />
    </pattern>
    </svg>
        )
      })
    }
    </div>



    </>
  )
}

export default function Card() {
  const testCard = {
    count: 2,
    shape: 'squiggle',
    color: 'pink',
    fill: 'solid',
    id: '2emptypinksquiggle'
  }
  return (
    <div className="flex w-96 h-72 shadow-lg p-8 rounded-xl m-5 bg-neutral-50">
      
      <RenderSymbol card={testCard} />
      
    </div>
  )
}


{/* <pattern id="striped-red" patternUnits="userSpaceOnUse" width="4" height="4">
    <path d="M-1,1 H5" style="stroke:#e74c3c; stroke-width:1" />
  </pattern> */}

// Display a card based on card object
// function drawCard(card) {
//   let shapes = "";
//   var attr = paths[card.shape];
//   if (card.fill == "striped") {
//     attr.fill = "url(#striped-" + card.color + ")";
//   } else if (card.fill == "open") {
//     attr.fill = "none";
//   } else if (card.fill == "solid") {
//     attr.fill = colors[card.color];
//   }
//   for (var i = 0; i < card.number; i++) {
//     shapes += '<svg viewbox="-2 -2 54 104">' + makeSVG("path", attr) + "</svg>";
//   }
//   var $card = $("<div />", {
//     class: "card fill-" + card.color,
//     html: '<div class="card-content">' + shapes + "</div>",
//   })
//     .data("color", card.color)
//     .data("shape", card.shape)
//     .data("number", card.number)
//     .data("fill", card.fill);
//   return $card;
// }
