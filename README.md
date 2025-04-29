Chat App — Test Task for Junior Frontend Developer

This is a simple SPA chat application that simulates a conversation between the user and a bot. Built using React and Zustand for state management.
How to Run the Project

    Clone the repository:

git clone https://github.com/cllown/chat-app.git
cd chat-app

    Install dependencies:

npm install

    Start the development server:

npm run dev

The app will be available at http://localhost:5173 if you used Vite.
How Autoscroll is Implemented

We use useRef and scrollIntoView inside a useEffect. When the messages array is updated (i.e., a new message is added), the last dummy div (referenced with bottomRef) is scrolled into view smoothly.

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [messages])

This makes the chat window scroll only its internal content and not the whole page.
Why Zustand

I chose Zustand over Redux for this task because:

    Zustand is much lighter and simpler to set up (no boilerplate, reducers, or actions required).

    It has a very intuitive API.

    Perfect fit for small to medium apps where Redux might be overkill.

    Zustand supports selective re-renders and persistent stores out of the box.