/**
 * An object containing various message types for task management.
 */

export const Events = {
    SwitchToHomePage: 'SwitchToHomePage',
    SwitchToExplorePage: 'SwitchToExplorePage',
    SwitchToProfilePage: 'SwitchToProfilePage',
    SwitchToLoginPage: 'SwitchToLoginPage',

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

    SignUp: 'SignUp',
    ListItem: 'ListItem',
    StartNewChat: 'StartNewChat',
    MarkItemSold: 'MarkItemSold',
    FindEasterEgg: 'FindEasterEgg',
    ViewItem: 'ViewItem'
};