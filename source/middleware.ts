import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import UserCollection from '../user/collection';
import SourceCollection from './collection';
import FreetCollection from '../freet/collection';

/**
 * Checks if the expandedcontent of the freet in req.body is valid, i.e not a stream of empty
 * spaces and not more than 1400 characters
 */
const isValidURLS = (req: Request, res: Response, next: NextFunction) => {
  const {source1, source2, source3} = req.body as {source1: string; source2: string; source3: string};
  if (source1 && isNotValidUrl(source1)) {
    res.status(400).json({
      error: 'URL1 is incorrently formatted'
    });
    return;
  }

  if (source2 && isNotValidUrl(source2)) {
    res.status(400).json({
      error: 'URL2 is incorrently formatted'
    });
    return;
  }

  if (source3 && isNotValidUrl(source3)) {
    res.status(400).json({
      error: 'URL3 is incorrently formatted'
    });
    console.log('in isvalidURls');
    return;
  }

  next();
};

/**
 * Checks if the current user id equals the author of the freet the source is
 * associated with is the same
 */
const userIdEqualsauthorId = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    const freet = await FreetCollection.findOneExpandId(req.body.id);

    if (freet) {
      console.log(req.session.userId);
      if (req.session.userId !== freet.authorId) {
        res.status(500).json({
          error: {
            userNotFound: 'User attempting to edit another users source.'
          }
        });
        return;
      }
    } else {
      console.log('went down else1');
    }
  } else {
    console.log('went down else2');
  }

  next();
};

/**
 * Checks if a expand with expandId in req.body exists
 */
const sourceExists = async (req: Request, res: Response, next: NextFunction) => {
  const sourceId = req.body.id;
  if (!sourceId) {
    res.status(400).json({error: 'Missing source'});
    return;
  }

  const expand = await SourceCollection.findOne(sourceId);

  if (expand) {
    next();
  } else {
    res.status(401).json({error: 'Invalid source'});
  }
};

/**
 * Checks if the user is logged in, that is, whether the userId is set in session
 */
const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.status(403).json({
      error: {
        auth: 'You must be logged in to complete this action.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if a freet with freetId is req.params exists
 */
const isFreetExists = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.body.freetId);
  const freet = validFormat ? await FreetCollection.findOne(req.body.freetId) : '';
  if (!freet) {
    res.status(404).json({
      error: {
        freetNotFound: `Freet with freet ID ${req.body.freetId} does not exist.`
      }
    });
    return;
  }

  next();
};

export {
  isValidURLS,
  userIdEqualsauthorId,
  sourceExists,
  isUserLoggedIn,
  isFreetExists
};

// From https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
const isNotValidUrl = (urlString: string)=> {
  try {
    const a = new URL(urlString);
    return false;
  } catch (TypeError: unknown) {
    return true;
  }
};
