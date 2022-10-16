import type {HydratedDocument, Types} from 'mongoose';
import type {Expand} from './model';
import ExpandModel from './model';
import type {Freet} from 'freet/model';

class ExpandCollection {
  /**
   * Add a new expand
   *
   * @param {string} content - The content of the expand
   * @param {Freet} freet - the freet the expand is associated with
   * @return {Promise<HydratedDocument<Expand>>} - The newly created expand
   */
  static async addOne(content: string, freet: Freet): Promise<HydratedDocument<Expand>> {
    const dateJoined = new Date();

    const expand = new ExpandModel({content, freet, dateJoined});
    await expand.save();
    return expand;
  }

  /**
   * Update expands's content
   * @param {string} expandId - The expandId of the expand to find
   * @param {String} expandContent - new content to put in expand
   * @return {Promise<HydratedDocument<Expand>>} - The updated expand
   */
  static async updateOne(expandContent: string, expandId: string): Promise<HydratedDocument<Expand>> {
    const expand = await ExpandModel.findOne({expandId});
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
    const expand = await ExpandModel.deleteOne({expandId});
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
}

export default ExpandCollection;
