import React from "react";
import Image from "next/image";
interface ProductDetailsTabProps {
  productId: string;
  overview: { description: string; images: string[] };
}

const ProductGallery = ({ overview }: ProductDetailsTabProps) => {
  // Split images into chunks of 4
  const chunks: string[][] = [];
  for (let i = 0; i < (overview?.images?.length || 0); i += 4) {
    chunks.push(overview.images.slice(i, i + 4));
  }

  return (
    <div className="flex flex-col space-y-6">
      {chunks.map((chunk, i) => (
        <div key={i} className="flex flex-col space-y-6">
          {chunk[0] && (
            <div className="h-[196px] md:aspect-[1248/713] w-full md:h-full relative">
              <Image
                src={chunk[0]}
                alt={`Image ${i * 4 + 1}`}
                fill
                className="object-cover object-center rounded-[6px]"
              />
            </div>
          )}

          {(chunk[1] || chunk[2]) && (
            <div className="flex flex-col md:flex-row w-full h-full space-y-[16px] md:space-y-0 md:space-x-[24px]">
              {chunk[1] && (
                <div className="md:aspect-[612/1064] w-full h-[600px] md:h-full relative">
                  <Image
                    src={chunk[1]}
                    alt={`Image ${i * 4 + 2}`}
                    fill
                    className="object-cover object-center rounded-[6px]"
                  />
                </div>
              )}
              {chunk[2] && (
                <div className="md:aspect-[612/1064] w-full h-[600px] md:h-full relative">
                  <Image
                    src={chunk[2]}
                    alt={`Image ${i * 4 + 3}`}
                    fill
                    className="object-cover object-center rounded-[6px]"
                  />
                </div>
              )}
            </div>
          )}

          {chunk[3] && (
            <div className="md:aspect-[1248/774] w-full h-[212px] md:h-full relative">
              <Image
                src={chunk[3]}
                alt={`Image ${i * 4 + 4}`}
                fill
                className="object-cover object-center rounded-[6px]"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const ProductDetailsTab = ({ productId, overview }: ProductDetailsTabProps) => {
  const description = overview?.description || "";
  const paragraphs = description ? description.split("\n\n") : [];
  return (
    <div className="">
      <div className="font-arial text-grayNeutralFg text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] text-neutralGray-700">
        {paragraphs.map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}
            {index < paragraphs.length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </React.Fragment>
        ))}
        <div className="mt-6">
          <ProductGallery productId={productId} overview={overview} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTab;
