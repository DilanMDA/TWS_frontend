import * as yup from "yup";
import teamFormModel from "./teamFormModel";

const {
    formField:{
        title
    }
} = teamFormModel;

const teamFormValidationSchema = yup.object().shape({
    [title.name]:yup.string().required(title.requiredError)
})

export default teamFormValidationSchema;