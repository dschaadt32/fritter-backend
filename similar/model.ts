import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
/**
 * This file defines the properties stored in a Similar
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Similar on the backend
export type Similar = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  similar1: string;
  similar2: string;
  freetId: string;
};

const SimilarSchema = new Schema({
  // The similars's content
  similar1: {
    type: String,
    required: true
  },
  similar2: {
    type: String,
    required: true
  },
  // The freetid the similar is associated with
  freetId: {
    type: String,
    required: true
  }
});

const SimilarModel = model<Similar>('Similar', SimilarSchema);
export default SimilarModel;
