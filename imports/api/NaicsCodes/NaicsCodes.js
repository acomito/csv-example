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
export const NaicsCodes = new Mongo.Collection('NaicsCodes');

NaicsCodes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

NaicsCodes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});


// SCHEMA CREATION
// --------------------------------------------------------------

NaicsCodes.baseSchema = baseSchema;
//Households.addressSchema = addressSchema;


NaicsCodes.schema = new SimpleSchema({
  title: {
    type: String,
    optional: true
  },
  naicsCode: {
    type: String,
    optional: true
  },
  levelOne:{
    type: String,
    optional: true
  },
  levelTwo:{
    type: String,
    optional: true
  },
  levelThree:{
    type: String,
    optional: true
  },
  levelFour:{
    type: String,
    optional: true
  },
  modelType: {
    type: String,
    allowedValues: modelEnums,
    autoValue: function() {
        if (this.isInsert && (!this.isSet || this.value.length === 0)) {
            return modelEnumsObject.naics;
        }
    }
  },
});




// ATTACH SCHEMAS TO THIS COLLECTION
// --------------------------------------------------------------

NaicsCodes.attachSchema(NaicsCodes.schema); // schema specific to this collection's model (i.e. the schema declared in this file)
NaicsCodes.attachSchema(NaicsCodes.baseSchema); // relevant for almost all collections
//Households.attachSchema(Households.addressSchema); // relevant for almost all collections




// COLLECTION INDEXES
//--------------------------------------------------------------

if (Meteor.isServer) {
  NaicsCodes._ensureIndex({
    "title": "text",
  });
}


// FACTORY + FAKER USED FOR POPULATING DATABASE WITH FAKE DATA
//--------------------------------------------------------------
/*
Factory.define('companies', Companies, {
  title: () => faker.hacker.phrase(),
});*/