import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Expand} from './model';
import {Freet} from 'freet/model';
import FreetCollection from '../freet/collection';

type ExpandResponse = {
  _id: string;
  content: string;
  freetId: string;
};

/**
 * Transform a raw Expand object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Expand>} expand - A expand
 * @returns {ExpandResponse} - The expand object formatted for the frontend
 */
const constructExpandResponse = async (expand: HydratedDocument<Expand>): Promise<ExpandResponse> => ({
  _id: expand._id.toString(),
  freetId: expand.freetId,
  content: expand.content
});

export {
  constructExpandResponse
};

