//top-level
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//enums
import { modelEnums, modelEnumsObject } from '../base-enums/base-enums';



// LOCATION SCHEMA
// ---------------------------------------------

export const addressSchema = new SimpleSchema({
    fullAddress: {
        type: String
    },
    lat: {
        type: Number,
        decimal: true
    },
    lng: {
        type: Number,
        decimal: true
    },
    geometry: {
        type: Object,
        blackbox: true
    },
    placeId: {
        type: String
    },
    street: {
        type: String,
        max: 100
    },
    city: {
        type: String,
        max: 50
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    country: {
        type: String
    },
    maps_url: {
        type: String
    },
});




// IMAGE SCHEMA
// ---------------------------------------------

export const ImageSchema = new SimpleSchema({
  height: {
    type: Number,
    optional: true,
  },
  width: {
    type: Number,
    optional: true,
  },
  bytes: {
    type: Number,
    optional: true,
  },
  filename: {
    type: String,
    optional: true,
  },
  path: {
    type: String,
    optional: true,
  },
  url: {
    type: String,
    optional: true,
  },
  tags: {
    type: [String],
    optional: true,
  },
  modelType: {
    type: String,
    allowedValues: modelEnums,
    autoValue: function() {
            return modelEnumsObject.image;
    }
  },
  parentId: {
    type: String,
    optional: true,
  },
  parentModelType: {
    type: String,
    optional: true,
    allowedValues: modelEnums,
  },
});



// BASE SCHEMA
// ---------------------------------------------

export const baseSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  image: {
    type: ImageSchema,
    optional: true,
  },
  tags: {
    type: [String],
    optional: true,
  },
  parentModelType: {
    type: String,
    optional: true,
    allowedValues: modelEnums,
  },
  parentId: {
    type: String,
    optional: true,
  },
  deleted: {
  	type: Boolean,
  	autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {  // only set on insert
            return false
        }
    }
  },
  ownerId: {
    type: String,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {  // only set on insert
           return Meteor.userId();
        }
    }
   },
  createdAt: {
    type: Date,
    autoValue: function() {
      // only set on insert
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return new Date()
        }
    }
  },
  updatedAt: {
    type: Date,
    // returns a new date on any update-- e.g. the last updated date
    autoValue: function() {
            return new Date()
    }
  },
});



