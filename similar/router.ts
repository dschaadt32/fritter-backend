/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
import type {Request, Response} from 'express';
import express from 'express';
import FreetCollection from '../freet/collection';
import SimilarCollection from './collection';
import * as userValidator from '../user/middleware';
import * as similarValidator from './middleware';
import * as util from './util';
import FreetModel from '../freet/model';

const router = express.Router();

/**
 * Create an similar.
 *
 * @name POST /api/similar
 *
 * @param {string} freetId - freetId that similar is associated with
 * @return {SimilarResponse} - The created similar
 * @throws {403} - If there is a similar associated with the freet already
 * @throws {409} - If the similar does not exist
 * @throws {400} - If content is not in correct format
 *
 */
router.post(
  '/',
  [
    similarValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const [freetid1, freetid2] = await findTwoMostSimilar(req.body.freetId);
    // Const freetid1 = '6350b400179516112f0c6a38';
    // Const freetid2 = '634c817df712b18b3e95a157';
    const similar = await SimilarCollection.addOne(freetid1.toString(), freetid2.toString(), req.body.freetId);
    req.session.similarId = similar._id.toString();
    res.status(201).json({
      message: 'Similar created successfully',
      similar: await util.constructSimilarResponse(similar)
    });
  }
);

// Logic taken from https://www.npmjs.com/package/sentence-similarity
const findTwoMostSimilar = async (freetId: string) => {
  const similarity = require('sentence-similarity');
  const similarityScore = require('similarity-score');

  const winkOpts = {f: similarityScore.winklerMetaphone, options: {threshold: 0}};

  const freet = await FreetCollection.findOne(freetId);
  const targetContent = freet.content.split(' ');
  const best = ['', 0];
  const second_best = ['', 0];
  const allFreets = await FreetModel.find({});
  for (const freet of allFreets) {
    if (freet.id !== freetId) {
      const sim_score = similarity(freet.content.split(' '), targetContent, winkOpts).score;

      if (best[0] === '' || sim_score > best[1]) {
        best[0] = freet.id;
        best[1] = sim_score;
      } else if (second_best[0] === '' || sim_score > second_best[1]) {
        second_best[0] = freet.id;
        second_best[1] = sim_score;
      }
    }
  }

  return [best[0], second_best[0]];
};

export {router as SimilarRouter};
