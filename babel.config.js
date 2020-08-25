module.exports = function (api) {
    const presets = [
      '@babel/preset-env',
      '@babel/preset-react'
    ];
    
    api.cache(false);
  
    return {
      presets
    };
  };
  