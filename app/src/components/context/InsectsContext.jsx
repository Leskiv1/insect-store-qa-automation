import React, {createContext, useContext, useState} from 'react';
    
const InsectsContext = createContext(null);

const cards = [
    {
        id: 1,
        name: 'Swallowtail Butterfly',
        type: 'butterfly',
        batches: 12,
        price: 2,
        description: 'Add a touch of elegance to your collection with this beautiful swallowtail butterfly specimen! Vibrant colors, delicate details, and intricate patterns make it a stunning piece. Ideal for enthusiasts, nature lovers, or as a unique gift.'
    },
    {
        id: 2,
        name: 'Japanese Honey Bee',
        type: 'bee',
        batches: 7,
        price: 1,
        description: 'Enhance your collection with this carefully preserved Japanese honey bee specimen! Showcasing fine details and natural beauty, it’s ideal for collectors, educators, or anyone intrigued by pollinators.'
    },
    {
        id: 3,
        name: 'Gray Ladybug',
        type: 'ladybug',
        batches: 2,
        price: 3,
        description: 'Add a dash of luck to your collection with this beautifully preserved gray ladybird! Known for its vibrant red and iconic black spots, it’s perfect for collectors, educators, or nature lovers.'
    },
    {
        id: 4,
        name: 'Monarch Butterfly',
        type: 'butterfly',
        batches: 15,
        price: 4,
        description: 'A striking monarch butterfly specimen with brilliant wings, perfect for nature enthusiasts or collectors looking to add a rare piece to their collection.'
    },
    {
        id: 5,
        name: 'Western Honey Bee',
        type: 'bee',
        batches: 6,
        price: 2,
        description: 'A detailed and vibrant western honey bee specimen, a must-have for collectors or those passionate about pollinators and their role in nature.'
    },
    {
        id: 6,
        name: 'Two-Spotted Ladybug',
        type: 'ladybug',
        batches: 3,
        price: 2,
        description: 'A delicate two-spotted ladybug specimen with a brilliant red shell and perfectly marked spots. A perfect addition to your collection or as a charming gift.'
    },
    {
        id: 7,
        name: 'Blue Morpho Butterfly',
        type: 'butterfly',
        batches: 14,
        price: 5,
        description: 'A rare blue morpho butterfly with beautiful wing patterns and vibrant colors. Ideal for anyone interested in the beauty and diversity of nature.'
    },
    {
        id: 8,
        name: 'Bumble bee',
        type: 'bee',
        batches: 8,
        price: 3,
        description: 'An intricately preserved bumblebee, showcasing its fuzzy texture and golden hues. A great educational tool or collector’s piece.'
    },
    {
        id: 9,
        name: 'Seven-Spotted Ladybug',
        type: 'ladybug',
        batches: 4,
        price: 3,
        description: 'This seven-spotted ladybug specimen is known for its bright red shell and iconic spots, making it a delightful addition to any collection.'
    },
    {
        id: 10,
        name: 'Painted Lady Butterfly',
        type: 'butterfly',
        batches: 16,
        price: 6,
        description: 'A majestic painted lady butterfly with mesmerizing colors and intricate wing patterns, perfect for any collection.'
    },
    {
        id: 11,
        name: 'Leafcutter Bee',
        type: 'bee',
        batches: 9,
        price: 4,
        description: 'A stunning leafcutter bee specimen with vivid coloring and fine detail, making it an exceptional addition to any nature lover’s collection.'
    },
    {
        id: 12,
        name: 'Thirteen-Spotted Ladybug',
        type: 'ladybug',
        batches: 5,
        price: 4,
        description: 'This charming thirteen-spotted ladybug specimen features a vivid red shell with distinctive black spots, making it a great collectible or gift for nature enthusiasts.'
    }
];



export const useInsects = () => useContext(InsectsContext);

const InsectsProvider = ({children}) => {
const [insects, setInsects] = useState(cards);

return (
        <InsectsContext.Provider value={{insects, setInsects}}>
            {children}
        </InsectsContext.Provider>
);
};

export default InsectsProvider;