import projectFormModel from "./projectFormModel";
import { ProjectFormModel } from "../../../../application/models/ProjectModels";

const {
    formField:{
        title,
        description,
        startDate,
        endDate
    }
} = projectFormModel;

const projectForminitialValue:ProjectFormModel = {
    [title.name]:title.initialValue,
    [description.name]:description.initialValue,
    [startDate.name]:startDate.initialValue,
    [endDate.name]:endDate.initialValue
}

export default projectForminitialValue;