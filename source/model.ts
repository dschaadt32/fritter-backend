import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
/**
 * This file defines the properties stored in a source
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for source on the backend
export type Source = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  source1: string;
  source2: string;
  source3: string;
  freetId: string;
};

const SourceSchema = new Schema({
  source1: {
    type: String,
    required: false
  },
  source2: {
    type: String,
    required: false
  },
  source3: {
    type: String,
    required: false
  },
  // The freetid the source is associated with
  freetId: {
    type: String,
    required: true
  }

});

const SourceModel = model<Source>('Source', SourceSchema);
export default SourceModel;
