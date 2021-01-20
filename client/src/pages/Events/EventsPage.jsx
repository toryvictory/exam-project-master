import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventForm from '../../components/forms/EventForm/EventForm';
import { addEvent } from '../../actions/events/eventsActionCreators';
import { userSelector } from '../../selectors';
import EventsContainer from '../../components/EventsContainer/EventsContainer';
import Header from '../../components/Header/Header';
import commonStyles from '../../common/styles/commonClasses.module.sass';
import Footer from '../../components/Footer/Footer';

const EventsPage = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelector) || {};
  const { id } = user;
  const handleEventFormSubmit = (values) => {
    const event = values;
    event.userId = id;
    event.eventDateTime = event.eventDateTime.toDate();
    event.timerStartDate = new Date();
    dispatch(addEvent(event));
  };

  return (
    <div className={commonStyles.pageContainer}>
      <Header />
      <EventForm onSubmit={handleEventFormSubmit} />
      <EventsContainer userId={id} />
      <Footer />
    </div>
  );
};
export default EventsPage;
