import './css/Playlist.css';
import Track from './Track';

/* The Playlist component contains a text bar for naming the playlist, the button for saving the playlist and the tracks that 
    are to be saved to the playlist*/
export default function Playlist(props) {
    const header = props.header;

    async function savePlaylist() {
        const playlistName = document.getElementById('playlistName').value;
        if (playlistName === '') {
            alert('A playlist name is required to save this playlist.');
        }
        else {
            // Send the GET request to obtain the user id to build the POST requests
            const getUrl = 'https://api.spotify.com/v1/me';
            const getReq = new Request(getUrl, {headers: header});
            try {
                const getRes = await fetch(getReq);
                if (getRes.ok) {
                    const jsonGetRes = await getRes.json();
                    const userId = jsonGetRes.id;

                    // Send the POST request to create the playlist and obtain the playlist id
                    header.append('Content-Type', 'application/json')
                    const createUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
                    const createReq = new Request(createUrl, {
                        method: 'POST', 
                        headers: header,
                        body: JSON.stringify({name: playlistName})
                    });
                    const createRes = await fetch(createReq);
                    if (createRes.ok) {
                        const jsonCreateRes = await createRes.json();
                        const playlistId = jsonCreateRes.id;

                        // Send the POST requests to populate the playlist
                        const addUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
                        const addReq = new Request(addUrl, {
                            method: 'POST',
                            headers: header,
                            body: JSON.stringify({uris: props.tracks.map(track => track.uri)})
                        });
                        const addRes = await fetch(addReq);
                        // Reset the playlist component once the request is successful
                        if (addRes.ok) {
                            props.onSavePlaylist({
                                name: '',
                                tracks: []
                            });
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (<div className='Playlist'>
        <h2>Save/Export Playlist</h2>
        <input type='text' 
            id='playlistName' 
            name='playlistName' 
            placeholder='Playlist Name'/>
        <h4 onClick={savePlaylist}>Save to Spotify</h4>
        <div className='Tracklist'>
            {props.tracks?.map(track => {
                return <Track key={track.id}
                    id={track.id} 
                    title={track.title} 
                    artist={track.artist} 
                    album={track.album}
                    uri={track.uri} 
                    menu='Playlist'
                    onRemoveTrack={props.onRemoveTrack}/>}
            )}
        </div>
    </div>);
};