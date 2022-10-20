import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Source} from './model';
import {Freet} from 'freet/model';
import FreetCollection from '../freet/collection';

type SourceResponse = {
  _id: string;
  source1: string;
  source2: string;
  source3: string;
  freetId: string;
};

/**
 * Transform a raw Source object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Source>} source - A source
 * @returns {SourceResponse} - The source object formatted for the frontend
 */
const constructSourceResponse = async (source: HydratedDocument<Source>): Promise<SourceResponse> => ({
  _id: source._id.toString(),
  freetId: source.freetId,
  source1: source.source1,
  source2: source.source2,
  source3: source.source3
});

export {
  constructSourceResponse
};

