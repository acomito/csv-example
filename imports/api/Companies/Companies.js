//import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';
//schema and enums
import { baseSchema, addressSchema } from '../base-schema/base-schema';
import { modelEnums, modelEnumsObject, visibilityEnums } from '../base-enums/base-enums';

// DECLARE COLLECTION + ALLOW/DENY RULES
// --------------------------------------------------------------
export const Companies = new Mongo.Collection('Companies');

Companies.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Companies.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


// SCHEMA CREATION
// --------------------------------------------------------------

Companies.baseSchema = baseSchema;
//Households.addressSchema = addressSchema;


Companies.schema = new SimpleSchema({
  modelType: {
    type: String,
    allowedValues: modelEnums,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return modelEnumsObject.company;
        }
    }
  },
  revenue: {
    type: Number,
    optional: true
  },
  employeeCount: {
    type: Number,
    optional: true
  },
  website: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  location: {
    type: addressSchema,
    optional: true
  },
  address: {
    type: String,
    optional: true
  }
});




// ATTACH SCHEMAS TO THIS COLLECTION
// --------------------------------------------------------------

Companies.attachSchema(Companies.schema); // schema specific to this collection's model (i.e. the schema declared in this file)
Companies.attachSchema(Companies.baseSchema); // relevant for almost all collections
//Households.attachSchema(Households.addressSchema); // relevant for almost all collections




// COLLECTION INDEXES
//--------------------------------------------------------------

if (Meteor.isServer) {
  Companies._ensureIndex({
    "title": "text",
  });
}


// FACTORY + FAKER USED FOR POPULATING DATABASE WITH FAKE DATA
//--------------------------------------------------------------
/*
Factory.define('companies', Companies, {
  title: () => faker.hacker.phrase(),
});*/