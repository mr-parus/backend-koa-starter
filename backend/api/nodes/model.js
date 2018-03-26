const mongoose = require('mongoose'),
  log = require('../../services/logger')(module),
  { apiModelTransform } = require('../../utils'),
  { Schema } = require('mongoose');

const NODE_TYPES = ['req', 'js', 'ifr'];

const Node = new Schema({
  type: {
    type: String,
    required: [true, 'Type is required.'],
    validate: {
      validator: v => NODE_TYPES.includes(v),
      message: '{VALUE} is not a valid type.'
    }
  },
  sessionId: {
    type: String,
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'nodes',
    default: null
  },
  children: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'nodes'
        // unique: true,
      }
    ],
    default: []
  },
  data: {
    type: Object,
    default: {}
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

Node.virtual('childrenCount').get(() => this.children.length);

Node.pre('remove', next => {
  mongoose
    .model('nodes')
    .remove({ _id: { $in: this.children } })
    .then(() => next())
    .catch(e => log.error(e));
});

Node.set('toJSON', {
  virtuals: false,
  transform: apiModelTransform
});

module.exports = mongoose.model('nodes', Node);
