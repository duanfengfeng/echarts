define(function (require) {

    var roamHelper = {};

    /**
     * Calculate pan and zoom which from roamDetail model
     * @param {module:echarts/model/Model} roamDetailModel
     * @param {Object} payload
     * @param {Array.<number>} [zoomLimit]
     */
    roamHelper.calcPanAndZoom = function (
        roamDetailModel, payload, zoomLimit
    ) {
        var dx = payload.dx;
        var dy = payload.dy;
        var zoom = payload.zoom;

        var panX = roamDetailModel.get('x') || 0;
        var panY = roamDetailModel.get('y') || 0;

        var previousZoom = roamDetailModel.get('zoom') || 1;

        if (dx != null && dy != null) {
            panX += dx;
            panY += dy;
        }
        if (zoom != null) {
            if (zoomLimit) {
                zoom = Math.max(
                    Math.min(previousZoom * zoom, zoomLimit[1]),
                    zoomLimit[0]
                ) / previousZoom;
            }
            var fixX = (payload.originX - panX) * (zoom - 1);
            var fixY = (payload.originY - panY) * (zoom - 1);

            panX -= fixX;
            panY -= fixY;
        }

        return {
            x: panX,
            y: panY,
            zoom: (zoom || 1) * previousZoom
        };
    };

    return roamHelper;
});