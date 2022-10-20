import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Similar} from './model';
import {Freet} from 'freet/model';
import FreetCollection from '../freet/collection';

type SimilarResponse = {
  _id: string;
  similar1: string; // Freetid of the first similar freet
  similar2: string;
  freetId: string;
};

/**
 * Transform a raw Similar object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Similar>} similar - A similar
 * @returns {SimilarResponse} - The similar object formatted for the frontend
 */
const constructSimilarResponse = async (similar: HydratedDocument<Similar>): Promise<SimilarResponse> => ({
  _id: similar._id.toString(),
  freetId: similar.freetId,
  similar1: similar.similar1,
  similar2: similar.similar2,
});

export {
  constructSimilarResponse
};

