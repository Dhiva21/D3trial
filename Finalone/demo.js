const buttons = document.querySelector('#drpntn')
  .addEventListener('click', event => {
    const buttonPressed = event.target.value;
    if (buttonPressed === undefined) { } // do nothing
    else { selectingElements(buttonPressed) }
  });

function rgbCodes() {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
}

function selectingElements(buttonPressed) {
  document.querySelector('div#value').firstElementChild.innerText = `Pressed Button: ${buttonPressed}`;

  const [red, green, blue] = rgbCodes(); // array destrucuring
  let elements, circles, squares, rectangles;

  if (buttonPressed === 'select') {
    circles = d3.select('.circle');
    squares = d3.select('.square');
    rectangles = d3.select('.rectangle');
  } else {
    circles = d3.selectAll('.circle');
    squares = d3.selectAll('.square');
    rectangles = d3.selectAll('.rectangle');
  }

  elements = [circles, squares, rectangles]; // destructuring

  elements.forEach(function (element) {
    element.filter(function (d, i) {
      if (buttonPressed === 'filterodd') {
        if (i % 2 === 0) {
          this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.25})`;
        }
      }
      else if (buttonPressed === 'filtereven') {
        if (i % 2 !== 0) {
          this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.25})`;
        }
      }
      else {
        this.style.fill = `rgba(${red},${green},${blue},${(i + 1) * 0.25})`;
      }
    });
  });
}