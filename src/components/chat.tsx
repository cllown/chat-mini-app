import { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'

type Message = {
  sender: 'user' | 'bot'
  text: string
}

export const Chat = () => {
  const { messages, addMessage } = useChatStore()
  const [input, setInput] = useState('')

  // ref to the bottom element of the chat — used to auto-scroll
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      sender: 'user',
      text: input.trim(),
    }

    addMessage(userMessage)
    setInput('')

    // simulate bot response after delay
    setTimeout(() => {
      const botMessage: Message = {
        sender: 'bot',
        text: 'This is a bot reply.',
      }
      addMessage(botMessage)
    }, 1000)
  }

  // auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#d0f0c0' : '#f0f0f0',
            }}
          >
            {msg.text}
          </div>
        ))}
        {/* Invisible element to scroll into view */}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={styles.button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: 16,
    color: 'black',
    boxSizing: 'border-box',
    overflow: 'hidden', // disables page scroll
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto', // scroll only inside this block
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 8,
    border: '1px solid #ccc',
    borderRadius: 8,
    background: '#fff',
  },
  message: {
    maxWidth: '70%',
    padding: 8,
    borderRadius: 8,
    wordBreak: 'break-word',
  },
  inputBox: {
    display: 'flex',
    marginTop: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    fontSize: 16,
    borderRadius: 4,
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
}
