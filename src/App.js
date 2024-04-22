import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
  
    const userMessage = { id: Date.now(), type: 'user', text: inputText };
    setMessages(messages => [...messages, userMessage]); // Add user message to state
  
    try {
      const response = await fetch('https://mygpt-backend.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput: inputText })
      });
      const data = await response.json();
  
      // Add entire response to messages state as a single item
      const botMessage = { id: Date.now() + 1, type: 'bot', text: data.response };
      setMessages(messages => [...messages, botMessage]); // Add bot response to state
  
    } catch (error) {
      console.error('Failed to fetch:', error);
      setMessages(messages => [...messages, { id: Date.now() + 1, type: 'bot', text: 'Error fetching response' }]);
    }
  
    setInputText(''); // Clear input field after sending
  };
  
  
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with MUJJUS-GPT</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
        <div className="messages">
          {messages.map(msg => (
            <div key={msg.id} className={msg.type === 'user' ? 'message user' : 'message bot'}>
              {msg.text}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
