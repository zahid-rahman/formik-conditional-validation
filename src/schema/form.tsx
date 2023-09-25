import * as Yup from "yup";
// Define Yup validation schema for draft submission
const draftSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required for draft"),
  // Add other validation rules for draft fields
});

// Define Yup validation schema for create submission
const createSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required for create"),
  lastName: Yup.string().required("Last Name is required for create"),
  middleName: Yup.string().required("Middle Name is required for create"),
  age: Yup.number().required("Age is required for create"),
  nationality: Yup.string().required("Nationality is required for create"),
});

export { draftSchema, createSchema };
