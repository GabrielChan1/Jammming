export default function validate() {
    function generateRandomString(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        return result;
    }

    const client_id = '35350f43d74644a9b27f864c6e0c6488';
    const redirect_uri = 'https://superlative-medovik-410381.netlify.app/';

    const state = generateRandomString(16);

    const scope = 'playlist-modify-private playlist-modify-public user-read-private user-read-email';

    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(client_id)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`;

    window.location = url;
}