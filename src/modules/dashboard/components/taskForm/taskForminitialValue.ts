import taskFormModel from "./taskFormModel";
import { TaskFormModel } from "../../../../application/models/TaskModels";

const {
    formField:{
        title,
        description,
        timeAllocation,
        urgency,
        status
    }
} = taskFormModel;

const taskFormInitialValue:TaskFormModel = {
    [title.name]:title.initialValue,
    [description.name]:description.initialValue,
    [timeAllocation.name]:timeAllocation.initialValue,
    [urgency.name]:urgency.initialValue,
    [status.name]:status.initialValue
}

export default taskFormInitialValue;