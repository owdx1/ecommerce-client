module.exports = function override(config, env) {
    // Make sure the 'path' module isn't being used in the front-end code
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "path": false
    };
    
    return config;
  };
  