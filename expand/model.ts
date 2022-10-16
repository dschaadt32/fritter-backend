import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
/**
 * This file defines the properties stored in a Expand
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Expand on the backend
export type Expand = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  content: string;
  freetId: string;
};

const ExpandSchema = new Schema({
  // The expands's content
  content: {
    type: String,
    required: true
  },
  // The freetid the expand is associated with
  freetId: {
    type: String,
    required: true
  }
});

const ExpandModel = model<Expand>('Expand', ExpandSchema);
export default ExpandModel;
