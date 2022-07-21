import teamFormModel from "./teamFormModel";
import { TeamFormModel } from "../../../../application/models/Team.models";

const {
    formField:{
        title,
        description
    }
} = teamFormModel;

const teamFormInitialValue:TeamFormModel = {
    [title.name]:title.initialValue,
    [description.name]:description.initialValue
}

export default teamFormInitialValue;