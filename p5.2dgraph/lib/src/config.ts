const replaceDefaultConfig = (additionalConfig:any) => {

    if(!additionalConfig) {
        return defaultConfig;
    }

    if(additionalConfig.basicConfig) {
        defaultConfig.basicConfig = {
            ...defaultConfig.basicConfig,
            ...additionalConfig.basicConfig
        }
    }

    if(additionalConfig.colorConfig) {
        defaultConfig.colorConfig = {
            ...defaultConfig.colorConfig,
            ...additionalConfig.colorConfig
        }
    }

    if(additionalConfig.strokeWeightConfig) {
        defaultConfig.strokeWeightConfig = {
            ...defaultConfig.strokeWeightConfig,
            ...additionalConfig.strokeWeightConfig
        }
    }

    return defaultConfig;
}

const colorConfig = {
    axis: 255,
    background: 0,
    boundary: 100,
    mainGrid: [0, 90, 130],
    subGrid: 40,
    clip:0
  };
  
  const basicConfig = {
    x: 50,
    y: 50,
    w: 500,
    h: 300,
    originX: 250,
    originY: 150,
    unitX: 40,
    unitY: 40,
    unitXDivisions: 2,
    unitYDivisions: 2,
  };
  
  const strokeWeightConfig = {
    axis: 3,
    boundary: 1,
    mainGrid: 2,
    subGrid: 1,
  };
  
  let defaultConfig = {
    basicConfig,
    colorConfig,
    strokeWeightConfig,
  };