import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import SourceCollection from './collection';
import * as userValidator from '../user/middleware';
import * as sourceValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create an source.
 *
 * @name POST /api/source
 *
 * @param {string} source1 - first source
 * @param {string} source2 - second source
 * @param {string} source3 - third source
 * @param {string} freetId - freetId that source is associated with
 * @return {SourceResponse} - The created source
 * @throws {409} - If the source does not exist
 * @throws {400} - If urls are not in correct format
 *
 */
router.post(
  '/',
  [
    sourceValidator.isValidURLS,
    sourceValidator.isUserLoggedIn,
    sourceValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const source = await SourceCollection.addOne(req.body.source1, req.body.source2, req.body.source3, req.body.freetId);
    req.session.sourceId = source._id.toString();
    res.status(201).json({
      message: 'Source created successfully',
      source: await util.constructSourceResponse(source)
    });
  }
);

/**
 * Update an source.
 *
 * @name PUT /api/source
 *
 * @param {string} source1 - first source
 * @param {string} source2 - second source
 * @param {string} source3 - third source
 * @param {string} freetId - id of the freet the source is associated with
 * @return {SourceResponse} - The updated source
 * @throws {403} - If there is a source associated with the freet already
 * @throws {409} - If the freet does not exist
 * @throws {400} - If content is not in correct format
 */
router.put(
  '/',
  [
    sourceValidator.isValidURLS,
    sourceValidator.userIdEqualsauthorId,
    sourceValidator.sourceExists,
    sourceValidator.isUserLoggedIn,
    sourceValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const source = await SourceCollection.updateOne(req.body.id, req.body.source1, req.body.source2, req.body.source3, req.body.freetId);
    res.status(200).json({
      message: 'Your source was updated successfully.',
      source: await util.constructSourceResponse(source)
    });
  }
);

/**
 * Delete an source
 *
 * @name DELETE /api/source
 *
 * @return {string} - A success message
 * @throws {403} - the source does not exist
 */
router.delete(
  '/',
  [
    sourceValidator.userIdEqualsauthorId,
    sourceValidator.sourceExists,
    sourceValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    await SourceCollection.deleteOne(req.body.id);
    req.body.id = undefined;
    res.status(200).json({
      message: 'The source has been deleted successfully.'
    });
  }
);

export {router as sourceRouter};
