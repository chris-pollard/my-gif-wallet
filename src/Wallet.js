import { firebase, uiConfig } from './firebase.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebaseui/dist/firebaseui.css'
import Masonry from 'react-masonry-css';
import BreakPoints from './BreakPoints'

const Wallet = (
    {
        myGifs,
        copyUrl,
        handleRemove,
        user
    }
) => {

    if (user) {
        return (
        <div className="wallet-pane">
            <h1 className="page-title">Wallet</h1>
            
            <Masonry
                breakpointCols={BreakPoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {myGifs.map(([id,gif]) => (
                  <div key={id} className="gif-container">
                    <video 
                      className="wallet-video"
                      autoPlay 
                      loop 
                      key={id} 
                      src={gif.mp4} 
                    />
                    <button
                      className="wallet-button copy"
                      onClick={() => copyUrl(gif.bitly)}
                    >Copy url</button>
                    <button
                      className="wallet-button remove"
                      onClick={() => handleRemove(id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </Masonry>


            
      </div>
    )} else {
        return (
        <div className="sign-in">
                <p>Sign in to save Gifs</p>
                <StyledFirebaseAuth 
                uiConfig={uiConfig} 
                firebaseAuth={firebase.auth()} 
                />
        </div>
    )}

}
 
export default Wallet;