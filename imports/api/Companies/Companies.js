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

//Companies.baseSchema = baseSchema;
//Households.addressSchema = addressSchema;


let locationSchema = new SimpleSchema({
  address: {
    type: String,
    optional: true
  },
  address2: {
    type: String,
    optional: true
  },
  city: {
    type: String,
    optional: true
  },
  state: {
    type: String,
    optional: true
  },
  zip: {
    type: String,
    optional: true
  },
  county: {
    type: String,
    optional: true
  },
});


/*Companies.schema = new SimpleSchema({
  modelType: {
    type: String,
    allowedValues: modelEnums,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return modelEnumsObject.company;
        }
    }
  },
  Industry: {
    type: String,
    optional: true
  },
  'NAICS Code': {
    type: String,
    optional: true
  },
  Desc: {
    type: String,
    optional: true
  },
  'Company Name': {
    type: String,
    optional: true
  },
  'Annual Revenue': {
    type: String,
    optional: true
  },
  State: {
    type: String,
    optional: true
  },
  City: {
    type: String,
    optional: true
  },
  County: {
    type: String,
    optional: true
  },
  Address2: {
    type: String,
    optional: true,
  },
  Address: {
    type: String,
    optional: true
  },
});*/

/*Companies.schema = new SimpleSchema({
  modelType: {
    type: String,
    allowedValues: modelEnums,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return modelEnumsObject.company;
        }
    }
  },
  industry: {
    type: String,
    optional: true
  },
  revenue: {
    type: Number,
    optional: true
  },
  employeeCount: {
    type: Number,
    optional: true
  },
  naicsCodes:{
    type: [String],
    optional: true
  },
  website: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  address: {
    type: locationSchema,
    optional: true,
  },
  location: {
    type: addressSchema,
    optional: true
  },
});*/




// ATTACH SCHEMAS TO THIS COLLECTION
// --------------------------------------------------------------

//Companies.attachSchema(Companies.schema); // schema specific to this collection's model (i.e. the schema declared in this file)
//Companies.attachSchema(Companies.baseSchema); // relevant for almost all collections
//Households.attachSchema(Households.addressSchema); // relevant for almost all collections




// COLLECTION INDEXES
//--------------------------------------------------------------

if (Meteor.isServer) {
  Companies._ensureIndex({
    "title": "text"
  });

}


// FACTORY + FAKER USED FOR POPULATING DATABASE WITH FAKE DATA
//--------------------------------------------------------------
/*
Factory.define('companies', Companies, {
  title: () => faker.hacker.phrase(),
});*/