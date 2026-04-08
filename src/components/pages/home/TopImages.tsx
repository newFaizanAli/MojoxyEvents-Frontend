
interface imgProps {
    src: string
    alt: string
    className: string
    wrapper?: string
    group?: boolean
    xl?: boolean
}

const TopImages = () => {
    const images: imgProps[] = [
        {
            src: "https://cdn2.futurepedia.io/2024-11-26T18-51-51.356Z-MtXWJEI4O08DkXhcFo8z7VXOEe00XPWLb.webp?w=1920",
            alt: "celebrity",
            className: "max-w-64 min-w-64 min-h-[25rem] rounded-t-full"
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA-06Ak-c3_7qvGUQdyv5OAaeDw9AUQdZwscBtQwg-WKKT1uvVT_RwqtM3HKFED8_yp4E&usqp=CAU",
            alt: "live band",
            className: "max-w-[17rem] min-w-[17rem] min-h-64 rounded-t-full rounded-bl-full",
            wrapper: "flex-col justify-end gap-4",
            group: true
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd9IQDaDJGQZ8slno899SDqtzLqYtPYp0dHWaC8TqZPWwBVIcdxSFkqpi_yxQhI2s02Ao&usqp=CAU",
            alt: "comedian",
            className: "max-w-[17rem] min-w-[17rem] h-40 rounded-md object-top",
            group: true
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvXF-GBWIjTZI4_BhnF_nRwzzSoFT7ankNIw&s",
            alt: "anchor",
            className: "max-w-[17rem] min-w-[17rem] min-h-[22rem] rounded-tl-[150px]"
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6nQrJr_n6tn2D0xkdPR3dz1CS_2ej2z1KVbithDmW0whW1vkD117f6MYKFPTbGdooLhI&usqp=CAU",
            alt: "singer",
            className: "max-w-[17rem] min-w-[17rem] min-h-56 rounded-l-full",
            wrapper: "xl:flex mt-20 flex-col items-end gap-4",
            xl: true
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqA5RNPaZEIprcO4RM3y_tJ1nds15BzJyPbQ&s",
            alt: "dj",
            className: "max-w-[17rem] min-w-[17rem] min-h-56",
            xl: true
        }
    ];

    const renderImage = (img: imgProps, idx: number) => (
        <div key={idx} className={`relative overflow-hidden ${img.className}`}>
            <img
                alt={img.alt}
                className="object-cover w-full h-full absolute inset-0"
                src={img.src}
                loading="lazy"
                decoding="async"
            />
        </div>
    );

    return (
        <div className="hidden md:flex justify-center items-center gap-4">
            <div className="flex flex-wrap gap-4 w-fit">
                {renderImage(images[0], 0)}

                <div className="flex flex-col justify-end gap-4">
                    {renderImage(images[1], 1)}
                    {renderImage(images[2], 2)}
                </div>

                {renderImage(images[3], 3)}

                <div className="hidden xl:flex mt-20 flex-col items-end gap-4">
                    {renderImage(images[4], 4)}
                    {renderImage(images[5], 5)}
                </div>
            </div>
        </div>
    );
};

export default TopImages;