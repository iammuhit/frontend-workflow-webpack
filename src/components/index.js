const pages = require.context('./pages', true, /\.twig$/);

// Load the required pages
pages.keys().forEach(pages);