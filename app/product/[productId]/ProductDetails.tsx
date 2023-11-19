"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdCheckCircle } from "react-icons/md";

export type CartProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImage: SelectedImage;
  quantity: number;
  price: number;
};

export type SelectedImage = {
  color: string;
  colorCode: string;
  image: string;
};

interface ProductDetailsProps {
  product: Product & {
    reviews: Review[];
  };
}

const HorizontalLine = () => {
  return <hr className="w-[30%] mt-2 mb-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, CartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [CartProduct, setCartProduct] = useState<CartProduct>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImage: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();

  console.log(product);

  useEffect(() => {
    setIsProductInCart(false);

    if (CartProducts) {
      const existingIndex = CartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [CartProducts]);

  const handleColorSelect = useCallback(
    (value: SelectedImage) => {
      setCartProduct((prev) => {
        return { ...prev, selectedImage: value };
      });
    },
    [CartProduct.selectedImage]
  );

  const handleQtyIncrease = useCallback(() => {
    if (CartProduct.quantity === 20) {
      return toast.error("Oops! Maximum reached.");
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: ++prev.quantity };
    });
  }, [CartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (CartProduct.quantity === 1) {
      return toast.error("Oops! Minimum reached.");
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: --prev.quantity };
    });
  }, [CartProduct]);

  const ProductRating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage
        CartProduct={CartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="text-3xl font-semibold text-slate-700">
          ${product.price}
        </div>
        <div className="flex items-center gap-2">
          <Rating value={ProductRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <HorizontalLine />
        <div className="text-justify">{product.description}</div>
        <HorizontalLine />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">BRAND:</span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <HorizontalLine />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product.images}
              CartProduct={CartProduct}
              handleColorSelect={handleColorSelect}
            />
            <HorizontalLine />
            <SetQuantity
              CartProduct={CartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <HorizontalLine />
            <div className="max-w-[300px]">
              <Button
                label="Add To Cart"
                onClick={() => {
                  handleAddProductToCart(CartProduct);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
