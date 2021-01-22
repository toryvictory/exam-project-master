import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import TextInput from '../../InputComponents/TextInput/TextInput';
import DateTimeInput from '../../InputComponents/DateTimeInput/DateTimeInput';
import styles from './EventForm.module.sass';
import commonStyles from '../../../common/styles/commonClasses.module.sass';
import DaysHoursMinutesInput from '../../InputComponents/DaysHoursMinutesInput/DaysHoursMinutesInput';

const EventForm = (props) => {
  const initialValues = {
    eventName: '',
    eventDateTime: moment(),
    notificationDaysEarlier: 0,
    notificationHoursEarlier: 0,
    notificationMinutesEarlier: 0,
  };

  const yesterday = moment().subtract(1, 'd');
  const inThreeYears = moment().add(3, 'y');
  const validDate = (current) => current.isAfter(yesterday) && current.isBefore(inThreeYears);

  const validationSchema = Yup.object({
    eventName: Yup.string().trim().required(),
    eventDateTime: Yup
      .mixed()
      .required()
      .test('is-future_date', 'The date cannot be in the past', (current) => current.isAfter(moment()))
      .test('is-within-three-years', 'The date must be in the diapason of three years from now', (current) => current.isBefore(inThreeYears)),
    notificationDaysEarlier: Yup.number().default(0),
    notificationHoursEarlier: Yup.number().default(0),
    notificationMinutesEarlier: Yup.number().default(0),
  });

  const { onSubmit } = props;

  const handleSubmit = useCallback(
    (values) => {
      onSubmit(values);
    },
    [onSubmit],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(formikProps) => (
        <Form className={styles.formContainer}>
          <TextInput
            name="eventName"
            label="Event name"
            placeholder="Name of the Event"
            type="text"
          />
          <DateTimeInput
            name="eventDateTime"
            label="Select the date and time of the event"
            onChange={(value) => { formikProps.setFieldValue('eventDateTime', value); }}
            isValidDate={validDate}
          />
          <DaysHoursMinutesInput setFieldValue={formikProps.setFieldValue} />
          <button className={commonStyles.appButton} type="submit">
            Confirm
          </button>
        </Form>
      )}
    </Formik>
  );
};

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default EventForm;
