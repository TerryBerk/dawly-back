/**
 * studio service
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreService('api::studio.studio', ({ strapi }) => ({
  /**
   * Find studios by user
   */
  async findByUser(userId: number) {
    return await strapi.entityService.findMany('api::studio.studio', {
      filters: {
        user: { id: userId }
      },
      populate: ['user'],
      sort: { updatedAt: 'desc' }
    })
  },

  /**
   * Find public studios
   */
  async findPublic(limit: number = 20) {
    return await strapi.entityService.findMany('api::studio.studio', {
      filters: {
        isPublic: true
      },
      populate: ['user'],
      sort: { updatedAt: 'desc' },
      limit
    })
  },

  /**
   * Check if user owns studio
   */
  async isOwner(studioId: number, userId: number): Promise<boolean> {
    const studio = await strapi.entityService.findOne('api::studio.studio', studioId, {
      populate: ['user']
    })

    if (!studio) {
      return false
    }

    return studio.user.id === userId
  },

  /**
   * Get studio statistics
   */
  async getStatistics(studioId: number) {
    const studio = await strapi.entityService.findOne('api::studio.studio', studioId)

    if (!studio) {
      return null
    }

    const devices = Array.isArray(studio.devices) ? studio.devices : []
    const connections = Array.isArray(studio.connections) ? studio.connections : []

    return {
      deviceCount: devices.length,
      connectionCount: connections.length,
      version: studio.version,
      isPublic: studio.isPublic
    }
  }
}))

