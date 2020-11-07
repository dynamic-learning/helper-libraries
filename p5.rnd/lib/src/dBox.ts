class DBox {
    pos: PosType;
    size: number;
    isBeingDragged: boolean;
    isConstrained:boolean;

    static isAnyBeingDragged:boolean = false;
  
    constructor(props:BoxPropType) {
      const { pos, size } = props
      this.pos = pos;
      this.size = size;
  
      this.isBeingDragged = false;
      this.isConstrained = false;
  
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
      noFill();
      square(this.pos.x,this.pos.y, this.size);
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
  
    //////////////////////////////
    ////// Private functions ////
    ////////////////////////////
  
    private mousePressed = () => {
      if (this.isMouseInsideBox()) {
        if (!DBox.canBeDragged()) {
          return;
        }
        this.isBeingDragged = true;
      }
    };
  
    private mouseReleased = () => {
      this.isBeingDragged = false;
      DBox.setIsAnyBeingDragged(false);
    };
  
    private isMouseInsideBox() {
      return this.isPtInside(mouseX, mouseY);
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
  