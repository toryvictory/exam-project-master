import React, { useCallback } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { authSelector } from '../../../selectors';
import TextInput from '../../InputComponents/TextInput/TextInput';
import ImageUpload from '../../InputComponents/ImageUpload/ImageUpload';
import styles from './ChangeUserInfoForm.module.sass';

const ChangeUserInfoForm = (props) => {
  const { user, isFetching } = useSelector(authSelector);

  const { onSubmit } = props;

  const prepareData = (values) => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    return formData;
  };

  return (
    <Formik
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        file: null,
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().trim().required('required field'),
        lastName: Yup.string().trim().required('required field'),
        displayName: Yup.string().trim().required('required field'),
        file: Yup.mixed(),
      })}
      onSubmit={useCallback(
        (values) => {
          onSubmit(prepareData(values));
        },
        [onSubmit],
      )}
    >
      {(formProps) => (
        <Form className={styles.updateContainer}>

          <TextInput
            label="First Name"
            name="firstName"
            type="text"
          />
          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
          />
          <TextInput
            label="Display Name"
            name="displayName"
            type="text"
          />

          <ImageUpload
            input={({
              onChange: (file) => {
                formProps.setFieldValue('file', file);
              },
            })}
            classes={{
              uploadContainer: styles.imageUploadContainer,
              inputContainer: styles.uploadInputContainer,
              imgStyle: styles.imgStyle,
            }}
          />

          <button type="submit">{isFetching ? 'Submitting' : 'Submit'}</button>
        </Form>
      )}
    </Formik>
  );
};

ChangeUserInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChangeUserInfoForm;
