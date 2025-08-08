# 🎵 Music Vibe Matcher

Music Vibe Matcher is a web app that connects your mood to the perfect playlist. Just type how you feel, and the app detects your mood and curates a list of 10–15 tracks using the Spotify API — complete with track info, and links to Spotify and Youtube.

## 🌐 Live Demo

[🔗 Try it here](https://music-vibe-matcher.vercel.app/)

![Screenshot](/public/big-image.PNG)

## 🌟 Features

- 🎧 **Mood Detection**: Enter how you're feeling — the app understands and processes your emotion.
- 🔍 **Smart Song Selection**: Automatically matches moods with tracks using Spotify’s Recommendations API.
- 💡 **AI-Enhanced**: Uses AI to interpret freeform text and translate it into musical vibes.
- 🎨 **Clean UI**: Built with React, Tailwind CSS, Framer Motion for a smooth and modern user experience.
- 🔊 **Track Info**: See information about each track and links to access them on Spotify and Youtube.
- 📱 **Responsive Design**: Works beautifully across mobile and desktop.

## 🛠️ Built With

- **React**
- **Tailwind CSS**
- **Framer Motion**
- **Zustand** for state management
- **Spotify Web API**
- **Model from HuggingFace** [🔗 Link here](https://huggingface.co/facebook/bart-large-mnli)



## 🎮 Usage
```md
## 🕹️ How It Works

1. Type in how you feel (e.g. "I'm feeling calm but a little sad").
2. The app interprets your mood using AI and maps it to song characteristics.
3. A playlist is generated using Spotify's Recommendations API.
4. Scroll through and see track recommendations directly from the UI.
```

## 📸 Screenshots

### 1. Input mood and click enter
![Mood Input](/public/big-image.png)

### 2. The backend analyses your input and generate selects tracks based on it
![Song Cards](/public/loading.png)

### 3. The selected tracks are displayed for you to explore
![Mood Input](/public/songs.png)

### 4. Select the track you want and explore on Spotify or Youtube
![Song Cards](/public/preview.png)

## 🙏 Acknowledgements

- [Spotify for Developers](https://developer.spotify.com/)
- [Huggingface](https://huggingface.co/)

