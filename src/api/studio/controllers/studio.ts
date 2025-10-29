/**
 * studio controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::studio.studio', ({ strapi }) => ({
  /**
   * Find studios - returns user's own studios + public studios
   */
  async find(ctx) {
    const user = ctx.state.user

    if (!user) {
      return ctx.unauthorized('You must be logged in to view studios')
    }

    // Build filters: user's own studios OR public studios
    const filters = {
      $or: [
        { user: { id: user.id } },
        { isPublic: true }
      ]
    }

    // Merge with any query filters
    const query = {
      ...ctx.query,
      filters: {
        ...ctx.query.filters,
        ...filters
      },
      populate: {
        user: {
          fields: ['id', 'username', 'email']
        }
      }
    }

    const studios = await strapi.entityService.findMany('api::studio.studio', query)

    return studios
  },

  /**
   * Find one studio
   */
  async findOne(ctx) {
    const user = ctx.state.user
    const { id } = ctx.params

    if (!user) {
      return ctx.unauthorized('You must be logged in')
    }

    const studio = await strapi.entityService.findOne('api::studio.studio', id, {
      populate: {
        user: {
          fields: ['id', 'username', 'email']
        }
      }
    })

    if (!studio) {
      return ctx.notFound('Studio not found')
    }

    // Check access: owner or public
    if (studio.user.id !== user.id && !studio.isPublic) {
      return ctx.forbidden('You cannot access this private studio')
    }

    return studio
  },

  /**
   * Create studio
   */
  async create(ctx) {
    const user = ctx.state.user

    if (!user) {
      return ctx.unauthorized('You must be logged in to create a studio')
    }

    const data = {
      ...ctx.request.body.data,
      user: user.id,
      version: 1
    }

    // Validate required fields
    if (!data.name) {
      return ctx.badRequest('Studio name is required')
    }

    if (!data.devices) {
      data.devices = []
    }

    if (!data.connections) {
      data.connections = []
    }

    if (data.isPublic === undefined) {
      data.isPublic = false
    }

    const studio = await strapi.entityService.create('api::studio.studio', {
      data,
      populate: {
        user: {
          fields: ['id', 'username', 'email']
        }
      }
    })

    return studio
  },

  /**
   * Update studio - only owner can update
   */
  async update(ctx) {
    const user = ctx.state.user
    const { id } = ctx.params

    if (!user) {
      return ctx.unauthorized('You must be logged in')
    }

    // Check ownership
    const studio = await strapi.entityService.findOne('api::studio.studio', id, {
      populate: ['user']
    })

    if (!studio) {
      return ctx.notFound('Studio not found')
    }

    if (studio.user.id !== user.id) {
      return ctx.forbidden('You can only update your own studios')
    }

    // Update data (don't allow changing user)
    const data = { ...ctx.request.body.data }
    delete data.user // Prevent user change

    // Increment version
    if (data.devices || data.connections || data.layout) {
      data.version = (studio.version || 1) + 1
    }

    const updated = await strapi.entityService.update('api::studio.studio', id, {
      data,
      populate: {
        user: {
          fields: ['id', 'username', 'email']
        }
      }
    })

    return updated
  },

  /**
   * Delete studio - only owner can delete
   */
  async delete(ctx) {
    const user = ctx.state.user
    const { id } = ctx.params

    if (!user) {
      return ctx.unauthorized('You must be logged in')
    }

    const studio = await strapi.entityService.findOne('api::studio.studio', id, {
      populate: ['user']
    })

    if (!studio) {
      return ctx.notFound('Studio not found')
    }

    if (studio.user.id !== user.id) {
      return ctx.forbidden('You can only delete your own studios')
    }

    const deleted = await strapi.entityService.delete('api::studio.studio', id)

    return deleted
  },

  /**
   * Custom action: duplicate studio
   */
  async duplicate(ctx) {
    const user = ctx.state.user
    const { id } = ctx.params

    if (!user) {
      return ctx.unauthorized('You must be logged in')
    }

    // Get original studio
    const original = await strapi.entityService.findOne('api::studio.studio', id, {
      populate: ['user']
    })

    if (!original) {
      return ctx.notFound('Studio not found')
    }

    // Check access
    if (original.user.id !== user.id && !original.isPublic) {
      return ctx.forbidden('You cannot duplicate this private studio')
    }

    // Create duplicate
    const duplicateData = {
      name: `${original.name} (Copy)`,
      description: original.description,
      devices: original.devices,
      connections: original.connections,
      layout: original.layout,
      isPublic: false, // Duplicates are always private
      version: 1,
      tags: original.tags,
      user: user.id
    }

    const duplicate = await strapi.entityService.create('api::studio.studio', {
      data: duplicateData,
      populate: {
        user: {
          fields: ['id', 'username', 'email']
        }
      }
    })

    return duplicate
  }
}))

