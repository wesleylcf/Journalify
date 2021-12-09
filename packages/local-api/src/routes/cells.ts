import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

const cellsRouter = (fileName: string, dir: string) => {
  const fullPath = path.join(dir, fileName);
  const router = express.Router();
  router.use(express.json());

  router.get('/cells', async (req, res) => {
    // Read the file
    // If unsuccessful, check if error is indicative of file doesn't exist
    // Parse list of cells
    // Send list of cells back to browser
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      res.send(JSON.parse(result));
      console.log(`${fileName} found, did not create new one`);
    } catch (e) {
      console.log(`${fileName} not found, created new one`);
      if (e.code === 'ENOENT') {
        const defaultCell: Cell = {
          id: 'defaultCell',
          content: `This is an environment designed for programmers to ease note-taking, and presenting them to others. \n\nThe features of the environment are as follows: \n\n- To edit a Text cell, simply click on it. Similarly, to exit a markdown cell, click outside it. \n\n- Text Cells follow the standard Markdown language. If you are unfamiliar with Markdown language do refer to https://www.markdownguide.org/basic-syntax/ \n\n- You can show any React component, or any Javascript data type by calling the "show()" function. \n\n- Code bundling is continuous from one Code editor to another, but code execution is contained within a single cell \n- Both cells are resizeable, and you can delete, move up, or move down cells using the buttons on the top right corner`,
          type: 'text',
        };
        await fs.writeFile(
          fullPath,
          `${JSON.stringify([defaultCell])}`,
          'utf-8'
        );
        res.send(JSON.stringify([defaultCell]));
      } else {
        throw e;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    // Takes list of cells from request object
    // serialize them(convert to format that can be safely written to that file)
    // write cells into file
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
    res.status(200).send({ status: 'OK' });
  });
  return router;
};
export default cellsRouter;
