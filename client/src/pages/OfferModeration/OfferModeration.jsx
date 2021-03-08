import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getOffers } from '../../actions/offers/offersActionCreators';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OffersList from './OffersList/OffersList';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import CONSTANTS from '../../constants';
import styles from './OfferModeration.module.sass';

const OfferModeration = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => dispatch(getOffers()), [dispatch]);
  const [status, setStatus] = useState(CONSTANTS.MODERATION_STATUS_PENDING);
  const { offers, error, isFetching } = useSelector((state) => state.offersStore);
  const filteredOffers = offers.filter((offer) => offer.moderationStatus === status);
  if (status !== CONSTANTS.MODERATION_STATUS_PENDING) {
    filteredOffers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  if (isFetching) { return <Spinner />; }
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
          {
            error ? <TryAgain getData={() => dispatch(getOffers())} />
              : <OffersList offers={filteredOffers} />
          }
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfferModeration;
