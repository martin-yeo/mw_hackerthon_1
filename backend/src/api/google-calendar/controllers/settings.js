module.exports = {
  async getSettings(ctx) {
    const settings = await strapi.service('api::google-calendar.settings').find();
    ctx.body = settings;
  },

  async updateSettings(ctx) {
    const { clientId, clientSecret, redirectUri, apiKey } = ctx.request.body;
    const settings = await strapi.service('api::google-calendar.settings').update({
      data: { clientId, clientSecret, redirectUri, apiKey }
    });
    ctx.body = settings;
  }
}; 