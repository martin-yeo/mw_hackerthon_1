{
  collectionName: 'reservations',
  info: {
    singularName: 'reservation',
    pluralName: 'reservations',
    displayName: '예약',
    description: 'FabLab 시설 예약'
  },
  options: {
    draftAndPublish: true
  },
  attributes: {
    user: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::users-permissions.user'
    },
    seat: {
      type: 'string',
      required: true,
      enum: ['동1', '동2', '서1', '서2', '창가1', '아이맥1', '테이블1'] // 등
    },
    startTime: {
      type: 'datetime',
      required: true
    },
    endTime: {
      type: 'datetime',
      required: true
    },
    purpose: {
      type: 'string',
      required: true
    },
    status: {
      type: 'enumeration',
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending'
    }
  }
} 