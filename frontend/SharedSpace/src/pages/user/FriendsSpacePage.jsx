import SampleImg from '../../assets/SharedSpaceLogo.svg'
import SampleImg2 from '../../assets/react.svg'
import { ArtPopup } from '../../components/ArtPopup';
import { useState } from 'react';
import './FriendsSpacePage.css'
import Almond from '../../assets/arts/almondtree.jpg';
import August from '../../assets/arts/augustrenoire.jpg';
import Cafe from '../../assets/arts/cafenight.jpg';
import Girl from '../../assets/arts/girlwithpearlearrings.jpg';
import Lemo from '../../assets/arts/lemoulin.jpg';
import Nippon from '../../assets/arts/nippon.jpg';
import Sakura from '../../assets/arts/sakura.jpg';
import Sunday from '../../assets/arts/ukiyo.jpg';
import WaterLily from '../../assets/arts/waterlilies.jpg'

export function FriendsSpacePage() {
    /**
     * Array of artwork objects with author information
     * @type {Array<{img: string, date: string, description: string, author: string, authorPic: string}>}
     */
    const artWorks = [
        { img: Almond, date: "1/1/2026", description: "lorem ipsum dolor", author: "Nname", authorPic: SampleImg2 },
        { img: August, date: "1/2/2026", description: "lorem ipsum dolor", author: "Nname", authorPic: SampleImg },
        { img: Cafe, date: "1/3/2026", description: "lorem ipsum dolor", author: "Cname", authorPic: SampleImg },
        { img: Girl, date: "1/4/2026", description: "lorem ipsum dolor", author: "Dname", authorPic: SampleImg2 },
        { img: Lemo, date: "1/5/2026", description: "lorem ipsum dolor", author: "Ename", authorPic: SampleImg },
        { img: Nippon, date: "1/4/2026", description: "lorem ipsum dolor", author: "Aname", authorPic: SampleImg2 },
        { img: Sakura, date: "1/5/2026", description: "lorem ipsum dolor", author: "Gname", authorPic: SampleImg },
        { img: Sunday, date: "1/4/2026", description: "lorem ipsum dolor", author: "Aname", authorPic: SampleImg2 },
        { img: WaterLily, date: "1/5/2026", description: "lorem ipsum dolor", author: "Iname", authorPic: SampleImg }
    ]

    /**
     * Currently selected artwork for popup display
     * @type {Object|null}
     */
    const [activeArt, setActiveArt] = useState(null);
    
    /**
     * Current page index (0-based)
     * @type {number}
     */
    const [currentPage, setCurrentPage] = useState(0);

    /** Number of artworks to display per page */
    const itemsPerPage = 4;
    
    /** Total number of pages based on artwork count */
    const totalPages = Math.ceil(artWorks.length / itemsPerPage);

    /**
     * Gets the artworks to display on the current page
     * @returns {Array} Slice of artworks for current page
     */
    const getCurrentPageArtworks = () => {
        const startIndex = currentPage * itemsPerPage;
        return artWorks.slice(startIndex, startIndex + itemsPerPage);
    };

    /**
     * Navigate to previous page
     * Prevents going below page 0
     */
    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    /**
     * Navigate to next page
     * Prevents exceeding total pages
     */
    const handleNext = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    return (
        <div className="friendSpaceContainer">
            {/* Popup modal for artwork details with author info */}
            <ArtPopup
                trigger={activeArt != null}
                setTrigger={() => setActiveArt(null)}
                img={activeArt?.img}
                date={activeArt?.date}
                desc={activeArt?.description}
                author={activeArt?.author}
                authorImg={activeArt?.authorPic}
            />

            <div className="content-wrapper">
                <h1 className="title">Friends</h1>
                <p className="subtitle">See what your friends have been sharing lately</p>

                {/* Grid of current page artworks */}
                <div className="artworks-grid">
                    {getCurrentPageArtworks().map((art, index) => (
                        <div 
                            key={index} 
                            className="artwork-card"
                            onClick={() => setActiveArt(art)}
                        >
                            <img 
                                src={art.img} 
                                alt={art.description}
                                className="artwork-image"
                            />
                            {/* Author profile picture overlay */}
                            <div className="artwork-avatar">
                                <img src={art.authorPic} className='avatar-circle'/>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination controls */}
                <div className="navigation">
                    {/* Previous button */}
                    <button 
                        className="nav-button"
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    {/* Page indicator dots */}
                    <div className="page-indicators">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <div 
                                key={index}
                                className={`page-dot ${index === currentPage ? 'active' : ''}`}
                                onClick={() => setCurrentPage(index)}
                            />
                        ))}
                    </div>

                    {/* Next button */}
                    <button 
                        className="nav-button"
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}