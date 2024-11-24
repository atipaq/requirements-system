import { Router } from "express";
import { getAuthors, searchAuthorsHandler,
    registerAuthor,deleteAuthor,getAuthorById} from "../../controllers/authorController";

const router = Router();

router.get("/", getAuthors);
router.get("/search", searchAuthorsHandler);
router.post("/", registerAuthor);

router.get("/:id", getAuthorById);
router.delete("/:id", deleteAuthor);


export default router;