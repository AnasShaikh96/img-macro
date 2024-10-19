import * as z from "zod";

const ACCEPTED_IMG_TYPES = ["image/png", 'image/jpeg', 'image/jpg'];
const MAX_FILE_SIZE = 1 * 1024


export const fileSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((file) => file?.length > 0, "A File is Required").refine((files) => {
      for (let i = 0; i < files.length; i++) {
        if (!ACCEPTED_IMG_TYPES.includes(files[i].type)) {
          return false
        }
      }
      return true
    }, 'Must be a valid file'
    ).refine((file) => {

      for (let i = 0; i < file.length; i++) {
        if (file[i].size > MAX_FILE_SIZE) return false
      }
      return true
    }, 'Maximum file size is ' + MAX_FILE_SIZE + 'KB'),
});