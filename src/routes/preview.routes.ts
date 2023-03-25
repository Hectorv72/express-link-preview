import { Router } from 'express';
import { getLinkPreview } from 'controllers/preview.controllers';

const router = Router();
router.get('/', getLinkPreview);

export default router;
