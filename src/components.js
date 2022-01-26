'use strict';

// Load the required templates
const templates = require.context('./templates', true, /index.js$/);
templates.keys().forEach(templates);
