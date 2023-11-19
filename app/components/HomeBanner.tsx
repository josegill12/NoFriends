import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-red-500 to-black mb-8 relative">
      <div className="container mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Winter BlowOut
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Enjoy discounts on selected items
            for new customers
          </p>
          <p className="text-2xl md:text-5xl text-yellow-400 font-bold">
            GET 75% OFF
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/ultraball-render.jpg"
            fill
            alt="Banner Image"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
