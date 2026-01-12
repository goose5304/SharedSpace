import './ArtWallPage.css'
import { ArtPopup } from '../../components/ArtPopup';
import { useState, useEffect } from 'react';
import Almond from '../../assets/arts/almondtree.jpg';
import August from '../../assets/arts/augustrenoire.jpg';
import Cafe from '../../assets/arts/cafenight.jpg';
import Girl from '../../assets/arts/girlwithpearlearrings.jpg';
import Lemo from '../../assets/arts/lemoulin.jpg';
import Nippon from '../../assets/arts/nippon.jpg';
import Sakura from '../../assets/arts/sakura.jpg';
import Sunday from '../../assets/arts/ukiyo.jpg';
import WaterLily from '../../assets/arts/waterlilies.jpg'

export function ArtWallPage() {
    /**
     * Array of artwork objects containing image sources and metadata
     * @type {Array<{img: string, date: string, description: string}>}
     */
    const artWorks = [
        { img: Almond, date: "1/3/2026", description: "lorem ipsum dolor" },
        { img: August, date: "1/4/2026", description: "lorem ipsum dolor" },
        { img: Cafe, date: "1/5/2026", description: "lorem ipsum dolor" },
        { img: Girl, date: "1/4/2026", description: "lorem ipsum dolor" },
        { img: Lemo, date: "1/5/2026", description: "lorem ipsum dolor" },
        { img: Nippon, date: "1/4/2026", description: "lorem ipsum dolor" },
        { img: Sakura, date: "1/5/2026", description: "lorem ipsum dolor" },
        { img: Sunday, date: "1/4/2026", description: "lorem ipsum dolor" },
        { img: WaterLily, date: "1/5/2026", description: "lorem ipsum dolor" }
    ]
    
    /**
     * Currently selected artwork for popup display
     * @type {Object|null}
     */
    const [activeArt, setActiveArt] = useState(null);
    
    /**
     * Effect hook for masonry grid layout management
     * Dynamically calculates and applies grid row spans based on image heights
     * to create a Pinterest-style masonry layout
     */
    useEffect(() => {
        /**
         * Resizes a single grid item based on its content height
         * @param {HTMLElement} item - The grid item to resize
         */
        const resizeGridItem = (item) => {
            const grid = document.querySelector('.artWall');
            const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
            const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
            const rowSpan = Math.ceil((item.querySelector('.artWork').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = `span ${rowSpan}`;
        };

        /**
         * Resizes all grid items after images load
         * Handles both already-loaded images and images still loading
         */
        const resizeAllGridItems = () => {
            const allItems = document.querySelectorAll('.artWorkItem');
            allItems.forEach(item => {
                const img = item.querySelector('.artWork');
                if (img.complete) {
                    resizeGridItem(item);
                } else {
                    img.addEventListener('load', () => resizeGridItem(item));
                }
            });
        };

        // Initial resize and window resize listener
        resizeAllGridItems();
        window.addEventListener('resize', resizeAllGridItems);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', resizeAllGridItems);
        };
    }, []);

    return (
        <div className="artWallContainer">
            {/* Popup modal for displaying artwork details */}
            <ArtPopup
                trigger={activeArt != null}
                setTrigger={() => setActiveArt(null)}
                img={activeArt?.img}
                date={activeArt?.date}
                desc={activeArt?.description}
            />
            
            <h1 className='title'>Art Wall</h1>
            <p className='subtitle'>See what the community's been creating lately 🎨</p>
            
            <div className='artWallWrapper'>
                <div className='artWall'>
                    {/* Map through artworks and render grid items */}
                    {
                        artWorks.map((art, index) => (
                            <div 
                                className='artWorkItem' 
                                key={index}
                                onClick={() => { setActiveArt(art) }}
                            >
                                <img
                                    src={art.img}
                                    alt='Artwork'
                                    className='artWork'
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}