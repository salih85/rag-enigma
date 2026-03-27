import { useState, useRef, useEffect } from 'react'
import { Terminal, Fingerprint, Database, Search, MessageSquare, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Welcome, Detective. The data stream is active. What is your query?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePanel, setActivePanel] = useState('chat');
  const [lore, setLore] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/lore')
      .then(res => res.json())
      .then(data => setLore(data));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: '>>> ERROR: CRITICAL CONNECTION FAILURE. RETRYING...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cyberpunk-app">
      <header className="terminal-header">
        <Terminal className="icon" />
        <h1>LORE SEEKERS: RAG_ENIGMA.v1</h1>
        <div className="status-badge">SYSTEM: ONLINE</div>
      </header>
      
      <main className="game-container">
        <section className="side-panel">
          <div 
            className={`panel-item ${activePanel === 'chat' ? 'active' : ''}`}
            onClick={() => setActivePanel('chat')}
          >
            <MessageSquare size={18} />
            <span>NEURAL CHAT</span>
          </div>
          <div 
            className={`panel-item ${activePanel === 'lore' ? 'active' : ''}`}
            onClick={() => setActivePanel('lore')}
          >
            <Database size={18} />
            <span>LORE_DB</span>
          </div>
          <div 
            className={`panel-item ${activePanel === 'evidence' ? 'active' : ''}`}
            onClick={() => setActivePanel('evidence')}
          >
            <Fingerprint size={18} />
            <span>EVIDENCE</span>
          </div>
          <div 
            className={`panel-item ${activePanel === 'decrypt' ? 'active' : ''}`}
            onClick={() => setActivePanel('decrypt')}
          >
            <Search size={18} />
            <span>DECRYPT</span>
          </div>
        </section>

        <section className="chat-area">
          {activePanel === 'chat' ? (
            <>
              <div className="chat-history" ref={scrollRef}>
                {messages.map((msg, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`message ${msg.role}`}
                  >
                    <div className="role-tag">{msg.role === 'ai' ? 'DETECTIVE_AI' : 'PLAYER'}</div>
                    <div className="content">{msg.content}</div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                )}
              </div>
              
              <form className="input-area" onSubmit={handleSend}>
                <input 
                  type="text" 
                  placeholder="Enter neural command..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>SEND</button>
              </form>
            </>
          ) : activePanel === 'lore' ? (
            <div className="lore-db-view">
              <h2>LOCAL_KNOWLEDGE_BASE</h2>
              <div className="lore-grid">
                {lore.map(item => (
                  <div key={item.id} className="lore-entry">
                    <div className="entry-id">ID: {item.id}</div>
                    <div className="entry-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : activePanel === 'evidence' ? (
            <div className="lore-db-view">
               <h2>EVIDENCE_LOG</h2>
               <div className="intel-card" style={{marginTop: '2rem', padding: '2rem', textAlign: 'center'}}>
                 <Fingerprint size={48} style={{margin: '0 auto', color: 'var(--neon-pink)', opacity: 0.5}} />
                 <h3 style={{marginTop: '1rem'}}>NO NEW EVIDENCE FOUND</h3>
                 <p style={{opacity: 0.7}}>Scan crime scenes or interrogate suspects to unlock evidence.</p>
               </div>
            </div>
          ) : (
            <div className="lore-db-view">
               <h2>DECRYPTION_MODULE</h2>
               <div className="intel-card" style={{marginTop: '2rem', padding: '2rem', textAlign: 'center'}}>
                 <Search size={48} style={{margin: '0 auto', color: 'var(--neon-blue)', opacity: 0.5}} />
                 <h3 style={{marginTop: '1rem'}}>MODULE OFFLINE</h3>
                 <p style={{opacity: 0.7}}>Requires Level 3 Clearance to decrypt secure Arasaka-X files.</p>
               </div>
            </div>
          )}
        </section>

        <section className="manifest-panel">
          <h3>_LATEST_INTEL</h3>
          <div className="intel-card">
            <AlertCircle size={14} />
            <p>Target: Kenji Sato. Status: Deceased. Sector: 7.</p>
          </div>
          <div className="intel-card">
            <AlertCircle size={14} />
            <p>Weapon: Mono-wire whip. Group: Ghost.</p>
          </div>
        </section>
      </main>

      <footer className="terminal-footer">
        <p>© 2084 ANTIGRAVITY SYSTEMS. ACCESS GRANTED.</p>
      </footer>
    </div>
  )
}

export default App
