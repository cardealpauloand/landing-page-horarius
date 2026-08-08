import { MessageSquareQuote } from 'lucide-react';

import type { InsideSystemContent } from '../../../content/landingContent';
import { FakeMeter, FakeStars } from '../MockUI';
import './ScreenReviews.css';

type ReviewsMock = InsideSystemContent['screens']['reviews']['mock'];

interface ScreenReviewsProps {
  mock: ReviewsMock;
  services: string[];
}

const ScreenReviews = ({ mock, services }: ScreenReviewsProps) => (
  <div className="its-rev">
    <div className="its-card-box its-rev-summary">
      <span className="its-rev-title">
        <MessageSquareQuote className="its-rev-icon" aria-hidden="true" />
        <strong>{mock.summaryTitle}</strong>
      </span>
      <div className="its-rev-summarygrid">
        <div className="its-rev-average">
          <strong className="its-rev-avgvalue">{mock.average}</strong>
          <FakeStars value={4.8} />
          <span className="its-rev-countline">{mock.countLine}</span>
        </div>
        <div className="its-rev-dist">
          {mock.distribution.map((line) => (
            <span key={line.stars} className="its-rev-distrow">
              <span className="its-rev-diststars">{line.stars}</span>
              <FakeMeter pct={line.pct} tone="teal" />
              <span className="its-rev-distcount">{line.count}</span>
            </span>
          ))}
        </div>
      </div>
      <figure className="its-rev-quote">
        <blockquote>{mock.quote.text}</blockquote>
        <figcaption>
          <FakeStars value={5} small />
          <span>
            {mock.quote.author} · {services[mock.quote.service]}
          </span>
        </figcaption>
      </figure>
    </div>

    <div className="its-table">
      <div className="its-rev-tablehead">{mock.tableTitle}</div>
      {mock.rows.map((row) => (
        <div key={row.client} className="its-table-row its-rev-grid">
          <span className="its-table-strong">{row.client}</span>
          <FakeStars value={row.stars} small />
          <span className="its-table-muted its-rev-comment">{row.comment}</span>
          <span className="its-table-muted">{services[row.service]}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ScreenReviews;
