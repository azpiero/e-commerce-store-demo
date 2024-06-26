'use client';

import { Product } from '@/types';
import Image from 'next/image';
import { Expand, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';

interface ProductCardProps {
  data: Product;
}

/**
 * Group-hoverも勉強になるう
 * @param param0
 * @returns
 */
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();
  const previoewModal = usePreviewModal();
  const cart = useCart();
  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    previoewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4' onClick={handleClick}>
      <div className='aspect-square rounded-xl bg-gray-100 relative'>
        <Image src={data?.images?.[0]?.url} fill alt='Image' className='aspect-square object-cover rounded-md' />
        <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <IconButton onClick={onPreview} icon={<Expand size={20} className='text-gray-600' />} />
            <IconButton onClick={onAddToCart} icon={<ShoppingCart size={20} className='text-gray-600' />} />
          </div>
        </div>
      </div>
      {/** description */}
      <div>
        <p className='font-semibold text-lg'>{data.name}</p>
        <p className='text-sm text-gray-500'>{data.category?.name}</p>
      </div>
      {/** price */}
      <div className='flex justify-between items-center'>
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
