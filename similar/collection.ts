import type {HydratedDocument, Types} from 'mongoose';
import type {Similar} from './model';
import SimilarModel from './model';
import type {Freet} from 'freet/model';
import FreetCollection from '../freet/collection';
import FreetModel from '../freet/model';

class SimilarCollection {
  /**
   * Add a new similar
   *
   * @param {string} similar1_ - The freetid of the similar
   * @param {string} similar2_ - The freetid of the similar
   * @param {string} freet_Id - the freet the similar is associated with
   * @return {Promise<HydratedDocument<Similar>>} - The newly created similar
   */
  static async addOne(similar1_: string, similar2_: string, freet_Id: string): Promise<HydratedDocument<Similar>> {
    let freet = await FreetCollection.findOne(freet_Id);
    const similar = new SimilarModel({similar1: similar1_, similar2: similar2_, freetId: freet_Id});

    freet = await FreetCollection.updateOneSimilarId(freet._id, similar._id.toString());
    freet.similarId = similar._id.toString();
    await similar.save();
    return similar;
  }

  /**
 * Find a similar by similarId
 *
 * @param {string} similarId - The id of the similar to find
 * @return {Promise<HydratedDocument<Similar>> | Promise<null> } - The similar with the given similarId, if any
 */
  static async findOne(similarId: Types.ObjectId | string): Promise<HydratedDocument<Similar>> {
    return SimilarModel.findOne({_id: similarId});
  }
}

export default SimilarCollection;
