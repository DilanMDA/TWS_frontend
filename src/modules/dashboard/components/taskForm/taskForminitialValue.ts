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
    [timeAllocation.name]:timeAllocation.initialValue
}

export default taskFormInitialValue;