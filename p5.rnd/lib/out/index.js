"use strict";
var DBox = /** @class */ (function () {
    function DBox(props) {
        var _this = this;
        this.clearEventListeners = function () {
            //@ts-ignore
            _renderer.elt.removeEventListener("mousedown", _this.mousePressed);
            //@ts-ignore
            _renderer.elt.removeEventListener("mouseup", _this.mouseReleased);
        };
        this.setSize = function (size) {
            _this.size = size;
        };
        this.setPos = function (pos) {
            _this.pos = pos;
        };
        //////////////////////////////
        ////// Private functions ////
        ////////////////////////////
        this.mousePressed = function () {
            if (_this.isMouseInsideBox()) {
                if (_this.mousePressedInside) {
                    _this.mousePressedInside();
                }
                if (!DBox.canBeDragged()) {
                    return;
                }
                _this.isBeingDragged = true;
            }
            else {
                if (_this.mousePressedOutside) {
                    _this.mousePressedOutside();
                }
            }
        };
        this.mouseReleased = function () {
            _this.isBeingDragged = false;
            DBox.setIsAnyBeingDragged(false);
        };
        this.isPtInside = function (x, y) {
            return (x < _this.pos.x + _this.size / 2 &&
                x > _this.pos.x - _this.size / 2 &&
                y < _this.pos.y + _this.size / 2 &&
                y > _this.pos.y - _this.size / 2);
        };
        var pos = props.pos, size = props.size, mousePressedInside = props.mousePressedInside, mousePressedOutside = props.mousePressedOutside, fill = props.fill;
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
    DBox.prototype.display = function () {
        rectMode(CENTER);
        stroke(255);
        strokeWeight(1.5);
        noFill();
        if (this.isVisible) {
            if (this.fill) {
                fill(this.fill);
            }
            square(this.pos.x, this.pos.y, this.size);
        }
    };
    DBox.prototype.drawInside = function (drawFn) {
        drawFn({ pos: this.pos, size: this.size });
    };
    DBox.prototype.drag = function () {
        if (this.isBeingDragged) {
            this.pos.x += mouseX - pmouseX;
            if (this.isConstrained) {
                this.pos.y += mouseX - pmouseX;
            }
            else {
                this.pos.y += mouseY - pmouseY;
            }
        }
    };
    DBox.prototype.isMouseInsideBox = function () {
        return this.isPtInside(mouseX, mouseY);
    };
    ;
    DBox.prototype.setVisible = function (visible) {
        this.isVisible = visible;
    };
    DBox.isAnyBeingDragged = false;
    ///////////////////////////
    //// Static method ///////
    /////////////////////////
    DBox.canBeDragged = function () {
        if (DBox.isAnyBeingDragged) {
            return false;
        }
        else {
            DBox.setIsAnyBeingDragged(true);
            return true;
        }
    };
    DBox.setIsAnyBeingDragged = function (isAnyDragging) {
        DBox.isAnyBeingDragged = isAnyDragging;
    };
    return DBox;
}());
var RndBox = /** @class */ (function () {
    function RndBox(props) {
        var _this = this;
        this.setPosOfRBox = function () {
            _this.rBox.setPos({
                x: _this.dBox.pos.x + _this.dBox.size / 2,
                y: _this.dBox.pos.y + _this.dBox.size / 2,
            });
        };
        this.dBoxMousePressedInside = function () {
            _this.dBox.setVisible(true);
            _this.rBox.setVisible(true);
        };
        this.dBoxMousePressedOutside = function () {
            if (!_this.rBox.isMouseInsideBox()) {
                _this.dBox.setVisible(false);
                _this.rBox.setVisible(false);
            }
        };
        var pos = props.pos, size = props.size;
        this.rBox = new DBox({ pos: pos, size: 12, fill: 255 });
        this.dBox = new DBox({
            pos: pos,
            size: size,
            mousePressedInside: this.dBoxMousePressedInside,
            mousePressedOutside: this.dBoxMousePressedOutside,
        });
        this.rBox.isConstrained = true;
        this.dragCalled = false;
        this.resizeCalled = false;
        this.selected = false;
        // Set pos of RBox initially
        this.setPosOfRBox();
    }
    ////////////////////////////
    ///// Public methods //////
    //////////////////////////
    RndBox.prototype.display = function () {
        this.dBox.display();
        if (this.resizeCalled) {
            this.rBox.display();
        }
    };
    RndBox.prototype.drawInside = function (drawFn) {
        this.dBox.drawInside(drawFn);
    };
    RndBox.prototype.drag = function () {
        this.dragCalled = true;
        this.dragDBox();
    };
    RndBox.prototype.resize = function () {
        this.resizeCalled = true;
        this.dragRBox();
    };
    ////////////////////////////
    ///// Private methods //////
    //////////////////////////
    RndBox.prototype.dragDBox = function () {
        if (this.dragCalled) {
            this.dBox.drag();
            if (this.dBox.isBeingDragged) {
                this.setPosOfRBox();
            }
        }
    };
    RndBox.prototype.dragRBox = function () {
        if (this.resizeCalled) {
            this.rBox.drag();
            if (this.rBox.isBeingDragged) {
                this.dBox.setSize(2 * (this.rBox.pos.x - this.dBox.pos.x));
            }
        }
    };
    return RndBox;
}());
