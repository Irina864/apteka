import { Medicine } from '@/store/productsSlice';

interface CardItemProps {
  product: Medicine;
}

const CardItem: React.FC<CardItemProps> = ({ product }) => {
  return (
    <div className="flex flex-col   rounded-xl h-450px w-full p-3 bg-white hover:shadow-xl">
      <div className="w-full h-auto relative">
        <img
          src={product.image}
          className="w-full h-auto"
          alt="product-image"
        />
        {product.characteristics.isByPrescription && (
          <div className="bg-pink-100 bg-opacity-70 px-2 text-pink-600 text-xs leading-6 bottom-0 left-0 absolute rounded-md z-10">
            По рецепту
          </div>
        )}
      </div>
      {product.price && (
        <div className="text-black text-base  my-3 font-bold">
          {product.price} р.
        </div>
      )}
      <div className="text-black block mb-3 h-14 text-sm font-normal overflow-hidden break-words hyphens-auto break-word">
        {product.title}
      </div>
      <div className="text-gray-400  h-8 mb-3 overflow-hidden relative text-xs">
        {product.characteristics.brand}, {product.characteristics.country}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="bg-blue-500 rounded-lg text-white py-2 px-18px w-full hover:bg-blue-800"
        >
          В корзину
        </button>
        <button
          type="button"
          className="flex items-center justify-center rounded-md hover:bg-pink-100 px-1"
          aria-label="В избранное"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.2124 4.67558L12.2124 4.6756L12.3651 4.80089L12.9995 5.32133L13.6338 4.80086L13.7864 4.67558C13.7864 4.67557 13.7864 4.67557 13.7865 4.67557C15.1958 3.51922 16.646 2.97461 18.14 2.97461C21.2635 2.97461 23.7957 5.50677 23.7957 8.6304C23.7957 13.1794 20.4289 17.9102 12.9992 22.8267C5.56976 17.9102 2.20312 13.1794 2.20312 8.6304C2.20312 5.5068 4.73533 2.97461 7.85894 2.97461C9.35279 2.97461 10.8031 3.51922 12.2124 4.67558Z"
              stroke="#6E7E96"
              strokeWidth="2"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardItem;
