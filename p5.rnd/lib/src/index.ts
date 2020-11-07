class RndBox {
    dBox: DBox;
    rBox: DBox;
    dragCalled: boolean;
    resizeCalled: boolean;

    constructor(props: BoxPropType) {
        const { pos, size } = props;
        this.rBox = new DBox({ pos, size: 12 });
        this.dBox = new DBox({
            pos,
            size
        });
        this.rBox.isConstrained = true;
        this.dragCalled = false;
        this.resizeCalled = false;
        // Set pos of RBox initially
        this.setPosOfRBox();
    }

    ////////////////////////////
    ///// Public methods //////
    //////////////////////////

    public display() {
        this.dBox.display();
        if (this.resizeCalled) {
            this.rBox.display();
        }
    }

    public drawInside(drawFn:Function) {
        this.dBox.drawInside(drawFn);
    }

    public drag() {
        this.dragCalled = true;
        this.dragDBox();
    }

    public resize() {
        this.resizeCalled = true;
        this.dragRBox();
    }

    ////////////////////////////
    ///// Private methods //////
    //////////////////////////

    private dragDBox() {
        if (this.dragCalled) {
            this.dBox.drag();
            if (this.dBox.isBeingDragged) {
                this.setPosOfRBox();
            }
        }
    }

    private dragRBox() {
        if (this.resizeCalled) {
          this.rBox.drag();
          if (this.rBox.isBeingDragged) {
            this.dBox.setSize(2 * (this.rBox.pos.x - this.dBox.pos.x));
          }
        }
    }

    private setPosOfRBox = () => {
        this.rBox.setPos({
            x: this.dBox.pos.x + this.dBox.size / 2,
            y: this.dBox.pos.y + this.dBox.size / 2,
        });
    }   
}