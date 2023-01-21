/*exports.timeDecay = function (gravity) {
    if (gravity == null) {
        gravity = 1.8;
    }
    return function () {
        var hourAge = (Date.now() - i.publish_date) / (1000 * 3600);
        console.log(hourAge)
        return (i.likes - 1) / Math.pow(hourAge + 2, gravity);
    };
};*/

module.exports = {
    timeDecay: function(photo) {
        if (gravity == null) {
            gravity = 1.8;
        }
        console.log(gravity);
        var hourAge = (Date.now() - photo.publish_date) / (1000 * 3600);
        console.log(hourAge);
        return (photo.likes - 1) / Math.pow(hourAge + 2, gravity);
    }
}