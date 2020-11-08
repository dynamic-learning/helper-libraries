interface Config {
    basicConfig: BasicConfig;
    colorConfig: ColorConfig;
    strokeWeightConfig: StrokeWeightConfig;
  }
  
  interface ColorConfig {
    axis: p5.Color;
    background: p5.Color;
    boundary: p5.Color;
    mainGrid: p5.Color;
    subGrid: p5.Color;
    clip: p5.Color;
    font: p5.Color;
  }
  
  interface StrokeWeightConfig {
    axis: number;
    boundary: number;
    mainGrid: number;
    subGrid: number;
  }
  
  interface BasicConfig {
    x: number;
    y: number;
    w: number;
    h: number;
    originX: number;
    originY: number;
    unitX: number;
    unitY: number;
    unitXDivisions: number;
    unitYDivisions: number;
    fontSize: number;
  }
