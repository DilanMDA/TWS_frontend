const taskFormModel = {
    formId: 'taskForm',
    formField:{
        title: {
            name:"title",
            label:"Title",
            initialValue:"",
            requiredError:"Task Title is require."
        },
        description: {
            name:"description",
            label:"Description",
            initialValue:""
        },
        timeAllocation:{
            name:"timeAllocation",
            label:"Time Allocated",
            initialValue:0,
            requiredError:"Task Time Allocated is required"
        },
        urgency:{
            name:"urgency",
            label:"Urgency",
            initialValue:""
        },
        status:{
            name:"status",
            label:"Status",
            initialValue:"to-do"
        }
    }
}

export default taskFormModel;