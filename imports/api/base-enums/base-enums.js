import { Meteor } from 'meteor/meteor';

// MODEL TYPE ENUMS
//----------------------------------------------

export const modelEnums = [
  'interest',
  'userProfile',
  'category',
  'image',
  'message',
    "comment",
    "followInterest",
    "subCategory",
    "subInterest",
    "thread",
    "forum",
    "authentication",
    "handleFactory",
    "contest",
    "candidate",
    "prediction",
    "like",
    "admin",
    "privateChat",
    "categories",
    "candidateProfile",
    'watchGroup',
    'household',
    'householdMembers',
    'company',
    'naics'
];




export const modelEnumsObject = {
    interest: "interest",
    userProfile: "userProfile",
    category: "category",
    image: "image",
    message: "message",
    comment: "comment",
    followInterest: "followInterest",
    subCategory: "subCategory",
    subInterest: "subInterest",
    thread: "thread",
    forum: "forum",
    authentication: "authentication",
    handleFactory: "handleFactory",
    contest: "contest",
    candidate: "candidate",
    prediction: "prediction",
    like: "like",
    admin: "admin",
    privateChat: "privateChat",
    categories: "categories",
    candidateProfile: "candidateProfile",
    watchGroup: 'watchGroup',
    household: 'household',
    householdMembers: 'householdMembers',
    company: 'company',
    naics: 'naics'
};


// ERROR ENUMS
//----------------------------------------------

export const errorEnums = {
    notAuthorized: {
        code: "not-authorized",
        reason: "You need to sign in to do this."
    },
    notTheOwner: {
        code: "not-owner",
        reason: "You can't delete other peoples stuff! You can only delete things you created."
    },
}




// USER INTERFACE ENUMS
//----------------------------------------------
// default things like cdns for avatars

export const userInterfaceEnums = {
    defaultAvatar: "http://www.csuniv.edu/_resources/images/faculty-placeholder.png",
    defaultUserAvatar: "http://www.csuniv.edu/_resources/images/faculty-placeholder.png",
    defaultCandidateAvatar: "http://www.csuniv.edu/_resources/images/faculty-placeholder.png",
}




// VISIBILITY ENUMS
//----------------------------------------------

export const visibilityEnumsObject = {
    publicVisibility: "publicVisibility",
    privateVisibility: "privateVisibility",
    secretVisibility: "secretVisibility"
};

export const visibilityEnums = [
    "publicVisibility",
    "privateVisibility",
    "secretVisibility"
];



// LIMIT ENUMS
//----------------------------------------------


export const queryLimits = {
    transactions: {
        limit: 1000,
    },
    pokes: {
        limit: 1000,
    },
    messages: {
        limit: 1000,
    },
}


