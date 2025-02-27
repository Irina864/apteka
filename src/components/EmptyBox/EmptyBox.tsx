'use client';

const EmptyBox: React.FC = () => {
  return (
    <section
      className={`w-3/4 h-96 flex flex-col items-center justify-center gap-7 bg-white rounded-lg`}
    >
      <h2 className={` text-black font-semibold text-2xl`}>
        Ничего не найдено
      </h2>
      <span className={` text-gray-400`}>
        Попробуйте сократить количество выбранных параметров фильтра.
      </span>
    </section>
  );
};
export default EmptyBox;
