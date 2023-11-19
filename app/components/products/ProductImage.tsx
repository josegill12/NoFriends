import {
  CartProduct,
  SelectedImage,
} from "@/app/product/[productId]/ProductDetails";
import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductImageProps {
  CartProduct: CartProduct;
  product: Product;
  handleColorSelect: (value: SelectedImage) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  CartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div
      className="
        grid
        grid-cols-6
        gap-2
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
    "
    >
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        gap-4
        cursor-pointer
        border
        h-full
        max-h-[500px]
        min-h-[300px]
        sm:min-h-[400px]
        "
      >
        {product.images.map((image) => {
          return (
            <div
              key={image.color}
              onClick={() => handleColorSelect(image)}
              className={`
              relative
              w-[80%]
              aspect-square
              rounded
              border-teal-300
              ${
                CartProduct.selectedImage.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }
              `}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain"
              />
            </div>
          );
        })}
      </div>
      <div
        className="
        col-span-5
        relative
        aspect-square
        "
      >
        <Image
          fill
          sizes=""
          className="
            w-full
            h-full
            object-contain
            max-h-[500px]
            min-h-[300px]
            sm:min-h-[400px]
            "
          src={CartProduct.selectedImage.image}
          alt={CartProduct.name}
        />
      </div>
    </div>
  );
};

export default ProductImage;
