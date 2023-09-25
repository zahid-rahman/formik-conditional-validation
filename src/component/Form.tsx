"use client";

import { createSchema, draftSchema } from "@/schema/form";
import { ErrorMessageProps, Field, FormikErrors, useFormik } from "formik";
import React, { useEffect, useState } from "react";

export default function Form() {
  const [submitType, setSubmitType] = useState<string | null>("draft");
  //   const [resetForm, setResetForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      age: 0,
      nationality: "",
    },
    validate(values: any) {
      if (submitType === "draft") {

        return draftSchema
          .validate(values, { abortEarly: false })
          .then((val) => {
            return {}
          })
          .catch((err) => {
            // Convert the Yup errors to an object that Formik can understand
            const errorMessages: any = {};
            err.inner.forEach((e: any) => {
              errorMessages[e.path] = e.message;
            });
            return errorMessages; // Return only error messages
          });
      } else if (submitType === "create") {
        return createSchema
          .validate(values, { abortEarly: false })
          .then((val) => {
            return {}
          })
          .catch((err) => {
            // Convert the Yup errors to an object that Formik can understand
            const errorMessages: any = {};
            err.inner.forEach((e: any) => {
              errorMessages[e.path] = e.message;
            });
            return errorMessages; // Return only error messages
          });
      }
      formik.setErrors({});
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;

  console.log(errors);
  console.log("type", submitType);
  const err: any = errors

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          type="text"
          placeholder="first name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.firstName && errors.firstName ? (
          <small style={{ color: "red" }}>{err.firstName}</small>
        ) : null}
        <br /> <br />
        <input
          name="middleName"
          type="text"
          placeholder="middle name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <small style={{ color: "red" }}>{err?.middleName}</small>
        <br /> <br />
        <input
          name="lastName"
          type="text"
          placeholder="last name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <small style={{ color: "red" }}>{err?.lastName}</small>
        <br /> <br />
        <input
          name="age"
          type="number"
          placeholder="age"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <small style={{ color: "red" }}>{err?.age}</small>
        <br /> <br />
        <select name="nationality" onChange={handleChange} onBlur={handleBlur}>
          <option value="">select one</option>
          <option value="local">local</option>
          <option value="foreign">foreign</option>
        </select>
        <small style={{ color: "red" }}>{err?.nationality}</small>
        <br /> <br />
        <button type="submit" onClick={() => setSubmitType("draft")}>
          draft
        </button>
        <button type="submit" onClick={() => setSubmitType("create")}>
          create
        </button>
      </form>
    </>
  );
}
