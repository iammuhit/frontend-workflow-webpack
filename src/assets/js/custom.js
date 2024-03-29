import _ from 'lodash';
import Icon from '@mayarun/assets/images/favicon.png';

console.log('I get called from custom.js!');

function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'Webpack'], ' ');
    element.classList.add('hello');

    // Add the image to our existing div.
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);
  
    return element;
}
  
document.body.appendChild(component());