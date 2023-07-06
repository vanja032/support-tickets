interface Ticket{
    subject?: string,
    message?: string,
    description?: string,
    status?: string,
    response?: string,
    response_by?: string,
    open?: boolean,
    created?: string,
    tags?: string[],
    username?: string,
    f_name?: string,
    l_name?: string,
    email?: string,
    user_ticket_id?: number;
}