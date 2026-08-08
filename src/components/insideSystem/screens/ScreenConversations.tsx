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

const ScreenConversations = ({ mock, serviceInline }: ScreenConversationsProps) => (
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
        {mock.items.map((item) => (
          <div
            key={item.name}
            className={`its-conv-item ${item.active ? 'its-conv-item--active' : ''}`.trim()}
          >
            <span className="its-conv-itemrow">
              <strong>{item.name}</strong>
              <span className="its-conv-time">{item.time}</span>
            </span>
            <span className="its-conv-itemrow">
              <span className="its-conv-preview">{item.preview}</span>
              {item.unread ? <span className="its-conv-unread">{item.unread}</span> : null}
              {item.badge ? <FakeBadge label={item.badge} tone="teal" /> : null}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="its-conv-thread its-card-box">
      <div className="its-conv-threadhead">
        <span className="its-conv-threadwho">
          <strong>{mock.thread.name}</strong>
          <span>{mock.thread.phone}</span>
        </span>
        <FakeSwitch on label={mock.thread.aiToggle} />
      </div>
      <div className="its-conv-msgs">
        {mock.thread.messages.map((message, index) => (
          <div key={index} className={`its-msg its-msg--${message.direction}`}>
            <p>{applyService(message.text, serviceInline)}</p>
            <span className="its-msg-meta">{message.meta}</span>
          </div>
        ))}
        {/* Balão "digitando…": só existe visualmente durante a animação do
            motor (o CSS o esconde por padrão nos dois layouts). */}
        <div className="its-msg its-msg--out its-typing" aria-hidden="true">
          <span className="its-typing-dot" />
          <span className="its-typing-dot" />
          <span className="its-typing-dot" />
        </div>
      </div>
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

export default ScreenConversations;
