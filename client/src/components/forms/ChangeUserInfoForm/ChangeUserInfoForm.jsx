import React, {useCallback, useEffect} from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {userSelector} from "../../../selectors";

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

    return (
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    displayName: user.displayName,
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string().trim().required('required field'),
                    lastName: Yup.string().trim().required('required field'),
                    displayName: Yup.string().trim().required('required field'),
                })}
                onSubmit={ useCallback(
                    (values) => {
                        onSubmit(values);
                    },
                    [onSubmit]
                )
                }
            >
                <Form>
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

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
    );
};

export default ChangeUserInfoForm;

