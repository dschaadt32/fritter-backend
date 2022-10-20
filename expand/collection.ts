import type {HydratedDocument, Types} from 'mongoose';
import type {Expand} from './model';
import ExpandModel from './model';
import type {Freet} from 'freet/model';
import FreetCollection from '../freet/collection';
import FreetModel from '../freet/model';

class ExpandCollection {
  /**
   * Add a new expand
   *
   * @param {string} content_ - The content of the expand
   * @param {string} freet_Id - the freet the expand is associated with
   * @return {Promise<HydratedDocument<Expand>>} - The newly created expand
   */
  static async addOne(content_: string, freet_Id: string): Promise<HydratedDocument<Expand>> {
    let freet = await FreetCollection.findOne(freet_Id);
    const expand = new ExpandModel({content: content_, freetId: freet_Id});
    freet = await FreetCollection.updateOneExpandId(freet._id, expand._id.toString());
    freet.expandId = expand._id.toString();
    await expand.save();
    return expand;
  }

  /**
   * Update expands's content
   * @param {string} expandId - The expandId of the expand to find
   * @param {string} expandContent - new content to put in expand
   * @param {string} freetId - the id of the freet associated
   * @return {Promise<HydratedDocument<Expand>>} - The updated expand
   */
  static async updateOne(expandContent: string, expandId: string, freetId: string): Promise<HydratedDocument<Expand>> {
    const expand = await ExpandModel.findOne({_id: expandId});
    expand.content = expandContent;
    await expand.save();
    return expand;
  }

  /**
   * Delete a expand from the collection.
   *
   * @param {string} expandId - the expand object to delete
   * @return {Promise<Boolean>} - true if the expand has been deleted, false otherwise
   */
  static async deleteOne(expandId: string): Promise<boolean> {
    const expand = await ExpandModel.deleteOne({_id: expandId});
    return expand !== null;
  }

  /**
 * Find a expand by expandId
 *
 * @param {string} expandId - The id of the expand to find
 * @return {Promise<HydratedDocument<Expand>> | Promise<null> } - The expand with the given expandId, if any
 */
  static async findOne(expandId: Types.ObjectId | string): Promise<HydratedDocument<Expand>> {
    return ExpandModel.findOne({_id: expandId});
  }

  /**
 * Find a expand by freetId
 *
 * @param {string} freetId - The id of the freet associated to find
 * @return {Promise<HydratedDocument<Expand>> | Promise<null> } - The expand with the given expandId, if any
 */
  static async findOneByFreetId(freetId: Types.ObjectId | string): Promise<HydratedDocument<Expand>> {
    const expand = await FreetModel.findOne({_id: freetId});
    return ExpandModel.findOne({_id: expand._id});
  }
}

export default ExpandCollection;
