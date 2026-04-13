import React, { useEffect, useMemo, useState } from 'react';
import { getApiUrl, normalizeResponse } from '../api';

function formatValue(value) {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2);
  }
  return String(value);
}

function buildColumns(items) {
  return Array.from(
    new Set(items.flatMap((item) => (item ? Object.keys(item) : [])))
  );
}

function ResourcePage({ resource, title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showRaw, setShowRaw] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(getApiUrl(resource))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setItems(normalizeResponse(data));
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      })
      .finally(() => setLoading(false));
  }, [resource, refreshCounter]);

  const displayedItems = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return items;
    }
    return items.filter((item) =>
      Object.values(item || {}).some((value) =>
        formatValue(value).toLowerCase().includes(term)
      )
    );
  }, [items, search]);

  const columns = useMemo(() => buildColumns(displayedItems), [displayedItems]);

  return (
    <div className="card page-card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h2 className="card-title mb-1">{title}</h2>
            <p className="card-text text-muted mb-0">
              Browse the latest {title.toLowerCase()} and interact with the dataset.
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setRefreshCounter((count) => count + 1)}
            >
              Refresh
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setShowRaw(true)}
            >
              View raw JSON
            </button>
          </div>
        </div>

        <form
          className="row g-2 align-items-center mb-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="col-sm-8">
            <label htmlFor={`${resource}-search`} className="form-label visually-hidden">
              Search {title}
            </label>
            <input
              id={`${resource}-search`}
              type="search"
              className="form-control"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="col-sm-4 d-grid">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setSearch('')}
            >
              Clear search
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {!loading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="text-muted mb-0">
                Showing {displayedItems.length} of {items.length} {title.toLowerCase()}.
              </p>
              <a
                className="link-primary small"
                href={getApiUrl(resource)}
                target="_blank"
                rel="noreferrer"
              >
                Open API endpoint
              </a>
            </div>

            {displayedItems.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      {columns.map((column) => (
                        <th key={column} scope="col">
                          {column.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {displayedItems.map((item, index) => (
                      <tr key={index}>
                        {columns.map((column) => (
                          <td key={column} className="text-break">
                            <pre className="mb-0 small">
                              {formatValue(item[column])}
                            </pre>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-secondary mb-0">
                No matching {title.toLowerCase()} found. Try a different search term.
              </div>
            )}
          </>
        )}
      </div>

      {showRaw && (
        <>
          <div className="modal-backdrop fade show" onClick={() => setShowRaw(false)} />
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Raw {title} JSON</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowRaw(false)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="bg-light p-3 rounded">{JSON.stringify(items, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowRaw(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ResourcePage;
