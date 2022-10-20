import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import ExpandCollection from './collection';
import * as userValidator from '../user/middleware';
import * as expandValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create an expand.
 *
 * @name POST /api/expand
 *
 * @param {string} content - content of expand
 * @param {string} freetId - freetId that expand is associated with
 * @return {ExpandResponse} - The created expand
 * @throws {403} - If there is a expand associated with the freet already
 * @throws {409} - If the expand does not exist
 * @throws {400} - If content is not in correct format
 *
 */
router.post(
  '/',
  [
    expandValidator.isValidExpandedContent,
    expandValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const expand = await ExpandCollection.addOne(req.body.content, req.body.freetId);
    req.session.expandId = expand._id.toString();
    res.status(201).json({
      message: 'Expand created successfully',
      expand: await util.constructExpandResponse(expand)
    });
  }
);

/**
 * Update an expand.
 *
 * @name PUT /api/expand
 *
 * @param {string} contents - The new content to put in the expand
 * @param {string} freetId - id of the freet the expand is associated with
 * @return {ExpandResponse} - The updated expand
 * @throws {403} - If there is a expand associated with the freet already
 * @throws {409} - If the freet does not exist
 * @throws {400} - If content is not in correct format
 */
router.put(
  '/',
  [
    expandValidator.isUserLoggedIn,
    expandValidator.expandExists,
    expandValidator.userIdEqualsauthorId,
    expandValidator.isValidExpandedContent,
    expandValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const expand = await ExpandCollection.updateOne(req.body.content, req.body.id, req.body.freetId);
    res.status(200).json({
      message: 'Your expand was updated successfully.',
      expand: await util.constructExpandResponse(expand)
    });
  }
);
/**
 * Delete an expand
 *
 * @name DELETE /api/expand
 *
 * @return {string} - A success message
 * @throws {403} - the expand does not exist
 */
router.delete(
  '/',
  [
    expandValidator.isUserLoggedIn,
    expandValidator.userIdEqualsauthorId
  ],
  async (req: Request, res: Response) => {
    console.log(req.body.id);
    await ExpandCollection.deleteOne(req.body.id);
    req.body.id = undefined;
    res.status(200).json({
      message: 'The expand has been deleted successfully.'
    });
  }
);

export {router as ExpandRouter};
