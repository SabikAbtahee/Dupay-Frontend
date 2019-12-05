export enum Roles{
    ADMIN='ADMIN',
    MERCHANT='MERCHANT',
    anonymousUser='anonymousUser'
}

export enum Merchant_Status{
    Approved='approved',
    Pending='pending',
    Rejected='rejected'
}

export enum Merchant_Types{
    TYPE_A='TYPE_A',
    TYPE_B='TYPE_B'
}

export enum Token_Role{
    ROLE_MERCHANT='ROLE_MERCHANT',
    ROLE_ADMIN='ROLE_ADMIN',
    ANNONYMOUS='ANNONYMOUS'
}

export enum Withdraw_status{
    PENDING='PENDING',
    REJECTED='REJECTED',
    IN_PROGRESS='IN_PROGRESS',
    DONE='DONE'
}

export enum Withdraw_status_view{
    PENDING='Pending',
    REJECTED='Reject',
    IN_PROGRESS='In progress',
    ACCEPT = 'Accept',
    DONE='Complete'
}

export enum Wallet_type{
    
    ROCKET='ROCKET',
    NEXUSPAY='NEXUSPAY',
    MOGOD='MOGOD',
    SURECASH='SURECASH',
    BKASH='BKASH'
}

export enum Rows{
    HOME=0,
    PROFILE=1,
    REQUEST=2,
    LIST=3,
    TRANSFER=4,
    NOTIFY=5,
    TRANSACTION=6
}