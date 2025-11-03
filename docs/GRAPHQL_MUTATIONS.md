# GraphQL Mutations for Dawly Platform

## Studio Management

### Create Studio

```graphql
mutation CreateStudio {
  createStudio(data: {
    name: "My Studio"
    description: "Home studio setup"
    userId: "user123"
  }) {
    data {
      id
      attributes {
        name
        description
        userId
        createdAt
      }
    }
  }
}
```

### Update Studio

```graphql
mutation UpdateStudio {
  updateStudio(id: "1", data: {
    name: "Updated Studio Name"
    description: "New description"
  }) {
    data {
      id
      attributes {
        name
        description
        updatedAt
      }
    }
  }
}
```

### Delete Studio

```graphql
mutation DeleteStudio {
  deleteStudio(id: "1") {
    data {
      id
    }
  }
}
```

## Device Management

### Create Device

```graphql
mutation CreateDevice {
  createDevice(data: {
    name: "Digitakt II"
    manufacturer: "Elektron"
    model: "Digitakt II"
    type: "drum_machine"
    releaseYear: 2024
    ports: [
      { type: "midi_in", label: "MIDI IN" },
      { type: "midi_out", label: "MIDI OUT" },
      { type: "audio_out_left", label: "MAIN OUT L" },
      { type: "audio_out_right", label: "MAIN OUT R" }
    ]
  }) {
    data {
      id
      attributes {
        name
        manufacturer
        type
        ports
      }
    }
  }
}
```

### Update Device

```graphql
mutation UpdateDevice {
  updateDevice(id: "1", data: {
    description: "Updated description"
    imageUrl: "https://example.com/image.jpg"
  }) {
    data {
      id
      attributes {
        name
        description
        imageUrl
      }
    }
  }
}
```

## Studio-Device Relations

### Add Device to Studio

**REST API:**
```bash
POST /api/studios/1/devices
Content-Type: application/json

{
  "deviceId": "5"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "My Studio",
  "devices": [
    {
      "id": 5,
      "name": "Digitakt II"
    }
  ]
}
```

### Remove Device from Studio

**REST API:**
```bash
DELETE /api/studios/1/devices
Content-Type: application/json

{
  "deviceId": "5"
}
```

### Update Device Position

**REST API:**
```bash
PUT /api/studios/1/devices/position
Content-Type: application/json

{
  "deviceId": "5",
  "position": {
    "x": 100,
    "y": 200
  }
}
```

## Connection Management

### Create Connection

**REST API:**
```bash
POST /api/studios/1/connections
Content-Type: application/json

{
  "sourceDeviceId": "5",
  "sourcePortId": "digitakt-ii-midi-out",
  "targetDeviceId": "8",
  "targetPortId": "audio-interface-midi-in",
  "cableType": "midi",
  "notes": "Clock sync connection"
}
```

**Response:**
```json
{
  "id": 10,
  "sourceDeviceId": "5",
  "sourcePortId": "digitakt-ii-midi-out",
  "targetDeviceId": "8",
  "targetPortId": "audio-interface-midi-in",
  "cableType": "midi",
  "notes": "Clock sync connection"
}
```

### Delete Connection

**REST API:**
```bash
DELETE /api/studios/1/connections/10
```

**Response:**
```json
{
  "deleted": true,
  "id": "10"
}
```

### Update Connection

```graphql
mutation UpdateConnection {
  updateConnection(id: "10", data: {
    cableType: "audio"
    notes: "Updated connection notes"
    color: "#FF0000"
  }) {
    data {
      id
      attributes {
        cableType
        notes
        color
      }
    }
  }
}
```

## Viewport Management

### Update Studio Viewport

**REST API:**
```bash
PUT /api/studios/1/viewport
Content-Type: application/json

{
  "viewport": {
    "x": 0,
    "y": 0,
    "zoom": 1.5
  }
}
```

## Query Examples

### Get Studio with All Relations

```graphql
query GetStudio {
  studio(id: "1") {
    data {
      id
      attributes {
        name
        description
        userId
        layout
        viewport
        devices {
          data {
            id
            attributes {
              name
              manufacturer
              type
              ports
            }
          }
        }
        connections {
          data {
            id
            attributes {
              sourceDeviceId
              sourcePortId
              targetDeviceId
              targetPortId
              cableType
              notes
            }
          }
        }
      }
    }
  }
}
```

### List User Studios

```graphql
query ListStudios {
  studios(filters: { userId: { eq: "user123" } }) {
    data {
      id
      attributes {
        name
        description
        createdAt
        updatedAt
        devices {
          data {
            id
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
```

### Search Devices

```graphql
query SearchDevices {
  devices(
    filters: {
      or: [
        { name: { containsi: "digitakt" } }
        { manufacturer: { containsi: "elektron" } }
      ]
    }
    pagination: { page: 1, pageSize: 10 }
  ) {
    data {
      id
      attributes {
        name
        manufacturer
        type
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
      }
    }
  }
}
```

## Authorization

All mutations require JWT authentication:

```
Authorization: Bearer <jwt_token>
```

### Get JWT Token

**REST API:**
```bash
POST /api/auth/local
Content-Type: application/json

{
  "identifier": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "user",
    "email": "user@example.com"
  }
}
```

## Error Handling

### Validation Errors

```json
{
  "error": {
    "status": 400,
    "name": "ValidationError",
    "message": "Invalid input",
    "details": {
      "errors": [
        {
          "path": ["name"],
          "message": "name is required"
        }
      ]
    }
  }
}
```

### Not Found

```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Studio not found"
  }
}
```

### Unauthorized

```json
{
  "error": {
    "status": 403,
    "name": "ForbiddenError",
    "message": "You do not have permission to access this resource"
  }
}
```

## Best Practices

1. **Always populate relations** when querying studios to get full data
2. **Validate device existence** before adding to studio
3. **Clean up connections** when removing devices from studio
4. **Use transactions** for complex multi-step operations
5. **Implement optimistic updates** on frontend for better UX
6. **Batch requests** when possible using GraphQL
7. **Cache query results** with Apollo Client or React Query

## Frontend Integration

### Apollo Client Example

```typescript
import { gql, useMutation } from '@apollo/client'

const CREATE_STUDIO = gql`
  mutation CreateStudio($data: StudioInput!) {
    createStudio(data: $data) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`

function CreateStudioButton() {
  const [createStudio, { loading, error }] = useMutation(CREATE_STUDIO)

  const handleCreate = async () => {
    try {
      const result = await createStudio({
        variables: {
          data: {
            name: 'New Studio',
            userId: 'user123'
          }
        }
      })
      console.log('Created:', result.data.createStudio.data)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return <button onClick={handleCreate}>Create Studio</button>
}
```

### Fetch API Example

```typescript
async function addDeviceToStudio(studioId: string, deviceId: string) {
  const response = await fetch(`/api/studios/${studioId}/devices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    },
    body: JSON.stringify({ deviceId })
  })

  if (!response.ok) {
    throw new Error('Failed to add device')
  }

  return response.json()
}
```
