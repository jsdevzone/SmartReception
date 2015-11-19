module.exports = {
    storageKey: '@SmartReception',
    authConstants: createActions(['IS_AUTHENICATED'])
};

function createActions(array) {
    var obj = {};
    array.map((item) => obj[item] = item);
    return obj;
}
