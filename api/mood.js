export default async function handler(req, res) {
    // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://music-vibe-matcher.vercel.app"); // note that during production, the * will change to the url of my project
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight request
  if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "https://music-vibe-matcher.vercel.app"); // note that during production, the * will change to the url of my project
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

    // Reject anything not POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { sentence } = req.body;
  if (!sentence) {
    return res.status(400).json({ message: 'Missing sentence' });
  }

  try {
    const response = await fetch(' https://router.huggingface.co/hf-inference/models/facebook/bart-large-mnli', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: sentence,
           parameters: {
      candidate_labels: ["happy", "sad", "angry", "nervous", "calm", "romantic", "confident", "grateful", "energetic"]
    }
       }),
    });

    const data = await response.json();

    function getTopEmotions(labels, scores) {
  const threshold = 0.15; // Adjust based on how sensitive you want it

  const topEmotions = {
    labels: [labels[0]],
    scores: [scores[0]],
  };

  // Compare top scores with next two
  for (let i = 1; i < 3; i++) {
    if (scores[i] !== undefined && Math.abs(scores[0] - scores[i]) <= threshold) {
      topEmotions.labels.push(labels[i]);
      topEmotions.scores.push(scores[i]);
    }
  }

  return topEmotions;
}

const emotions = getTopEmotions(data.labels, data.scores)

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    res.status(200).json({ emotions: emotions });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
