'use strict';

// Load the required components
const components = require.context('./components', true, /index.js$/);
components.keys().forEach(components);
