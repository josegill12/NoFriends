"use client";

import { CartProduct } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps {
  cartCounter?: boolean;
  CartProduct: CartProduct;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyles = "border-[1.2px] border-slate-300 px-2 rounded";

const SetQuantity: React.FC<SetQtyProps> = ({
  CartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
  cartCounter = false,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
      <div
        className="flex
        gap-4
        items-center
        text-base
      "
      >
        <button onClick={handleQtyDecrease} className={btnStyles}>
          -
        </button>
        <div>{CartProduct.quantity}</div>
        <button onClick={handleQtyIncrease} className={btnStyles}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
