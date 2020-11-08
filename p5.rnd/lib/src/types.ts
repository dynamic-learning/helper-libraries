interface PosType {
    x:number,
    y:number
}

interface DBoxPropType {
    pos: PosType,
    size: number,
    mousePressedInside?: Function,
    mousePressedOutside?: Function,
    fill?:number,
}

interface RndBoxPropType {
    pos: PosType,
    size: number,
    visibleOnSelection: boolean
}