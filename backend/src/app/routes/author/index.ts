import { Router } from "express";
import { getAuthors, searchAuthorsHandler, searchAuthorByCode,
    registerAuthor,deleteAuthor} from "../../controllers/authorController";

const router = Router();

router.get("/", getAuthors);
router.get("/search", searchAuthorsHandler);
router.get("/searchCode", searchAuthorByCode); 
router.post("/", registerAuthor);
router.delete("/:id", deleteAuthor);


export default router;