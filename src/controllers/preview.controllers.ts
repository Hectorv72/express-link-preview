import { Request, Response } from 'express';
import cheerio from 'cheerio';

const getLinkPreview = async (req: Request, res: Response): Promise<Response> => {
  const { url } = req.query || req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'please provide a url' });
  }

  // if (validateUrl)

  return res.status(200);
};

module.exports = { getLinkPreview };
