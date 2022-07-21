import * as yup from "yup";
import projectFormModel from "./projectFormModel";

const {
    formField:{
        title,
        description,
        startDate,
        endDate
    }
} = projectFormModel;

const projectFormValidationSchema = yup.object().shape({
    [title.name]:yup.string().required(title.requiredError)
})

export default projectFormValidationSchema;