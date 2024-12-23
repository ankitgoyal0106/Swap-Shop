/**
 * An object containing various message types for task management.
 */

export const Events = {
    SwitchToHomePage: 'SwitchToHomePage',
    SwitchToExplorePage: 'SwitchToExplorePage',
    SwitchToProfilePage: 'SwitchToProfilePage',
    SwitchToLoginPage: 'SwitchToLoginPage',
    SwitchToItemPage: 'SwitchToItemPage',

    NewProfile: 'NewProfile',

    GetProfile: 'GetProfile',
    GetProfileSuccess: 'GetProfileSuccess',
    GetProfileFailure: 'GetProfileFailure',

    StoreProfile: 'StoreProfile',
    StoreProfileSuccess: 'StoreProfileSuccess',
    StoreProfileFailure: 'StoreProfileFailure',

    DeleteProfile: 'DeleteProfile',
    DeleteProfileSuccess: 'DeleteProfileSuccess',
    DeleteProfileFailure: 'DeleteProfileFailure',

    LoadProfile: 'LoadProfile',
    LoadProfileSuccess: 'LoadProfileSuccess',
    LoadProfileFailure: 'LoadProfileFailure',

    SwitchProfileToNotif: 'SwitchProfileToNotif',
    SwitchProfileToView: 'SwitchProfileToView',
    SwitchProfileToConvo: 'SwitchProfileToConvo',

    NewNotification: 'NewNotification',

    LoadNotifications: 'LoadNotifications',
    LoadNotificationsSuccess: 'LoadNotificationsSuccess',
    LoadNotificationsFailure: 'LoadNotificationsFailure',

    StoreNotification: 'StoreNotification',
    StoreNotificationSuccess: 'StoreNotificationSuccess',
    StoreNotificationFailure: 'StoreNotificationFailure',

    ClearNotifications: 'ClearNotifications',
    ClearNotificationsSuccess: 'ClearNotificationsSuccess',
    ClearNotificationsFailure: 'ClearNotificationsFailure',

    //Items storage events
    NewItem: 'NewItem',
    StoreItem: 'StoreItem',
    StoreItemSuccess: 'StoreItemSuccess',
    StoreItemFailure: 'StoreItemFailure',
    
    LoadItemsFailure: 'LoadItemsFailure',

    ClearItems: 'ClearItems',
    ClearItemsSuccess: 'ClearItemsSuccess',
    ClearItemsFailure: 'ClearItemsFailure',

    //Conversation storage events
    SaveNewChat: `SaveNewChat`,
    SaveNewChatSuccess: `SaveNewChatSuccess`,

    UpdateChat: `UpdateChat`,
    UpdateChatSuccess: `UpdateChatSuccess`,
    UpdateChatFailure: `UpdateChatFailure`,

    GetConvo: `GetConvo`,
    GetConvoSuccess: `GetConvoSuccess`,
    GetConvoFailure: `GetConvoFailure`,

    //Achievements
    SignUp: 'SignUp',
    ListItem: 'ListItem',
    MarkItemSold: 'MarkItemSold',
    FindEasterEgg: 'FindEasterEgg',
    ViewItem: 'ViewItem',

    ProfileEdited: 'EditedProfile',
    ProfileEditedSuccess: 'ProfileEditedSuccess',
    Login: 'Login',
    LoginSuccess: 'LoginSuccess',
    Logout: 'Logout',
    LogoutSuccess: 'LogoutSuccess',
    Registered: 'Registered',
    RegisterProfile: 'RegisterProfile',

    ChangedViewToProfile: 'ChangedViewToProfile',
    ChangedViewToEdit: 'ChangedViewToLogin',

    GetItemsWithEmail: 'GetItemsWithEmail',
    GetItemsWithEmailSuccess: 'GetItemsWithEmailSuccess',

    DeleteItem: 'DeleteItem',
    DeleteItemSuccess: 'DeleteItemSuccess'
};