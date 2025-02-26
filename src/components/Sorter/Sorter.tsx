import { useAppSelector } from '@/store/hooks';
import FormSelect from '../ui/FormSelect/FormSelect';
import SorterSlider from '../ui/SorterSlider/SorterSlider';
import SelectedFilterItem from '../ui/SelectedFilterItem/SelectedFilterItem';

const Sorter: React.FC = () => {
  const filterList = useAppSelector((state) => state.filter.filterList);
  return (
    <div
      className={`w-full flex items-center my-2 ${
        filterList.length > 0 ? 'justify-between' : 'justify-end'
      }`}
    >
      <div className="flex gap-3 flex-wrap max-w-[70%] ">
        {filterList.length > 0 &&
          filterList.map((item) => (
            <SelectedFilterItem key={item.id} {...item} />
          ))}
      </div>
      <div className="flex gap-2">
        <FormSelect />
        <SorterSlider />
      </div>
    </div>
  );
};
export default Sorter;
