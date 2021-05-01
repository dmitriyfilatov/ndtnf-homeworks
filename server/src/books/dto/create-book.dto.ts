export class CreateBookDto {
  title: string;
  description: string;
  authors: string[];
  favourite: string;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

export default CreateBookDto;
