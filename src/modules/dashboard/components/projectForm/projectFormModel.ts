const projectFormModel = {
    formId: 'projectForm',
    formField:{
        title: {
            name:"title",
            label:"Title",
            initialValue:"",
            requiredError:"Project Title is require."
        },
        description: {
            name:"description",
            label:"Description",
            initialValue:""
        },
        startDate: {
            name:"startDate",
            label:"Start Date",
            initialValue:new Date().toISOString()
        },
        endDate: {
            name:"endDate",
            label:"End Date",
            initialValue:null
        }
    }
}

export default projectFormModel;