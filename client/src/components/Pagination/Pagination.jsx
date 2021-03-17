import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.sass';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  let current = currentPage;
  if (current > totalPages) {
    current = totalPages;
  }
  if (current < 0) {
    current = 1;
  }
  if (totalPages > 0) {
    return (
      <div className={styles.container}>
        <div
          className={styles.item}
          role="button"
          onClick={() => setPage(1)}
          onKeyPress={() => setPage(1)}
          tabIndex={0}
        >
          {1}
        </div>
        {(current !== 1 && current !== 2)
        && (
          <div
            className={`${styles.item} ${styles.notSmScreen}`}
            role="button"
            onClick={() => setPage(current - 2)}
            onKeyPress={() => setPage(current - 2)}
            tabIndex={0}
          >
            . . .
          </div>
        )}
        {(current !== 1 && current !== 2)
        && (
          <div
            className={styles.item}
            role="button"
            onClick={() => setPage(current - 1)}
            onKeyPress={() => setPage(current - 1)}
            tabIndex={0}
          >
            prev
          </div>
        )}
        {(current !== 1 && current !== totalPages)
        && <div className={`${styles.item} ${styles.current}`}>{current}</div>}
        {(current !== totalPages && current !== totalPages - 1)
        && (
          <div
            className={styles.item}
            role="button"
            onClick={() => setPage(current + 1)}
            onKeyPress={() => setPage(current + 1)}
            tabIndex={0}
          >
            next
          </div>
        )}
        {(current !== totalPages && current !== totalPages - 1)
        && (
          <div
            className={`${styles.item} ${styles.notSmScreen}`}
            role="button"
            onClick={() => setPage(current + 2)}
            onKeyPress={() => setPage(current + 2)}
            tabIndex={0}
          >
            . . .
          </div>
        )}
        {(totalPages !== 1)
        && (
          <div
            className={styles.item}
            role="button"
            onClick={() => setPage(totalPages)}
            onKeyPress={() => setPage(totalPages)}
            tabIndex={0}
          >
            {totalPages}
          </div>
        )}
      </div>
    );
  }
  return null;
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
