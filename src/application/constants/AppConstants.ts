export const PROJECT_STATUS = {
    todo:{
        title:"To Do",
        value:"to-do"
    },
    inProgress:{
        title:"In Progress",
        value:"in-progress"
    },
    inReview:{
        title:"In Review",
        value:"in-review"
    },
    onHold:{
        title:"In Hold",
        value:"in-hold"
    },
    completed:{
        title:"Completed",
        value:"completed"
    },
    toBeReviewed:{
        title:"To Be Reviewed",
        value:"to-be-reviewed"
    }
}

export const PROJECT_STATUS_ARRAY = [
    PROJECT_STATUS.todo,
    PROJECT_STATUS.inProgress,
    PROJECT_STATUS.inReview,
    PROJECT_STATUS.onHold,
    PROJECT_STATUS.completed,
    PROJECT_STATUS.toBeReviewed
]

export const PROJECT_URGENCY = {
    urgent:{
        title:"Urgent",
        value:"urgent"
    },
    high:{
        title:"High",
        value:"high"
    },
    low:{
        title:"Low",
        value:"low"
    }
}

export const PROJECT_URGENCY_ARRAY = [
    PROJECT_URGENCY.urgent,
    PROJECT_URGENCY.high,
    PROJECT_URGENCY.low
]

export const USER_ROLES = {
    teamMember:{
        title:"Team Member",
        value:"teamMember"
    },
    projectManager:{
        title:"Project Manager",
        value:"projectManager"
    },
    admin:{
        title:"Admin",
        value:"admin"
    }
}

export const USER_ROLES_ARRAY = [
    USER_ROLES.teamMember,
    USER_ROLES.projectManager,
    USER_ROLES.admin
]

export const DATE_FORMAT = 'DD/MM/YYYY';
