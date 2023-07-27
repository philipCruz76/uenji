import Image from 'next/image';
import { FC } from 'react';

interface CategoryCardProps {
    title: string;
    description: string;
    image: string;
    alt: string;
}

const CategoryCard: FC<CategoryCardProps> = ({ title, description, image, alt }) => {

    
    return (
        <div className='flex m-auto items-center relative h-[344px] w-[252px] bg-white rounded-lg  cursor-pointer'>
            <Image src={image} alt={alt} className='w-full h-full object-fill rounded-md' loading='lazy' width={252} height={344}/>
            <span className='flex absolute top-[15px] left-[15px] font-light text-white text-sm'> {description}</span>
            <span className='flex absolute top-[40px] left-[15px] font-semibold text-2xl text-white'>{title}</span>
        </div>
    );
}

export default CategoryCard;