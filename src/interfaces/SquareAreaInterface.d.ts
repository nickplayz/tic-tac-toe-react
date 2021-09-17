import { OccupantTypes } from "./enums/OccupantTypes";

export interface SquareAreaInterface {
    id: number;
    isOccupied: boolean;
    currentOccupant?: OccupantTypes;
    showPlayerHover?: OccupantTypes; 
    onClickHandler: Function;
}