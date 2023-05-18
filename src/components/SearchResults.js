import './css/SearchResults.css';
import Track from './Track';

/* The SearchResults component contains the results from querying the Spotify API */
export default function SearchResults(props) {
    return (<div className='SearchResults'>
        <div className='Tracklist'>
            <h2>Search Results</h2>
            {props.tracks?.map(track => {
                return <Track key={track.id} 
                    id={track.id}
                    title={track.title} 
                    artist={track.artist} 
                    album={track.album}
                    uri={track.uri} 
                    menu='SearchResults'
                    onAddPlaylistTrack={props.onAddPlaylistTrack}/>}
            )}
        </div>
    </div>);
};

