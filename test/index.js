var actions = require("./actions")
exports.handles = {
    "/test/create":actions.create,
    "/test/modify":actions.modify,
    "/test/select":actions.select,
    "/test/delete":actions.delete
}