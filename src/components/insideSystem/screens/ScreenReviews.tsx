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
      {/* Três colunas, como no painel real: média | distribuição | destaque. */}
      <div className="its-rev-summarygrid">
        <div className="its-rev-average">
          <strong className="its-rev-avgvalue">{mock.average}</strong>
          <span className="its-rev-starsrow">
            <FakeStars value={parseFloat(mock.average)} />
            <span className="its-rev-starsvalue">{mock.average}</span>
            <span className="its-rev-starscount">{mock.ratingCount}</span>
          </span>
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
        <figure className="its-rev-quote">
          <MessageSquareQuote className="its-rev-quoteicon" aria-hidden="true" />
          <blockquote>{mock.quote.text}</blockquote>
          <figcaption>
            <FakeStars value={5} small />
            <span className="its-rev-quoterating">5.0</span>
            <span className="its-rev-quoteauthor">
              {mock.quote.author} · {services[mock.quote.service]}
            </span>
          </figcaption>
        </figure>
      </div>
    </div>

    <div className="its-table">
      <div className="its-rev-tablehead">{mock.tableTitle}</div>
      <div className="its-table-head its-rev-grid">
        {mock.columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      {mock.rows.map((row) => (
        <div key={`${row.client}-${row.date}`} className="its-table-row its-rev-grid">
          <span className="its-table-strong">{row.client}</span>
          <span className="its-rev-nota">
            <FakeStars value={row.stars} small />
            <span>{row.stars.toFixed(1)}</span>
          </span>
          {row.comment ? (
            <span className="its-table-muted its-rev-comment">{row.comment}</span>
          ) : (
            <span className="its-table-muted its-rev-nocomment">{mock.noComment}</span>
          )}
          <span className="its-table-muted">{services[row.service]}</span>
          <span className="its-table-muted">{row.professional}</span>
          <span className="its-table-muted its-rev-date">{row.date}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ScreenReviews;
