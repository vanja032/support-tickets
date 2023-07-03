interface Role{
    name?: string,
    description?: string,
    created?: string
}

interface User{
    f_name?: string,
    l_name?: string,
    email?: string,
    username?: string,
    role?: Role,
    token?: string
}