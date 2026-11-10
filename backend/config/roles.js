const permissions = {
    ADMIN: [
        "create_user",
        "read_user",
        "update_user",
        "delete_user",
        "create_task",
        "read_task",
        "update_task",
        "delete_task",
        "create_project",
        "read_project",
        "update_project",
        "delete_project",
        "create_department",
        "read_department",
        "update_department",
        "delete_department"
    ],

    EMPLOYEE: [
        "read_user",
        "read_task",
        "read_project",
        "read_department"
    ]
};

function hasPermission(role, permission) {
    const userPermissions = permissions[role?.toUpperCase()];

    if (!userPermissions) {
        return false;
    }

    return userPermissions.includes(permission);
}

module.exports = { permissions, hasPermission };