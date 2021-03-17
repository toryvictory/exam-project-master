import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import qs from 'query-string';
import { getOffers } from '../../actions/offers/offersActionCreators';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OffersList from './OffersList/OffersList';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import CONSTANTS from '../../constants';
import styles from './OfferModeration.module.sass';
import Pagination from '../../components/Pagination/Pagination';

const OfferModeration = () => {
  const { search } = useLocation();
  const params = qs.parse(search);
  const { page: qpPage, limit: qpLimit, status: qpStatus } = params;
  const limit = parseInt(qpLimit, 10) || 8;
  const [page, setPage] = useState(parseInt(qpPage, 10) || 1);
  const [status, setStatus] = useState([
    CONSTANTS.MODERATION_STATUS_APPROVED,
    CONSTANTS.MODERATION_STATUS_REJECTED,
  ].includes(qpStatus) ? qpStatus : CONSTANTS.MODERATION_STATUS_PENDING);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOffers({ status, page, limit }));
  },
  [dispatch, status, page, limit]);

  const history = useHistory();
  useEffect(() => history.push({ search: qs.stringify({ status, page, limit }) }),
    [status, page, limit]);

  const {
    offers, count, error, isFetching,
  } = useSelector((state) => state.offersStore);

  let offersComponent;
  if (error) {
    offersComponent = <TryAgain getData={() => dispatch(getOffers())} />;
  } else if (isFetching) {
    offersComponent = <Spinner />;
  } else {
    offersComponent = <OffersList offers={offers} />;
  }
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            role="menuitem"
            onClick={() => setStatus(CONSTANTS.MODERATION_STATUS_PENDING)}
            onKeyPress={() => setStatus(CONSTANTS.MODERATION_STATUS_PENDING)}
            tabIndex={0}
            className={classNames({
              [styles.activeFilter]:
              CONSTANTS.MODERATION_STATUS_PENDING === status,
              [styles.filter]:
              CONSTANTS.MODERATION_STATUS_PENDING !== status,
            })}
          >
            Pending Approval
          </div>
          <div
            role="menuitem"
            onClick={() => setStatus(CONSTANTS.MODERATION_STATUS_APPROVED)}
            onKeyPress={() => setStatus(CONSTANTS.MODERATION_STATUS_APPROVED)}
            tabIndex={0}
            className={classNames({
              [styles.activeFilter]:
              CONSTANTS.MODERATION_STATUS_APPROVED === status,
              [styles.filter]:
              CONSTANTS.MODERATION_STATUS_APPROVED !== status,
            })}
          >
            Approved
          </div>
          <div
            role="menuitem"
            onClick={() => setStatus(CONSTANTS.MODERATION_STATUS_REJECTED)}
            onKeyPress={() => setStatus(CONSTANTS.MODERATION_STATUS_REJECTED)}
            tabIndex={0}
            className={classNames({
              [styles.activeFilter]:
              CONSTANTS.MODERATION_STATUS_REJECTED === status,
              [styles.filter]:
              CONSTANTS.MODERATION_STATUS_REJECTED !== status,
            })}
          >
            Rejected
          </div>
        </div>
        <div className={styles.offersContainer}>
          {offersComponent}
          <Pagination
            currentPage={page}
            setPage={setPage}
            totalPages={Math.ceil(count / limit)}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfferModeration;
