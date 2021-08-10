import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';

const Search = ({
                    user, 
                    search, 
                    handleChange, 
                    results, 
                    getMoreGifs, 
                    addGif
                }) => {


    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
        };

    return ( 
        <div className="search-pane">

        <h1 className="page-title">Search</h1>

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
                breakpointCols={breakpointColumnsObj}
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
                        onClick={() => addGif(mp4, bitly, user.uid)}
                    >
                        Add
                    </p>

                    </div>
                    
                ))}
            </Masonry>
        </InfiniteScroll>
      </div>
     );
}
 
export default Search;