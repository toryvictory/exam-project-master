import React, { useCallback } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { userSelector } from "../../../selectors";
import ImageUpload from "../../InputComponents/ImageUpload/ImageUpload";
import styles from "../../UpdateUserInfoForm/UpdateUserInfoForm.module.sass";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const ChangeUserInfoForm = (props) => {

    const user = useSelector(userSelector);

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
                onSubmit={ useCallback(
                    (values) => {
                        onSubmit(prepareData(values));
                    },
                    [onSubmit, prepareData]
                )
                }
            >
                {(formProps) => <Form>

                    <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                    />
                    <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                    />
                    <MyTextInput
                        label="Display Name"
                        name="displayName"
                        type="text"
                    />

                   <ImageUpload
                        onChange = {(file) => {
                            formProps.setFieldValue("file", file)}}
                        classes={{
                            uploadContainer: styles.imageUploadContainer,
                            inputContainer: styles.uploadInputContainer,
                            imgStyle: styles.imgStyle,
                        }}
                    />

                    <button type="submit">Submit</button>
                </Form>
                }
            </Formik>
    );
};

export default ChangeUserInfoForm;

