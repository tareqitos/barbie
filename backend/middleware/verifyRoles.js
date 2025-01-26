const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles) {
            return res.sendStatus(401)
        }
        const rolesArray = [...allowedRoles]
        console.log(`rolesArray: ${rolesArray}`)
        console.log(`req.roles: ${req.roles}`)
        const result = req.roles.some((role) => rolesArray.includes(role))
        console.log(`role verification result: ${result}`)
        if (!result) {
            return res.sendStatus(401)
        }
        next()
    }
}
 
module.exports = verifyRoles