/**
 * Custom studio routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/studios/:id/devices',
      handler: 'custom-studio.addDevice',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/studios/:id/devices',
      handler: 'custom-studio.removeDevice',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/studios/:id/devices/position',
      handler: 'custom-studio.updateDevicePosition',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/studios/:id/connections',
      handler: 'custom-studio.createConnection',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/studios/:id/connections/:connectionId',
      handler: 'custom-studio.deleteConnection',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/studios/:id/viewport',
      handler: 'custom-studio.updateViewport',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
}
