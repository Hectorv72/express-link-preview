import cheerio from 'cheerio';
import axios, { AxiosError } from 'axios';
import { getAll } from 'helpers/getdata.helpers';
import { validateUrl } from 'helpers/validate.helpers';
import { PreviewModel } from 'models/preview.mode';
import { Request, Response } from 'express';

export const getLinkPreview = async (req: Request, res: Response): Promise<Response> => {
  const { url } = req.query || req.body;

  if (!url) {
    return res.status(400).json({ success: false, message: 'Please provide a url' });
  }

  if (!validateUrl) {
    return res.status(400).json({ success: false, message: 'Invalid url' });
  }

  try {
    const response = await axios.get(url.toString());
    const html = cheerio.load(response.data);

    const preview: PreviewModel = getAll(url.toString(), html);
    return res.status(200).json({ success: true, ...preview });
  } catch (error) {
    console.error(error);
    let [status, message] = [4000, 'Something went wrong'];
    if (error instanceof AxiosError) {
      status = error.response?.status || status;
      message = error.response?.statusText || message;
    }
    return res.status(status).json({ success: false, message });
  }
};
