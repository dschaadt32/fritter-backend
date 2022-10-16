import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import ExpandCollection from './collection';
import * as userValidator from '../user/middleware';
import * as expandValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a expand.
 *
 * @name POST /api/expand
 *
 * @param {string} content - content of expand
 * @param {Freet} freet - freet that expand is associated with
 * @return {ExpandResponse} - The created expand
 * @throws {403} - If there is a expand associated with the freet already
 * @throws {409} - If the freet does not exist
 * @throws {400} - If content is not in correct format
 *
 */
router.post(
  '/',
  [
    expandValidator.isValidExpandedContent
  ],
  async (req: Request, res: Response) => {
    const expand = await ExpandCollection.addOne(req.body.content, req.body.freet);
    req.session.expandId = expand._id.toString();
    res.status(201).json({
      message: 'Expand created successfully',
      expand: util.constructExpandResponse(expand)
    });
  }
);

/**
 * Update a expand's profile.
 *
 * @name PUT /api/expand
 *
 * @param {string} content - The new content to put in the expand
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
    expandValidator.isValidExpandedContent
  ],
  async (req: Request, res: Response) => {
    const expandId = (req.session.expandId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const expand = await ExpandCollection.updateOne(expandId, req.body);
    res.status(200).json({
      message: 'Your expand was updated successfully.',
      expand: util.constructExpandResponse(expand)
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
    expandValidator.expandExists,
    expandValidator.userIdEqualsauthorId,
    expandValidator.isValidExpandedContent
  ],
  async (req: Request, res: Response) => {
    const expandId = (req.session.expandId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    await ExpandCollection.deleteOne(expandId);
    req.session.ExpandId = undefined;
    res.status(200).json({
      message: 'The expand has been deleted successfully.'
    });
  }
);

export {router as ExpandRouter};
