const { permissions } = require("../config/roles");

function hasPermission(permission) {
    return (req, res, next) => {
        const role = req.user.role;

        const userPermissions = permissions[role];

        if (!userPermissions?.includes(permission)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
}

module.exports = hasPermission;