"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var replaceDefaultConfig = function (additionalConfig) {
    if (!additionalConfig) {
        return defaultConfig;
    }
    if (additionalConfig.basicConfig) {
        defaultConfig.basicConfig = __assign(__assign({}, defaultConfig.basicConfig), additionalConfig.basicConfig);
    }
    if (additionalConfig.colorConfig) {
        defaultConfig.colorConfig = __assign(__assign({}, defaultConfig.colorConfig), additionalConfig.colorConfig);
    }
    if (additionalConfig.strokeWeightConfig) {
        defaultConfig.strokeWeightConfig = __assign(__assign({}, defaultConfig.strokeWeightConfig), additionalConfig.strokeWeightConfig);
    }
    return defaultConfig;
};
var colorConfig = {
    axis: 255,
    background: 0,
    boundary: 100,
    mainGrid: [0, 90, 130],
    subGrid: 40,
    clip: 0
};
var basicConfig = {
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
var strokeWeightConfig = {
    axis: 3,
    boundary: 1,
    mainGrid: 2,
    subGrid: 1,
};
var defaultConfig = {
    basicConfig: basicConfig,
    colorConfig: colorConfig,
    strokeWeightConfig: strokeWeightConfig,
};
var isScrolling;
var Graph2D = /** @class */ (function () {
    function Graph2D(config) {
        var _this = this;
        this.getX = function (xPixel) {
            return (xPixel - _this.pos.x - _this.origin.x) / _this.unitX;
        };
        this.getY = function (yPixel) {
            return (yPixel - _this.pos.y - _this.origin.y) / -_this.unitY;
        };
        this.getXPixel = function (x) {
            return _this.pos.x + _this.origin.x + x * _this.unitX;
        };
        this.getYPixel = function (y) {
            return _this.pos.y + _this.origin.y - y * _this.unitY;
        };
        this.handleScroll = function (e) {
            if (!_this.isZooming) {
                _this.isZooming = true;
                _this.setZoomStartOrigin();
            }
            _this.resetZoomParamsWhenScrollFinished();
            var xp = e.offsetX - _this.pos.x;
            var yp = e.offsetY - _this.pos.y;
            if (!_this.isPtWithinGraph(xp, yp)) {
                return;
            }
            if (e.deltaY >= 0) {
                _this.zoomOnScroll("in", xp, yp);
            }
            else {
                _this.zoomOnScroll("out", xp, yp);
            }
        };
        this.setZoomStartOrigin = function () {
            _this.zoomStartOriginX = _this.origin.x;
            _this.zoomStartOriginY = _this.origin.y;
        };
        this.resetZoomParamsWhenScrollFinished = function () {
            clearTimeout(isScrolling);
            isScrolling = setTimeout(function () {
                _this.isZooming = false;
                _this.unitX0 = _this.unitX;
                _this.unitY0 = _this.unitY;
            }, 100);
        };
        this.isPtWithinGraph = function (x, y) {
            return _this.isXWithinGraph(x - _this.pos.x) && _this.isYWithinGraph(y - _this.pos.y);
        };
        config = replaceDefaultConfig(config);
        var basicConfig = config.basicConfig, colorConfig = config.colorConfig, strokeWeightConfig = config.strokeWeightConfig;
        var x = basicConfig.x, y = basicConfig.y, w = basicConfig.w, h = basicConfig.h, originX = basicConfig.originX, originY = basicConfig.originY, unitX = basicConfig.unitX, unitY = basicConfig.unitY, unitXDivisions = basicConfig.unitXDivisions, unitYDivisions = basicConfig.unitYDivisions;
        var axisColor = colorConfig.axis, backgroundColor = colorConfig.background, boundaryColor = colorConfig.boundary, mainGridColor = colorConfig.mainGrid, subGridColor = colorConfig.subGrid, clipColor = colorConfig.clip;
        var axisStrokeWeight = strokeWeightConfig.axis, boundaryStrokeWeight = strokeWeightConfig.boundary, mainGridStrokeWeight = strokeWeightConfig.mainGrid, subGridStrokeWeight = strokeWeightConfig.subGrid;
        this.origin = createVector();
        this.pos = createVector();
        this.w = w;
        this.h = h;
        this.unitX = unitX;
        this.unitY = unitY;
        this.origin.set(originX, originY);
        this.pos.set(x, y);
        this.unitXDivisions = unitXDivisions;
        this.unitYDivisions = unitYDivisions;
        this.axisColor = axisColor;
        this.backgroundColor = backgroundColor;
        this.boundaryColor = boundaryColor;
        this.mainGridColor = mainGridColor;
        this.subGridColor = subGridColor;
        this.clipColor = clipColor;
        this.axisStrokeWeight = axisStrokeWeight;
        this.boundaryStrokeWeight = boundaryStrokeWeight;
        this.mainGridStrokeWeight = mainGridStrokeWeight;
        this.subGridStrokeWeight = subGridStrokeWeight;
        // Additional properties that are not accepted from user
        this.isZooming = false;
        this.zoomStartOriginX = originX;
        this.zoomStartOriginY = originY;
        this.unitX0 = unitX;
        this.unitY0 = unitY;
        this.isZoomEnabled = false;
        //@ts-ignore
        _curElement.mouseWheel(this.handleScroll);
    }
    ///////////////////////////////////////
    ////////// Public methods ////////////
    /////////////////////////////////////
    /**
     * Draws the graph bounding box with axes
     */
    Graph2D.prototype.display = function () {
        push();
        //@ts-ignore
        translate(this.pos.x, this.pos.y);
        stroke(0);
        this.drawBoundingRect();
        this.drawAxes();
        pop();
    };
    /**
     * Draws the main grid in the graph
     */
    Graph2D.prototype.drawMainGrid = function () {
        push();
        stroke(this.mainGridColor);
        strokeWeight(this.mainGridStrokeWeight);
        translate(this.pos.x, this.pos.y);
        this.drawMainVerticalGridLines();
        this.drawMainHorizontalGridLines();
        pop();
    };
    Graph2D.prototype.drawSubGrid = function () {
        push();
        stroke(this.subGridColor);
        strokeWeight(this.subGridStrokeWeight);
        translate(this.pos.x, this.pos.y);
        this.drawVerticalSubGridLines();
        this.drawHorizontalSubGridLines();
        pop();
    };
    /**
     * To activate the pan feature in the graph
     * Call inside draw loop
     */
    Graph2D.prototype.pan = function () {
        if (mouseIsPressed && this.isPtWithinGraph(mouseX, mouseY)) {
            this.origin.x += mouseX - pmouseX;
            this.origin.y += mouseY - pmouseY;
        }
    };
    Graph2D.prototype.zoom = function () {
        this.disableZoomIfTimeout();
    };
    Graph2D.prototype.clip = function () {
        noStroke();
        fill(this.clipColor);
        rect(0, 0, width, this.pos.y);
        rect(0, 0, this.pos.x, height);
        rect(this.pos.x + this.w, 0, width - (this.pos.x + this.w), height);
        rect(0, this.pos.y + this.h, width, height - (this.pos.y + this.h));
    };
    ///////////////////////////////////////
    ////////// Private methods ///////////
    /////////////////////////////////////
    Graph2D.prototype.drawBoundingRect = function () {
        fill(this.backgroundColor);
        strokeWeight(this.boundaryStrokeWeight);
        stroke(this.boundaryColor);
        rect(0, 0, this.w, this.h);
    };
    Graph2D.prototype.drawAxes = function () {
        stroke(this.axisColor);
        strokeWeight(this.axisStrokeWeight);
        this.drawVerticalGridLine(this.origin.x);
        this.drawHorizontalGridLine(this.origin.y);
    };
    Graph2D.prototype.drawMainVerticalGridLines = function () {
        var xStart = this.origin.x + this.unitX;
        var xEnd = this.w;
        for (var x = xStart; x < xEnd; x += this.unitX) {
            this.drawVerticalGridLine(x);
        }
        xStart = this.origin.x - this.unitX;
        xEnd = 0;
        for (var x = xStart; x > xEnd; x -= this.unitX) {
            this.drawVerticalGridLine(x);
        }
    };
    Graph2D.prototype.drawMainHorizontalGridLines = function () {
        var yStart = this.origin.y + this.unitY;
        var yEnd = this.h;
        for (var y = yStart; y < yEnd; y += this.unitY) {
            this.drawHorizontalGridLine(y);
        }
        yStart = this.origin.y - this.unitY;
        yEnd = 0;
        for (var y = yStart; y > yEnd; y -= this.unitY) {
            this.drawHorizontalGridLine(y);
        }
    };
    Graph2D.prototype.drawVerticalSubGridLines = function () {
        var step = this.unitX;
        // To avoid zero division error
        if (this.unitXDivisions !== 0)
            step = this.unitX / this.unitXDivisions;
        var xStart = this.origin.x + step;
        var xEnd = this.w;
        for (var x = xStart, counter = 1; x < xEnd; x += step, counter++) {
            // Counter to ensure sub grid lines are not drawn over
            // main grid lines
            if (counter % this.unitXDivisions !== 0) {
                this.drawVerticalGridLine(x);
            }
        }
        xStart = this.origin.x - step;
        xEnd = 0;
        for (var x = xStart, counter = 1; x > xEnd; x -= step, counter++) {
            if (counter % this.unitXDivisions !== 0) {
                this.drawVerticalGridLine(x);
            }
        }
    };
    Graph2D.prototype.drawHorizontalSubGridLines = function () {
        var step = this.unitY;
        if (this.unitYDivisions !== 0)
            step = this.unitY / this.unitYDivisions;
        var yStart = this.origin.y + step;
        var yEnd = this.h;
        for (var y = yStart, counter = 1; y < yEnd; y += step, counter++) {
            if (counter % this.unitYDivisions !== 0) {
                this.drawHorizontalGridLine(y);
            }
        }
        yStart = this.origin.y - step;
        yEnd = 0;
        for (var y = yStart, counter = 1; y > yEnd; y -= step, counter++) {
            if (counter % this.unitYDivisions !== 0) {
                this.drawHorizontalGridLine(y);
            }
        }
    };
    Graph2D.prototype.drawVerticalGridLine = function (x) {
        if (this.isXWithinGraph(x)) {
            line(x, 0, x, this.h);
        }
    };
    Graph2D.prototype.drawHorizontalGridLine = function (y) {
        if (this.isYWithinGraph(y)) {
            line(0, y, this.w, y);
        }
    };
    Graph2D.prototype.disableZoomIfTimeout = function () {
        var _this = this;
        clearTimeout(this.isZoomEnabled);
        this.isZoomEnabled = setTimeout(function () {
            _this.isZoomEnabled = false;
        }, 100);
    };
    /**
     *
     * @param mode Zoom in or out
     * @param xp x coordinate of pivot point
     * @param yp y coordinate of pivot point
     */
    Graph2D.prototype.zoomOnScroll = function (mode, xp, yp) {
        if (!this.isZoomEnabled) {
            return;
        }
        var scaleRate = 1;
        if (mode === "in") {
            scaleRate = 1.05;
        }
        else if (mode === "out") {
            scaleRate = 0.95;
        }
        this.unitX *= scaleRate;
        this.unitY *= scaleRate;
        var scaleX = this.unitX / this.unitX0;
        var scaleY = this.unitY / this.unitY0;
        /**
         * Logic for scaling
         *
         * The coordinates of origin is changed wrt zooming
         * New origin coordinate = Pivot coordinate + Initial origin coordinate * scaleFactor
         */
        this.origin.x = xp - (xp - this.zoomStartOriginX) * scaleX;
        this.origin.y = yp - (yp - this.zoomStartOriginY) * scaleY;
    };
    Graph2D.prototype.isXWithinGraph = function (x) {
        return x < this.w && x > 0;
    };
    Graph2D.prototype.isYWithinGraph = function (y) {
        return y < this.h && y > 0;
    };
    return Graph2D;
}());
