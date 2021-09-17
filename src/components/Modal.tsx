import { ModalInterface } from "../interfaces/ModalInterface";

const Modal = ({ message, cb }: ModalInterface) => (
  <div className="flex flex-col absolute z-10 m-auto w-72 h-32 overflow-hidden rounded-md bg-white shadow-md">
    <div className="m-auto font-bold text-4xl text-gray-700">{message}</div>
    <button
      onClick={() => cb()}
      className="p-2 pointer bg-yellow-500 text-yellow-800"
    >
      REMATCH
    </button>
  </div>
);

export default Modal;
