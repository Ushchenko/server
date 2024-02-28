import BookModel from "../models/Book.js"
import AuthorModel from "../models/Author.js"
import GenreModel from "../models/Genre.js"
import { getRounds } from "bcrypt"

export const getAll = async (req, res) => {
  try {
    const books = await BookModel
      .find()
      .populate({
        path: 'authors',
        select: 'name'
      })
      .populate({
        path: 'genres',
        select: 'name'
      })
      .exec()

    res.json(books)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      massage: 'Не удалось найти книги',
    })
  }
}

export const getOne = async (req, res) => {

    const bookId = req.params.id

    BookModel
    .findOne({
      _id: bookId
    })
    .populate({
      path: 'authors',
      select: 'name'
    })
    .populate({
      path: 'genres',
      select: 'name'
    })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: 'Кинга не найдена',
        })
      }

      res.json(doc)
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({
        massage: 'Не удалось вернуть книгу',
      })
    })
}

export const add = async (req, res) => {
  try {
    
    const authorIds = []
    const genreIds = []

    for(const name of req.body.authors) {//author handle
      let author = await AuthorModel.findOne({ name: name });

      if(!author) {
        author = new AuthorModel({ name: name });
        await author.save();
      }

      authorIds.push(author._id)
    }

    for(const name of req.body.genres) {//genre handle
      let gerne = await GenreModel.findOne({ name: name });

      if(!gerne) {
        gerne = new GenreModel({ name: name });
        await gerne.save();
      }

      genreIds.push(gerne._id)
    }

    const doc = new BookModel({
      name: req.body.name,
      authors: authorIds,
      genres: genreIds,
    })

    await doc.save()

    res.json({
      doc
    })

  } catch (err) {
    console.log(err);
		res.status(500).json({
			message: 'Не удалось добавить книгу'
		})
  }
}

export const remove = async (req, res) => {
  try {
    const bookId = req.params.id

    BookModel.findOneAndDelete({
      _id: bookId,
    }).then(doc => {
      if (!doc) {
        return res.status(404).json({
          message: 'Статья не найдена',
        })
      }

      res.json({
        message: "deleting success",
      })
    }).catch(err => {
      console.log(err)
      return res.status(500).json({
        massage: 'Не удалось удалить заказ',
      })
    })

  } catch (err) {
    console.log(err);
		res.status(500).json({
			message: 'Не удалось удалить книгу'
		})
  }
}

export const update = async (req, res) => {
  try {
    const bookId = req.params.id;

    const authorIds = [];
    const genreIds = [];

    for (const name of req.body.authors) { //author handle
      let author = await AuthorModel.findOne({ name: name });

      if (!author) {
        author = new AuthorModel({ name: name });
        await author.save();
      }

      authorIds.push(author._id);
    }

    for (const name of req.body.genres) { //genre handle
      let genre = await GenreModel.findOne({ name: name });

      if (!genre) {
        genre = new GenreModel({ name: name });
        await genre.save();
      }

      genreIds.push(genre._id);
    }

    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      {
        name: req.body.name,
        authors: authorIds,
        genres: genreIds,
      },
      { new: true } // чтобы получить обновленный документ
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: 'Книга не найдена',
      });
    }

    res.json({
      doc: updatedBook,
      message: 'Обновление успешно',
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Не удалось обновить книгу',
    });
  }
};