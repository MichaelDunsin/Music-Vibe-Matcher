export default async function handler(req, res) {
 // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // note that during production, the * will change to the url of my project
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Preflight request
  if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*"); // note that during production, the * will change to the url of my project
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { emotions } = req.body;
  if (!Array.isArray(emotions) || emotions.length === 0) {
    return res.status(400).json({ message: 'Missing or invalid emotions array' });
  }

  // Limit to max 3 emotions
  const limitedEmotions = emotions.slice(0, 3);

  // Determine track count per emotion
  const trackDistribution =
    limitedEmotions.length === 1
      ? [12]
      : limitedEmotions.length === 2
      ? [9, 3]
      : [6, 4, 2];


  try {
    // Step 1: Get Spotify access token
    const authResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +  Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const authData = await authResponse.json();
    if (!authData.access_token) {
      return res.status(500).json({ message: 'Failed to get access token', details: authData });
    }

    const token = authData.access_token;

    // Step 2: For each emotion, search tracks and collect
    const EndTracks = [];

    for (let i = 0; i < limitedEmotions.length; i++) {
      const emotion = limitedEmotions[i] + " songs";
      const count = trackDistribution[i];

      const searchResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(emotion)}&type=playlist&limit=${count}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const searchData = await searchResponse.json();

      if (!searchData?.playlists?.items) {
  return res.status(500).json({ message: 'Failed to generate playlists', details: searchData });
      }

      const filteredPlaylists = searchData.playlists.items.filter(p => p !== null);
    const firstPlaylist = filteredPlaylists[0]

 const tracksData = await fetch(`https://api.spotify.com/v1/playlists/${firstPlaylist.id}/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await tracksData.json();
  const items = data.items.slice(0, count)
  const tracks = items.map(item => item.track);
if(tracks){
  EndTracks.push(...tracks);
} 
    }

    res.status(200).json({ EndTracks });
  } catch (error) {
    res.status(500).json({ message: 'Spotify API error', details: error.message });
  }
}
