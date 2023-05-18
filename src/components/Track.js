import './css/Track.css';
import plus from '../images/plus.png';
import cross from '../images/cross.png';

/* The Track component represents a single song from Spotify. It contains the song title, artist and album.
    This component uses two format styles; one for appearing in the search results and one for appearing
    int the playlist */
export default function Track(props) {
    // Object representation of this track
    const objForm = {
        key: props.id,
        id: props.id,
        title: props.title,
        artist: props.artist,
        album: props.album,
        uri: props.uri
    }

    return (<div className='Track' 
            style={props.menu === 'Playlist' ? 
                {justifyContent: 'space-between'} : 
                {justifyContent: 'start'}}>
        {props.menu === 'SearchResults' && 
            <img src={plus} 
                onClick={() => props.onAddPlaylistTrack(objForm)}
                id='add' 
                alt='add to playlist'/>}
        <div className='TrackInfo'>
            <h3>{props.title}</h3>
            <p>
                <strong>Artists:</strong> {props.artist} &nbsp;&nbsp;&nbsp;
                <strong>Albums:</strong> {props.album}
            </p>
        </div>
        {props.menu === 'Playlist' && 
            <img src={cross} 
                onClick={() => props.onRemoveTrack(objForm.id)} 
                id='remove'
                alt='remove from playlist'/>}
    </div>);
};