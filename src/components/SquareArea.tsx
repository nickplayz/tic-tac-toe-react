import { SquareAreaInterface } from "../interfaces/SquareAreaInterface";

const SquareArea = ({
  id,
  isOccupied,
  currentOccupant,
  showPlayerHover,
  onClickHandler,
}: SquareAreaInterface) => {
  return (
    <div
      className={
        id % 2 === 0
          ? "flex justify-center items-center w-1/3 h-1/3 bg-blue-600"
          : "flex justify-center items-center w-1/3 h-1/3 bg-blue-700"
      }
    >
      <button
        onClick={() => onClickHandler(id)}
        className={
          !currentOccupant
            ? "text-7xl text-white text-opacity-0 hover:text-opacity-50"
            : "text-7xl text-white text-opacity-1"
        }
      >
        {!currentOccupant ? showPlayerHover : currentOccupant}
      </button>
    </div>
  );
};

export default SquareArea;
