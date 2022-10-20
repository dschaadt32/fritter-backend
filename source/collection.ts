import type {HydratedDocument, Types} from 'mongoose';
import type {Source} from './model';
import SourceModel from './model';
import type {Freet} from 'freet/model';
import FreetCollection from '../freet/collection';
import FreetModel from '../freet/model';

class SourceCollection {
  /**
   * Add a new source
   *
   * @param {string} source1_ - The first source url
   * @param {string} source2_ - The second source url
   * @param {string} source3_ - The second source url
   * @param {string} freet_Id - the freet the source is associated with
   * @return {Promise<HydratedDocument<Source>>} - The newly created source
   */
  static async addOne(source1_: string, source2_: string, source3_: string, freet_Id: string): Promise<HydratedDocument<Source>> {
    let freet = await FreetCollection.findOne(freet_Id);
    const source = new SourceModel({source1: source1_, source2: source2_, source3: source3_, freetId: freet_Id});
    freet = await FreetCollection.updateOneSourceId(freet._id, source._id.toString());
    freet.sourceId = source._id.toString();
    await source.save();
    return source;
  }

  /**
   * Update source's content
   * @param {string} sourceId - The sourceId of the source to find
   * @param {string} source1 - The first source url
   * @param {string} source2 - The second source url
   * @param {string} source3 - The second source url
   * @param {string} freet_Id - the freet the source is associated with
   * @return {Promise<HydratedDocument<Source>>} - The updated source
   */
  // eslint-disable-next-line max-params
  static async updateOne(sourceId: string, source1: string, source2: string, source3: string, freet_Id: string): Promise<HydratedDocument<Source>> {
    const source = await SourceModel.findOne({_id: sourceId, freetId: freet_Id});
    source.source1 = source1;
    source.source2 = source2;
    source.source3 = source3;
    await source.save();
    return source;
  }

  /**
   * Delete a source from the collection.
   *
   * @param {string} sourceId - the source object to delete
   * @return {Promise<Boolean>} - true if the source has been deleted, false otherwise
   */
  static async deleteOne(sourceId: string): Promise<boolean> {
    const source = await SourceModel.deleteOne({_id: sourceId});
    return source !== null;
  }

  /**
 * Find a source by sourceId
 *
 * @param {string} sourceId - The id of the source to find
 * @return {Promise<HydratedDocument<Source>> | Promise<null> } - The source with the given sourceId, if any
 */
  static async findOne(sourceId: Types.ObjectId | string): Promise<HydratedDocument<Source>> {
    return SourceModel.findOne({_id: sourceId});
  }
}

export default SourceCollection;
