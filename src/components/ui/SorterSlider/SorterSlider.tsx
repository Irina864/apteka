import { updateCardsState } from '@/store/filterSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const SorterSlider: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardsState: number = useAppSelector((state) => state.filter.cardsState);

  return (
    <div className="flex gap-1 bg-white p-1 rounded-lg">
      <div
        onClick={() => dispatch(updateCardsState({ cardsState: 0 }))}
        className={`grid grid-rows-2 grid-cols-2 gap-1 p-2 rounded-md ${
          cardsState === 0 ? 'bg-blue-500' : 'bg-transparent'
        }`}
      >
        <div
          className={`w-2 h-2 ${cardsState === 0 ? 'bg-white' : 'bg-gray-600'}`}
        ></div>
        <div
          className={`w-2 h-2 ${cardsState === 0 ? 'bg-white' : 'bg-gray-600'}`}
        ></div>
        <div
          className={`w-2 h-2 ${cardsState === 0 ? 'bg-white' : 'bg-gray-600'}`}
        ></div>
        <div
          className={`w-2 h-2 ${cardsState === 0 ? 'bg-white' : 'bg-gray-600'}`}
        ></div>
      </div>
      <div
        onClick={() => dispatch(updateCardsState({ cardsState: 1 }))}
        className={`grid grid-rows-3 grid-cols-1 gap-1 p-2 rounded-md ${
          cardsState !== 0 ? 'bg-blue-500' : 'bg-transparent'
        }`}
      >
        <div
          className={`w-5 h-1 ${cardsState !== 0 ? 'bg-white' : 'bg-gray-600'}`}
        ></div>
        <div
          className={`w-5 h-1 ${cardsState !== 0 ? 'bg-white' : 'bg-gray-600'}`}
        ></div>
        <div
          className={`w-5 h-1 ${cardsState !== 0 ? 'bg-white' : 'bg-gray-600'}`}
        ></div>
      </div>
    </div>
  );
};
export default SorterSlider;
