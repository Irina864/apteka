'use client';
import { useAppSelector } from '@/store/hooks';
import { Medicine } from '@/store/productsSlice';
import CardItem from '../ui/CardItem/CardItem';

interface CardSectionProps {
  currentProducts: Medicine[];
}

const CardSection: React.FC<CardSectionProps> = ({ currentProducts }) => {
  const cardsState: number = useAppSelector((state) => state.filter.cardsState);
  return (
    <section
      className={`grid ${
        cardsState === 0
          ? 'grid-rows-3 grid-cols-4'
          : 'grid-rows-12 grid-cols-1'
      } gap-4 w-full h-auto `}
    >
      {currentProducts.length > 0 &&
        currentProducts.map((item: Medicine) => (
          <CardItem key={item.id} product={item} />
        ))}
    </section>
  );
};
export default CardSection;
