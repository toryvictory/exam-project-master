import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OffersList from './OffersList/OffersList';
import styles from './OfferModeration.module.sass';
import { getOffers } from '../../actions/offers/offersActionCreators';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';

const OfferModeration = () => {
  const dispatch = useDispatch();
  useLayoutEffect(() => dispatch(getOffers()), [dispatch]);
  const { offers, error, isFetching } = useSelector((state) => state.offersStore);
  if (isFetching) return <Spinner />;
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div>
            Pending Approval
          </div>
          <div>
            Approved
          </div>
          <div>
            Rejected
          </div>
        </div>
        <div className={styles.offersContainer}>
          {
            error ? <TryAgain getData={() => dispatch(getOffers())} />
              : <OffersList offers={offers} />
          }
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfferModeration;
