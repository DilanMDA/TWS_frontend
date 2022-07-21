import * as yup from "yup";
import taskFormModel from "./taskFormModel";

const {
    formField:{
        title,
        description,
        timeAllocation,
        urgency,
        status
    }
} = taskFormModel;

const taskFormValidationSchema = yup.object().shape({
    [title.name]:yup.string().required(title.requiredError),
    [timeAllocation.name]:yup.number().required(timeAllocation.requiredError)
})

export default taskFormValidationSchema;