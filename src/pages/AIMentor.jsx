import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import GlassCard from '../components/GlassCard';
import { BrainCircuit, Send, User, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Component to copy code to clipboard
const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 flex items-center gap-1 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 rounded px-2 py-1 transition-colors"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

// Markdown rendering components — mirrors ChatGPT/Gemini style
const markdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const codeString = String(children).replace(/\n$/, '');
    if (!inline && match) {
      return (
        <div className="relative my-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{match[1]}</span>
            <CopyButton code={codeString} />
          </div>
          <SyntaxHighlighter
            style={oneLight}
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: 0, borderRadius: 0, background: '#f8fafc', fontSize: '0.875rem' }}
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <code className="bg-slate-100 text-blue-600 rounded px-1.5 py-0.5 text-sm font-mono border border-slate-200" {...props}>
        {children}
      </code>
    );
  },
  p({ children }) {
    return <p className="mb-3 last:mb-0 leading-relaxed text-slate-700">{children}</p>;
  },
  h1({ children }) { return <h1 className="text-xl font-bold text-slate-900 mt-4 mb-2">{children}</h1>; },
  h2({ children }) { return <h2 className="text-lg font-bold text-slate-900 mt-4 mb-2">{children}</h2>; },
  h3({ children }) { return <h3 className="text-base font-semibold text-slate-800 mt-3 mb-1">{children}</h3>; },
  ul({ children }) { return <ul className="list-disc pl-5 mb-3 space-y-1 text-slate-700">{children}</ul>; },
  ol({ children }) { return <ol className="list-decimal pl-5 mb-3 space-y-1 text-slate-700">{children}</ol>; },
  li({ children }) { return <li className="leading-relaxed">{children}</li>; },
  strong({ children }) { return <strong className="font-semibold text-slate-900">{children}</strong>; },
  em({ children }) { return <em className="italic text-slate-600">{children}</em>; },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-blue-400 pl-4 my-3 text-slate-600 italic bg-blue-50 py-2 rounded-r-lg">
        {children}
      </blockquote>
    );
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-slate-200 rounded-lg text-sm">{children}</table>
      </div>
    );
  },
  th({ children }) { return <th className="bg-slate-100 border border-slate-200 px-3 py-2 text-left font-semibold text-slate-700">{children}</th>; },
  td({ children }) { return <td className="border border-slate-200 px-3 py-2 text-slate-700">{children}</td>; },
  hr() { return <hr className="my-4 border-slate-200" />; },
  a({ children, href }) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors">{children}</a>;
  },
};

// Typing dots indicator
const TypingIndicator = () => (
  <div className="flex gap-1 items-center h-6">
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        className="w-2 h-2 bg-slate-400 rounded-full"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const AIMentor = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello! I'm **Nova**, your AI Mentor. 👋\n\nI can help you with:\n- **Programming** questions and code solutions\n- **Career advice** and guidance\n- **Learning resources** and recommendations\n- And anything else you'd like to know!\n\nWhat can I help you with today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      const reply = data.response || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: "❌ **Error connecting to AI service.** Please make sure the backend is running and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center py-6 flex-shrink-0">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3 text-slate-900">
          <BrainCircuit className="text-blue-600" size={36} />
          <span className="text-blue-600">Nova</span> — AI Mentor
        </h1>
        <p className="text-slate-500 text-sm mt-1">Powered by Google Gemini · Ask me anything</p>
      </div>

      {/* Chat Area */}
      <GlassCard className="flex-1 flex flex-col overflow-hidden p-0 relative min-h-0">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 flex-shrink-0" />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 pt-4">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'ai' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {msg.role === 'ai' ? <BrainCircuit size={18} /> : <User size={18} />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.role === 'ai'
                    ? 'bg-white border border-slate-100 rounded-tl-none text-slate-800'
                    : 'bg-blue-600 text-white rounded-tr-none'
                }`}>
                  {msg.role === 'ai' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <p className="leading-relaxed">{msg.text}</p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 flex-row"
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-blue-600 text-white shadow-sm">
                  <BrainCircuit size={18} />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="flex-shrink-0 p-4 bg-white/80 backdrop-blur-sm border-t border-slate-100">
          <form onSubmit={handleSend} className="flex items-end gap-3">
            <textarea
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Nova anything... (Shift+Enter for new line)"
              disabled={loading}
              className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all text-slate-800 placeholder-slate-400 disabled:opacity-50 text-sm leading-relaxed max-h-40 overflow-y-auto"
              style={{ minHeight: '48px' }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex-shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-2">Nova can make mistakes. Verify important information.</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default AIMentor;
