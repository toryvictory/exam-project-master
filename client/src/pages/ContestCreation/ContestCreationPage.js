import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './ContestCreationPage.module.sass';
import {
  saveContestToStore,
  clearDataForContest,
  getDataForContest,
} from '../../actions/actionCreator';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import Schem from '../../validators/validationSchems';
import CONSTANTS from '../../constants';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';

const ContestCreationPage = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const {
    dataForContest, contestType, getData, contestStore, bundleStore, resetForm,
  } = props;
  const { isFetching } = dataForContest;

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const getPreference = () => {
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        getData({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        });
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        getData({ characteristic1: 'typeOfTagline' });
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        getData({ characteristic1: 'brandStyle' });
        break;
      }
    }
  };

  useEffect(() => {
    getPreference(contestType);
    window.scrollTo(0, 0);
  }, [pathname]);

  const submitDataContest = (values) => {
    const { saveContest } = props;
    saveContest({ type: contestType, info: values });
    history.push(
      bundleStore.bundle[contestType] === 'payment'
        ? '/payment'
        : `${bundleStore.bundle[contestType]}Contest`,
    );
  };

  !bundleStore.bundle && history.replace('/startContest');
  const contestData = contestStore.contests[contestType]
    ? contestStore.contests[contestType]
    : { contestType };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{props.title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            key={pathname}
            contestType={contestType}
            submitData={submitDataContest}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  const { contestStore, bundleStore, dataForContest } = state;
  return { contestStore, bundleStore, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  saveContest: (data) => dispatch(saveContestToStore(data)),
  clearDataForContest: () => dispatch(clearDataForContest()),
  getData: (data) => dispatch(getDataForContest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContestCreationPage);
