import { IFilterObject, removeFilter } from '@/store/filterSlice';
import { useAppDispatch } from '@/store/hooks';

const SelectedFilterItem: React.FC<IFilterObject> = ({ id, value }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      key={id}
      className="flex gap-3 items-center bg-indigo-200 p-3 rounded-2xl"
    >
      <span className="flex items-center ">{value}</span>
      <button
        onClick={() => dispatch(removeFilter({ filter: id }))}
        className="flex items-center justify-center"
      >
        <img src="/Close_round.svg" alt="remove" />
      </button>
    </div>
  );
};

export default SelectedFilterItem;
