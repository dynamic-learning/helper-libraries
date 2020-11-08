class DBox {
  pos: PosType;
  size: number;
  isBeingDragged: boolean;
  isConstrained:boolean;
  mousePressedInside?: Function;
  mousePressedOutside?: Function;
  isVisible: boolean;
  fill: number | undefined;

  static isAnyBeingDragged:boolean = false;

  constructor(props:DBoxPropType) {
    const { pos, size, mousePressedInside, mousePressedOutside, fill } = props
    this.pos = pos;
    this.size = size;
    this.fill = fill;

    this.isBeingDragged = false;
    this.isConstrained = false;
    this.isVisible = false;

    this.mousePressedInside = mousePressedInside;
    this.mousePressedOutside = mousePressedOutside;

    //@ts-ignore
    _renderer.elt.addEventListener("mousedown", this.mousePressed);
    //@ts-ignore
    _renderer.elt.addEventListener("mouseup", this.mouseReleased);
  }

  //////////////////////////////
  ////// Public functions /////
  ////////////////////////////

  public display() {
    rectMode(CENTER);
    stroke(255);
    strokeWeight(1.5);
    noFill();
    if(this.isVisible) {
      if(this.fill) {
        fill(this.fill);
      }
      square(this.pos.x,this.pos.y, this.size);
    }
  }

  public drawInside(drawFn:Function) {
    drawFn({ pos:this.pos, size: this.size });
  }

  public drag() {
    if (this.isBeingDragged) {
        this.pos.x += mouseX - pmouseX;
        if (this.isConstrained) {
            this.pos.y += mouseX - pmouseX;
        } else {
            this.pos.y += mouseY - pmouseY;
        }
    }
  }

  public clearEventListeners = () => {
     //@ts-ignore
    _renderer.elt.removeEventListener("mousedown", this.mousePressed);
     //@ts-ignore
    _renderer.elt.removeEventListener("mouseup", this.mouseReleased);
  };

  public setSize = (size:number) => {
    this.size = size;
  };

  public setPos = (pos:PosType) => {
    this.pos = pos;
  };

    
  public isMouseInsideBox() {
    return this.isPtInside(mouseX, mouseY);
  };
  
  public setVisible(visible: boolean) {
    this.isVisible = visible;
  }

  //////////////////////////////
  ////// Private functions ////
  ////////////////////////////

  mousePressed = () => {
    if (this.isMouseInsideBox()) {
      if(this.mousePressedInside) {
        this.mousePressedInside();
      }
      if (!DBox.canBeDragged()) {
        return;
      }
      this.isBeingDragged = true;
    } else {
      if(this.mousePressedOutside) {
        this.mousePressedOutside();
      }
    }
  };

  private mouseReleased = () => {
    this.isBeingDragged = false;
    DBox.setIsAnyBeingDragged(false);
  };

  private isPtInside = (x:number, y:number) => {
    return (
      x < this.pos.x + this.size / 2 &&
      x > this.pos.x - this.size / 2 &&
      y < this.pos.y + this.size / 2 &&
      y > this.pos.y - this.size / 2
    );
  };

  ///////////////////////////
  //// Static method ///////
  /////////////////////////

  private static canBeDragged = () => {
    if (DBox.isAnyBeingDragged) {
      return false;
    } else {
      DBox.setIsAnyBeingDragged(true);
      return true;
    }
  };

  private static setIsAnyBeingDragged = (isAnyDragging:boolean) => {
    DBox.isAnyBeingDragged = isAnyDragging;
  };
}