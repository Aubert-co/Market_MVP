"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsServices = void 0;
class ViewsServices {
    constructor(views) {
        this.views = views;
    }
    async increaseProductViews({ productId, sessionId, userId, source }) {
        try {
            await this.views.increaseProductViews({ productId, userId, sessionId,
                source
            });
        }
        catch (err) {
            return;
        }
    }
}
exports.ViewsServices = ViewsServices;
