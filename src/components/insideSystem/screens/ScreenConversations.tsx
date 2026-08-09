import { useState } from 'react';

import { Bot, Search, Send } from 'lucide-react';

import type { InsideSystemContent } from '../../../content/landingContent';
import { applyService } from '../insideSystemShared';
import { FakeBadge, FakeSwitch } from '../MockUI';
import './ScreenConversations.css';

type ConversationsMock = InsideSystemContent['screens']['conversations']['mock'];

interface ScreenConversationsProps {
  mock: ConversationsMock;
  serviceInline: string;
}

/* A única tela com interação própria: clicar numa conversa da lista troca a
   thread aberta (estado local, deterministico no SSR — o inicial é a
   conversa marcada como `active`, que também é a encenada pelos beats). */
const ScreenConversations = ({ mock, serviceInline }: ScreenConversationsProps) => {
  const initialIndex = Math.max(
    0,
    mock.conversations.findIndex((conversation) => conversation.active),
  );
  const [current, setCurrent] = useState(initialIndex);

  return (
    <div className="its-conv">
      <div className="its-conv-list its-card-box">
        <div className="its-conv-listhead">
          <strong>{mock.listTitle}</strong>
          <span className="its-conv-new" aria-hidden="true">
            +
          </span>
        </div>
        <div className="its-conv-search">
          <Search className="its-conv-search-icon" aria-hidden="true" />
          <span>{mock.searchPlaceholder}</span>
        </div>
        <div className="its-conv-chips">
          {mock.filters.map((filter) => (
            <span
              key={filter.label}
              className={`its-chip ${filter.active ? 'its-chip--active' : ''}`.trim()}
            >
              {filter.label}
              {filter.badge ? <span className="its-chip-badge">{filter.badge}</span> : null}
            </span>
          ))}
        </div>
        <div className="its-conv-items">
          {mock.conversations.map((conversation, index) => (
            <button
              key={conversation.name}
              type="button"
              onClick={() => setCurrent(index)}
              className={`its-conv-item ${index === current ? 'its-conv-item--active' : ''}`.trim()}
            >
              <span className="its-conv-itemrow">
                <strong>{conversation.name}</strong>
                <span className="its-conv-time">{conversation.time}</span>
              </span>
              <span className="its-conv-itemrow">
                <span className="its-conv-preview">{conversation.preview}</span>
                {conversation.unread ? (
                  <span className="its-conv-unread">{conversation.unread}</span>
                ) : null}
                {conversation.badge ? <FakeBadge label={conversation.badge} tone="teal" /> : null}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="its-conv-thread its-card-box">
        {mock.conversations.map((conversation, index) => (
          <div
            key={conversation.name}
            data-thread={index}
            className={`its-conv-threadpane ${index === current ? 'its-active' : ''}`.trim()}
          >
            <div className="its-conv-threadhead">
              <span className="its-conv-threadwho">
                <strong>{conversation.name}</strong>
                <span>{conversation.phone}</span>
              </span>
              <FakeSwitch on label={mock.aiToggle} />
            </div>
            <div className="its-conv-msgs">
              {conversation.messages.map((message, messageIndex) => (
                <div key={messageIndex} className={`its-msg its-msg--${message.direction}`}>
                  <p>{applyService(message.text, serviceInline)}</p>
                  <span className="its-msg-meta">{message.meta}</span>
                </div>
              ))}
              {/* Balão "digitando…": só na thread encenada pelos beats. */}
              {index === 0 ? (
                <div className="its-msg its-msg--out its-typing" aria-hidden="true">
                  <span className="its-typing-dot" />
                  <span className="its-typing-dot" />
                  <span className="its-typing-dot" />
                </div>
              ) : null}
            </div>
          </div>
        ))}
        <div className="its-conv-composer">
          <span className="its-conv-composer-status">
            <Bot className="its-conv-bot-icon" aria-hidden="true" />
            {mock.composer.status}
          </span>
          <span className="its-conv-composer-row">
            <span className="its-conv-input">{mock.composer.placeholder}</span>
            <span className="its-conv-send">
              <Send className="its-conv-send-icon" aria-hidden="true" />
              {mock.composer.send}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ScreenConversations;
