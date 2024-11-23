import { Router } from "express";
import { getAuthors, searchAuthorsHandler,
    registerAuthor,deleteAuthor} from "../../controllers/authorController";

const router = Router();

router.get("/", getAuthors);
router.get("/search", searchAuthorsHandler);
router.post("/", registerAuthor);
router.delete("/:id", deleteAuthor);


export default router;