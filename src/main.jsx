import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
/* 
Environment variables are secret values stored outside your code so they don’t get exposed to the public (especially on GitHub or in your frontend).They are used for:
API keys (Spotify, Hugging Face, etc), Database URLs, Private credentials

installing the vercel cli took majority of my day today. Literally all i had to do was to npm cache clean --force and install again via GOOD NETWORK, GOOD NETWORK was my issue

In the creation of music-vibe-matcher, i thought i would just encounter free apis and implement them in my project, wellit turns out that i was wrong and the good apis are actually 
more protected than i thought. They require keys, client ids and client secrets that cannot just be called from the frontend. They need to be called from a secure backend so other
devs cannot steal your api keys and make requests to your api behind your back. Never reveal your api keys in your frontend, it isn't safe. Now that i knew that, i had to start thinking
of how i was going to implement a backend to my project when i knew nothing about backend
A backend is any code that runs on a server, not the browser. it doesn't have any ui that the user sees and does not interact with the browser. So when you are testing your backend, you
don't see any thing on the browser, just a blank page(i which i had known that earlier). Since it runs in your server and not your browser, anybody visiting your website cannot see it. 
Since a backend is secure, you can use api keys and client credentials(client id and client secrets) there and no one visiting your website will be able to see it. you can then make a call
to the backend from your frontend and the backend can securely provide you with the data you need, remember that since the backend has no html files and runs nothing in the browser, 
even if someone runs your backend's url, all they will see is a blank page (you can show them some data if you want sha, like the data you are sending to your frontend). So now that i 
figured out i needed a backend, i explored my options, I was about to learn node.js and express.js when i found my solution. VERCEL SERVERLESS FUNCTIONS. vercel serverless functions is
vercel's way of introducing a little bit of backend logic to your frontend without having to actually learn backend frameworks. All you need to do is to create an /api folder in the root
of your project and create javascript files inside, these .js files acts as express servers and you can securely use your api keys and other private data here. Think of them as:
"Functions you write, upload, and they magically become API endpoints." Serverless functions are like mini backend routes that you don't have to manage a server for.
You can write a file like /api/mood.js, Deploy it with your project, Vercel turns it into a live API endpoint at: https://your-app.vercel.app/api/mood

If i still wanted to host a backend however, hosting platforms like render can host my backend for me
I also learnt about environmental variables to be stored in the .env file, environmental variables store your secret details during development when working with serverless functions
remember to add your .env file to the gitignore folder so git doesn’t track it and upload it to github where everyone will be able to see them.
In production (on Vercel), go to Vercel Dashboard > Project > Settings > Environment Variables to set your Environment variables

i also installed vercel cli to test my serverless functions locally, initially, the installation was giving me a couple issues but when i npm cache clean --force and waited till night 
when there was better network install again via GOOD NETWORK, it installed. i had to go to command prompt to run the vercel development server as vscode couldn't run it because of some 
security policy. but once i did run it in commant prompt, it ran and i opened http://localhost:3000. it took me to a blank page( which meant my server was running ). The page was white
because it didnt have any html files, typical for a backend. then, i could make requests to this local server via links like http://localhost:3000/api/mood, since my serverless 
functions are stored in the api folder in the root directory. Now i was runnig two development servers. a vite development server to serve my frontend, and a vercel development server
for my backend. i also encountered some cors restriction which is typical when you dont set headers in your api. I fixed it by adding 

 res.setHeader("Access-Control-Allow-Origin", "*"); // note that during production, the * will change to the url of my project
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

i also added a Preflight request
    // Preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  i also learnt a little about http status codes: 200 (OK), 400 (Bad Request), 405 (Method Not Allowed), 500 (Server Error) — all used to describe the outcome of your backend logic.

*/