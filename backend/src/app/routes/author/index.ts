import { Router } from "express";
import { getAuthors, searchAuthorsHandler, searchAuthorByCode,
    registerAuthor,deleteAuthor, exportAuthorsToExcel, exportAuthorsToPdf} from "../../controllers/authorController";

const router = Router();

router.get("/", getAuthors);
router.get("/search", searchAuthorsHandler);
router.get("/searchCode", searchAuthorByCode); 
router.post("/", registerAuthor);
router.delete("/:id", deleteAuthor);
router.get('/export/excel', exportAuthorsToExcel);
router.get('/export/pdf', exportAuthorsToPdf);

export default router;