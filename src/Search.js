import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
import BreakPoints from './BreakPoints'

const Search = ({
                    user, 
                    search, 
                    handleChange, 
                    results, 
                    getMoreGifs, 
                    addGif,
                    addedList
                }) => {

    return ( 
        <div className="search-pane">

        <h1 className="page-title search-title">Search</h1>
        <img className="gify-attr" src="/powered_gify.png" alt="Powered by GIFY" />

        <input 
            className="search-input"
            type="text" 
            value={search} 
            onChange={(e) => handleChange(e)}
            placeholder="Search for something..."

        />

        <InfiniteScroll
          className="query-results"
          dataLength={results.length}
          next={getMoreGifs}
          hasMore={true}
        //   loader={<h4 className="loading">Loading...</h4>}
        >
            <Masonry
                breakpointCols={BreakPoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {results.map(([mp4, bitly],index) => (
                    
                    <div key={index} className="gif-container">
                    <video 
                        className={`result-video ${index % 2 === 0 ? 'blue' : 'pink'}`} 
                        autoPlay 
                        loop 
                        key={index} 
                        src={mp4} 
                    />
                    <p 
                        className="add-gif-btn"
                        onClick={() => addGif(mp4, bitly, user.uid, index)}
                    >
                        {addedList.includes(index) ? 'Added' : '+ Add to wallet'}
                    </p>

                    </div>
                    
                ))}
            </Masonry>
        </InfiniteScroll>
      </div>
     );
}
 
export default Search;