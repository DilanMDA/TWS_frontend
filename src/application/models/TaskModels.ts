import { BaseDBModel } from "./BaseModels";
import { User } from "./UserModel";

export interface Task extends BaseDBModel{
    title:string;
    reporterId:string;
    reporter?:User;
    description?:string;
    timeAllocation:number;
    assigneeId:string;
    assignee?:User;
    urgency:string;
    status:string;
}

export interface TaskFormModel {
    title?:string;
    description?:string;
    timeAllocation?:number;
    reporterId?:string;
    assigneeId?:string;
    urgency?:string;
    status?:string;
}