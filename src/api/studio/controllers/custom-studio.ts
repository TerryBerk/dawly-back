/**
 * Custom studio controller with additional mutations
 */

export default {
  /**
   * Add device to studio
   */
  async addDevice(ctx) {
    const { id } = ctx.params
    const { deviceId } = ctx.request.body

    try {
      const studio = await strapi.entityService.findOne('api::studio.studio', id, {
        populate: ['devices'],
      })

      if (!studio) {
        return ctx.notFound('Studio not found')
      }

      // Check if device exists
      const device = await strapi.entityService.findOne('api::device.device', deviceId)
      if (!device) {
        return ctx.notFound('Device not found')
      }

      // Add device to studio (many-to-many)
      const updatedStudio = await strapi.entityService.update('api::studio.studio', id, {
        data: {
          devices: {
            connect: [deviceId],
          },
        },
        populate: ['devices', 'connections'],
      })

      return updatedStudio
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  /**
   * Remove device from studio
   */
  async removeDevice(ctx) {
    const { id } = ctx.params
    const { deviceId } = ctx.request.body

    try {
      const studio = await strapi.entityService.findOne('api::studio.studio', id, {
        populate: ['devices'],
      })

      if (!studio) {
        return ctx.notFound('Studio not found')
      }

      // Remove device from studio
      const updatedStudio = await strapi.entityService.update('api::studio.studio', id, {
        data: {
          devices: {
            disconnect: [deviceId],
          },
        },
        populate: ['devices', 'connections'],
      })

      // Also remove all connections involving this device
      const connections = await strapi.entityService.findMany('api::connection.connection', {
        filters: {
          studio: { id },
          $or: [{ sourceDeviceId: deviceId }, { targetDeviceId: deviceId }],
        },
      })

      // Delete connections
      for (const connection of connections) {
        await strapi.entityService.delete('api::connection.connection', connection.id)
      }

      return updatedStudio
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  /**
   * Update device position in studio
   */
  async updateDevicePosition(ctx) {
    const { id } = ctx.params
    const { deviceId, position } = ctx.request.body

    try {
      const studio = await strapi.entityService.findOne('api::studio.studio', id)

      if (!studio) {
        return ctx.notFound('Studio not found')
      }

      // Update layout JSON with new position
      const layout = studio.layout || {}
      layout[deviceId] = position

      const updatedStudio = await strapi.entityService.update('api::studio.studio', id, {
        data: { layout },
        populate: ['devices', 'connections'],
      })

      return updatedStudio
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  /**
   * Create connection between devices
   */
  async createConnection(ctx) {
    const { id } = ctx.params
    const { sourceDeviceId, sourcePortId, targetDeviceId, targetPortId, cableType, notes } =
      ctx.request.body

    try {
      const studio = await strapi.entityService.findOne('api::studio.studio', id)

      if (!studio) {
        return ctx.notFound('Studio not found')
      }

      // Validate that both devices are in the studio
      const studioWithDevices = await strapi.entityService.findOne('api::studio.studio', id, {
        populate: ['devices'],
      })

      const deviceIds = studioWithDevices.devices.map((d) => d.id)
      if (!deviceIds.includes(sourceDeviceId) || !deviceIds.includes(targetDeviceId)) {
        return ctx.badRequest('Both devices must be in the studio')
      }

      // Create connection
      const connection = await strapi.entityService.create('api::connection.connection', {
        data: {
          studio: id,
          sourceDeviceId,
          sourcePortId,
          targetDeviceId,
          targetPortId,
          cableType,
          notes,
        },
      })

      return connection
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  /**
   * Delete connection
   */
  async deleteConnection(ctx) {
    const { id, connectionId } = ctx.params

    try {
      const connection = await strapi.entityService.findOne(
        'api::connection.connection',
        connectionId,
        {
          populate: ['studio'],
        }
      )

      if (!connection) {
        return ctx.notFound('Connection not found')
      }

      // Verify connection belongs to this studio
      if (connection.studio.id !== parseInt(id)) {
        return ctx.forbidden('Connection does not belong to this studio')
      }

      await strapi.entityService.delete('api::connection.connection', connectionId)

      return { deleted: true, id: connectionId }
    } catch (err) {
      ctx.throw(500, err)
    }
  },

  /**
   * Update studio viewport
   */
  async updateViewport(ctx) {
    const { id } = ctx.params
    const { viewport } = ctx.request.body

    try {
      const updatedStudio = await strapi.entityService.update('api::studio.studio', id, {
        data: { viewport },
      })

      return updatedStudio
    } catch (err) {
      ctx.throw(500, err)
    }
  },
}
