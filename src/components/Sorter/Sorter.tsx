import { useAppSelector } from '@/store/hooks';
import FilterItem from '../ui/FilterItem/FilterItem';
import FormSelect from '../ui/FormSelect/FormSelect';
import SorterItem from '../ui/SorterItem/SorterItem';

const Sorter: React.FC = () => {
  const filterList = useAppSelector((state) => state.filter.filterList);
  return (
    <div
      className={` w-full flex  items-center bg-slate-500 ${
        filterList.length > 0 ? 'justify-between' : 'justify-end'
      }`}
    >
      {filterList.map((item: string, index: number) => (
        <FilterItem filter={item} key={index} />
      ))}
      <div className="flex gap-2">
        <FormSelect />
        <SorterItem />
      </div>
    </div>
  );
};
export default Sorter;
