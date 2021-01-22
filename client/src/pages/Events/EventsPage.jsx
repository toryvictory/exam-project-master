import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sub } from 'date-fns';
import { toast } from 'react-toastify';
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
    const event = {};
    event.eventName = values.eventName;
    event.userId = id;
    event.eventDateTime = values.eventDateTime.toDate();
    event.timerStartDate = new Date();
    event.notificationDate = sub(event.eventDateTime, {
      days: values.notificationDaysEarlier,
      hours: values.notificationHoursEarlier,
      minutes: values.notificationMinutesEarlier,
    });
    event.isNotificationOn = false;
    dispatch(addEvent(event));
    toast('Your event has been added!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
